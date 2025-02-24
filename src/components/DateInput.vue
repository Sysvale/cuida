<template>
	<div class="date-input__container">
		<date-picker
			id="cds-date-input"
			v-model="internalDate"
			locale="pt-BR"
			:popover="{ visibility: 'click' }"
			:min-date="minDate ? new Date(minDate) : null"
			:max-date="maxDate ? new Date(maxDate) : null"
			:attributes="showTodayDot ? attributes: {}"
			color="green"
			:is-range="range"
			@update:model-value="handleUpdateInput"
		>
			<template #header-left-button="{ page }">
				<cds-chevron
					direction="left"
					@click="page.movePrevMonth()"
				/>
			</template>
			<template #header-right-button="{ page }">
				<cds-chevron
					direction="right"
					@click="page.moveNextMonth()"
				/>
			</template>

			<template #default="{ inputValue, togglePopover, inputEvents }">
				<div
					class="inputClass"
				>
					<CdsBaseInput
						v-bind="{...$attrs, ...props}"
						:model-value="resolveInputValue(inputValue)"
						readonly
						type="text"
						:floating-label="floatingLabel || mobile"
						v-on="inputEvents"
						@click="togglePopover"
						@focus="isBeingFocused = true"
						@blur="isBeingFocused = false"
					>
						<template #trailing-icon>
							<div class="date-input__icon">
								<cds-icon
									height="20"
									width="20"
									name="calendar-outline"
								/>
							</div>
						</template>
					</CdsBaseInput>
				</div>
			</template>
		</date-picker>
	</div>
</template>

<script setup>
import { DateTime } from 'luxon';
import { DatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';
import { isEmpty } from 'lodash';
import CdsChevron from './Chevron.vue';
import CdsIcon from './Icon.vue';
import sassColorVariables from '../assets/sass/colors.module.scss';
import paleteBuilder from '../utils/methods/paleteBuilder.js';
import { ref, watch, useTemplateRef, computed, onMounted } from 'vue';
import CdsBaseInput from './BaseInput.vue';

const dateStringValidator = (value) => /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);


const props = defineProps({
	/**
	* Prop utilizada como v-model. Deve ser uma string no formato `yyyy-MM-dd`
	* ou um objeto com as propriedades `start` e `end`, no mesmo formato.
	*/
	modelValue: {
		type: [String, Object],
		default: '',
	},
	/**
	 * Especifica a label do input.
	 */
	label: {
		type: String,
		default: 'Date',
	},
	/**
	 * Desabilita o input.
	 */
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	 * Especifica o estado do DateInput. As opções são 'default', 'valid' e 'invalid'.
	 */
	state: {
		type: String,
		default: 'default',
	},
	/**
	 * Controla o modo do input.
	 */
	range: {
		type: Boolean,
		default: false,
	},
	/**
	 * Exibe asterisco de obrigatório (obs.: não faz a validação)
	 */
	required: {
		type: Boolean,
		default: false,
	},
	/**
	 * Especifica a mensagem de erro, que será exibida caso o estado seja inválido
	 */
	errorMessage: {
		type: String,
		default: 'Valor inválido',
	},
	/**
	* Define exibição e texto do tooltip do input
	*/
	tooltip: {
		type: String,
		default: null,
	},
	/**
	* Especifica ícone do tooltip do TextInput.
	*/
	tooltipIcon: {
		type: String,
		default: 'info-outline',
	},
	/**
	* Controla a exibição e o conteúdo do link de suporte exibido ao lado da label.
	*/
	supportLink: {
		type: String,
		default: null,
	},
	/**
	* Especifica mensagem de auxílio.
	*/
	supportingText: {
		type: [String, Array],
		default: '',
	},
	/**
	* Define a url a ser acessada no clique do link de suporte.
	*/
	supportLinkUrl: {
		type: String,
		default: 'https://cuida.framer.wiki/',
	},
	/**
	 * Especifica se a largura do DateInput deve ser fluida.
	 */
	fluid: {
		type: Boolean,
		default: false,
	},
	/**
	 * A data mínima selecionável no DateInput. Deve ser uma string no formato `yyyy-MM-dd`.
	 */
	minDate: {
		type: String,
		default: '',
	},
	/**
	 * A data máxima selecionável no DateInput. Deve ser uma string no formato `yyyy-MM-dd`.
	 */
	maxDate: {
		type: String,
		default: '',
	},
	/**
	 * Texto placeholder para o DateInput.
	 */
	placeholder: {
		type: String,
		default: 'Selecione uma data',
	},
	/**
	 * Controla a marcação do dia atual no calendário.
	 */
	showTodayDot: {
		type: Boolean,
		default: false,
	},
	/**
	* A variante de cor. São 9 variantes implementadas: 'green', 'teal',
	* 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' e 'amber'.
	*/
	variant: {
		type: String,
		default: 'green',
	},
	/**
	* <span className="deprecated-warning">[DEPRECATED]</span> Essa prop vai ser substituída pela prop `floatingLabel` na v4. Define o tipo do input, se true será um input adaptado para o mobile
	*/
	mobile: {
		type: Boolean,
		default: false,
	},
	/**
	* Define o tipo do input, se true será um input adaptado para o mobile
	*/
	floatingLabel: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits({
	'update:modelValue': null,
});



const internalDate = ref(DateTime.now());
const isBeingFocused = ref(false);
const inputControl = ref(0);
const attributes = ref([
	{
		dates: new Date(),
		dot: true,
	},
]);
const variantColorData = ref({});




const errorState = computed(() => {
	return props.state === 'invalid';
});

const inputClass = computed(() => {
	let returningClass = '';

	if (props.disabled) {
		return props.fluid
			? 'date-input--disabled date-input--fluid'
			: 'date-input--disabled';
	}

	if (!isBeingFocused.value) {
		if (!props.disabled) {
			if (props.state === 'valid') {
				returningClass += ' date-input--valid';
			} else if (props.state === 'invalid') {
				returningClass += ' date-input--invalid';
			}
		}
	} else if (!props.disabled) {
		if (props.state === 'valid') {
			returningClass += ' date-input--focused-valid';
		} else if (props.state === 'invalid') {
			returningClass += ' date-input--focused-invalid';
		}
	}

	returningClass += props.fluid ? ' date-input--fluid' : ' date-input';

	return returningClass;
});

const resolveMobile = computed(() => {
	return props.mobile ? '48px' : '40px';
});

watch(() => props.modelValue, (newValue, oldValue) => {
	if (newValue === oldValue) {
		return;
	}

	resolveInternalDate();
});

watch(() => props.variant, (newValue, oldValue) => {
	if (newValue === oldValue) {
		return;
	}

	updateColorData();
});

onMounted(() => {
	updateColorData();
	resolveInternalDate();
});


function updateColorData() {
	variantColorData.value = paleteBuilder(sassColorVariables.palete).find((item) => item.variantName.toLowerCase() === props.variant);
}

function handleUpdateInput(date) {
	if (props.range) {
		emits(
			'update:modelValue',
			date.start && date.end
				? {
					start: DateTime.fromJSDate(date.start).toFormat('yyyy-MM-dd'),
					end: DateTime.fromJSDate(date.end).toFormat('yyyy-MM-dd'),
				}
				: ''
		);
		return;
	}
	/**
	* Evento emitido quando uma data é selecionada. Utilizado para implementar o v-model.
	* @event update:modelValue
	* @type {Event}
	*/
	emits('update:modelValue', date ? DateTime.fromJSDate(date).toFormat('yyyy-MM-dd') : '');
}

function resolveInternalDate() {
	if (!props.modelValue) {
		internalDate.value = props.range ? null : '';
		return;
	}

	if (props.range) {
		internalDate.value = dateStringValidator(props.modelValue.start) && dateStringValidator(props.modelValue.end)
			? {
				start: DateTime.fromFormat(props.modelValue.start, 'yyyy-MM-dd'),
				end: DateTime.fromFormat(props.modelValue.end, 'yyyy-MM-dd'),
			}
			: {
				start: DateTime.now(),
				end: DateTime.now(),
			}
		return;
	}

	internalDate.value = dateStringValidator(props.modelValue)
		? DateTime.fromFormat(props.modelValue, 'yyyy-MM-dd')
		: DateTime.now();
}

function resolveInputValue(value) {
	console.log('🚀 -> value:', value);
	if (typeof value !== 'object') {
		return value;
	}

	if ((!value.start && !value.end) || isEmpty(value)) {
		return null;
	}

	return `${value.start} a ${value.end}`;
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.date-input {
	display: flex;
	justify-content: space-between;
	outline: 1px solid $n-50;
	width: 266px;
	height: v-bind(resolveMobile);
	color: $n-600;
	border-radius: $border-radius-extra-small !important;
	cursor: pointer;
	background: $n-0;
	overflow: hidden;

	&__icon {
		color: $n-700;
		margin: mt(1);
	}

	&__container {
		display: flex;
		flex-direction: column;
	}
}

.vc-popover-caret {
	display: none !important;
}

.vc-container {
	outline: 1px solid $n-30 !important;
	border: none !important;
	border-radius: $border-radius-extra-small !important;
}

.vc-popover-content {
	box-shadow: none !important;
	box-shadow: 0px 0px 8px rgba($n-900, .08) !important;
}

.vc-arrows-container {
	padding: 12px 10px !important
}

.vc-title {
	line-height: 23px !important;
	background-color: transparent;
	font-size: 17px;
	text-transform: capitalize;
}

.vc-weeks {
	margin: mt(5);
}

.vc-header {
	.vc-arrow {
		border-radius: 10px;
	}
}

.vc-nav-title {
	@include body-1;
	font-weight: 800;
	background-color: transparent;
}

.vc-nav-arrow {
	border-radius: 10px;
}

.vc-nav-item {
	@include body-1;
	background-color: transparent;
	text-transform: capitalize;
	font-weight: 430;
}

.vc-highlight-bg-light {
	color: v-bind(calendarTrailColor);
	background-color: v-bind(calendarTrailColor);
}

.vc-highlight-content-light, .vc-highlight-content-outline, .vc-highlight-content-none {
	color: v-bind(calendarTextColor);
}

.vc-highlight-bg-solid {
	background-color: v-bind(calendarDotColor);
}

.vc-highlight-bg-outline, .vc-highlight-bg-none {
	border-color: v-bind(calendarDotColor);
}
</style>
