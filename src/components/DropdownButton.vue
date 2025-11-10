<template>
	<div>
		<CdsButton
			:id
			ref="dropdownButtonRef"
			v-cdstip="tooltipText"
			:variant="variant"
			:size="size"
			:text="text"
			:secondary="secondary"
			:ghost="ghost"
			:disabled
			@click="activeSelection"
		>
			<template #append>
				<CdsChevron
					animate
					size="sm"
					:light="!secondary && !ghost"
					:direction="isActive ? 'bottom' : 'top'"
				/>
			</template>
		</CdsButton>

		<div
			v-if="isActive"
			ref="dropdownRef"
			:style="dynamicStyle"
			class="dropdown-button__dropdown"
		>
			<div
				v-for="(item, index) in items"
				:key="index"
			>
				<!--
					Evento emitido quando as ações do Dropdown são clicadas.
					@event action-click
					@type {Event}
				-->
				<div
					class="dropdown__container"
					@click="handleOptionClick(item.name, index)"
				>
					<CdsIcon
						class="dropdown__icon"
						height="22"
						width="22"
						:name="item.icon"
					/>
					<span class="dropdown__text">{{ item.name }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	ref,
	computed,
	onMounted,
	onBeforeUnmount,
	useTemplateRef,
	useId,
} from 'vue';
import CdsButton from '../components/Button.vue';
import CdsChevron from '../components/Chevron.vue';
import CdsIcon from '../components/Icon.vue';

defineOptions({ name: 'CdsDropdownButton' });

const emits = defineEmits([
	'button-click',
	'action-click'
]);

const props = defineProps({
	/**
	* Define a lista dos itens do DropdownButton a serem
	* mostrados. Os itens da lista devem ser
	* objetos com path ou route, e com uma label
	*/
	items: {
		type: Array,
		default: () => ([]),
		required: true,
	},
	/**
	* A variante de cor. São 10 variantes:
	* @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
	*/
	variant: {
		type: String,
		default: 'gray',
	},
	/**
	* Especifica se a versão do DropdownButton é a secundária. Essa propriedade tem
	* maior prevalência que a prop `variant`.
	*/
	secondary: {
		type: Boolean,
		default: false,
	},
	/**
	* Especifica se o componente deve ser exibido na sua versão ghost.
	*/
	ghost: {
		type: Boolean,
		default: false,
	},
	/**
	* Conteúdo do Dropdown.
	*/
	text: {
		type: String,
		default: 'Conteúdo',
		required: true,
	},
	/**
	* Controla o tamanho do popover do Dropdown (em pixels).
	* O tamanho nunca é menor que a largura do botão.
	*/
	dropdownWidth: {
		type: Number,
		default: 0,
	},
	/**
	* Especifica o tamanho do botão. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
	*/
	size: {
		type: String,
		default: 'md',
		validator(value) {
			return ['sm', 'md', 'lg'].includes(value);
		},
	},
	/**
	* Desabilita o input.
	*/
	disabled: {
		type: Boolean,
		default: false,
	},
	/**
	* Texto a ser exibido como tooltip com o hover do DropdownButton quando a prop disabled estiver ativa.
	*/
	tooltipText: {
		type: String,
		default: null,
	},
});

const dropdownButtonRef = useTemplateRef('dropdownButtonRef');
const dropdownRef = useTemplateRef('dropdownRef');

const id = useId();
const isActive = ref(false);

const dynamicStyle = computed(() => {
	const filterPillDomReference = document.getElementById(id.value);

	if (!filterPillDomReference) {
		return null;
	}

	const filterWidth = parseFloat(window.getComputedStyle(filterPillDomReference).width);

	if (filterWidth > props.dropdownWidth) {
		return {
			'--width': `${filterWidth}px`,
		};
	}

	return {
		'--width': `${props.dropdownWidth}px`,
	};
});

onMounted(() => {
	document.querySelector('body').addEventListener('click', closeDropdownButton);
});

onBeforeUnmount(() => {
	document.querySelector('body').removeEventListener('click', closeDropdownButton);
});

function activeSelection() {
	if (props.disabled) {
		return;
	}

	isActive.value = !isActive.value;

	/**
	* Evento que indica que o DropdownButton foi clicado
	* @event click
	* @type {Event}
	*/
	emits('button-click', true);
}

function hide() {
	isActive.value = false;
}

function handleOptionClick(actionName, index) {
	isActive.value = !isActive.value;
	emits('action-click', [actionName, index]);
}

function closeDropdownButton(event) {
	if (
		dropdownRef.value &&
		!dropdownRef.value.contains(event.target) &&
		dropdownButtonRef.value &&
		!dropdownButtonRef.value.$el.contains(event.target)
	) {
		hide(event);
	}
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.dropdown-button {
	&__container {
		display: inline-flex;
		align-items: center;
		padding: tokens.px(5);
		border-radius: tokens.$border-radius-extra-small;
		cursor: pointer;
		height: 40px;
		background-color: tokens.$n-10;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: tokens.$n-0;
			background-color: $base-color;
			outline: 1px solid $shade-500;
		}

		&--secondary {
			color: tokens.$n-700;
			outline: 1px solid tokens.$n-100;
			background-color: tokens.$n-10;
		}

		&--ghost {
			padding: tokens.px(5);
			background: none;
			color: tokens.$n-800;
			cursor: pointer;

			&:hover {
				background-color: tokens.$n-10;
			}
		}
	}

	&__text {
		@include tokens.body-2;
		font-weight: tokens.$font-weight-semibold;
		margin: tokens.mr(2);
	}

	&__dropdown {
		min-width: var(--width);
		background-color: tokens.$n-0;
		padding: tokens.pa(2);
		border-radius: tokens.$border-radius-extra-small;
		box-shadow: 0px 0px 8px rgba(tokens.$n-900, .08);
		outline: 1px solid tokens.$n-30;
		z-index: 999999999;
		color: tokens.$n-700;
		position: absolute;
		margin: tokens.mt(2);
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
}

.dropdown {
	&__container {
		display: flex;
		gap: 12px;
		align-items: center;
		cursor: pointer;
		border-radius: 6px;
		padding: tokens.pa(2);

		&:hover {
			background-color: tokens.$n-20;
		}
	}

	&__text {
		color: tokens.$n-600;
		@include tokens.body-2;
		padding: tokens.py(1)
	}

	&__icon {
		color: tokens.$n-600;
	}
}
</style>