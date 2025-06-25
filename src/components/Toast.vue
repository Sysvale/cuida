<template>
	<CdsFlexbox
		v-if="model"
		:id="$attrs.id"
		gap="2"
		class="toast__container"
		:class="{
			[`toast__container--${variant}`]: true,
			'toast__container--light': light,
		}"
		role="alert"
		aria-live="assertive"
	>
		<CdsFlexbox
			gap="2"
			wrap="no-wrap"
			fluid
		>
			<CdsFlexbox
				gap="2"
				fluid
			>
				<CdsIcon
					:class="{
						[`toast__icon--${variant}`]: true,
						'toast__icon--light': light,
					}"
					:name="iconResolver"
					height="20"
					width="20"
				/>

				<div class="toast__text-container">
					<CdsFlexbox
						direction="column"
						gap="1"
					>
						<CdsText
							:color="toastTitleColor"
							class="toast__title"
						>
							{{ title }}
						</CdsText>

						<CdsText
							v-if="description"
							:color="toastDescriptionColor"
							class="toast__description"
						>
							{{ description }}
						</CdsText>
					</CdsFlexbox>
				</div>
			</CdsFlexbox>

			<CdsIcon
				v-if="dismissible"
				:class="light ? 'dismiss__icon--light' : 'dismiss__icon'"
				name="x-outline"
				height="17"
				width="17"
				@click="dismiss"
			/>
		</CdsFlexbox>

		<div
			v-if="autoDismissible"
			:class="{
				[`toast__countdown-indicator--${variant}`]: true,
				'toast__countdown-indicator--light': light,
			}"
			:style="indicatorStyle"
		/>
	</CdsFlexbox>
</template>

<script setup>
import { ref, computed, useAttrs, watch } from 'vue';
import { useToast } from '../utils/composables/useToast.js';
import CdsIcon from '../components/Icon.vue';
import CdsFlexbox from '../components/Flexbox.vue';
import CdsText from '../components/Text.vue';

const attrs = useAttrs();

/**
* Controla a visibilidade do componente.
*/
const model = defineModel('modelValue', {
	type: Boolean,
});

const props = defineProps({
	/**
	* Título do toast.
	*/
	title: {
		type: String,
		default: 'Título do toast'
	},
	/**
	* Texto opcional apresentado abaixo do título do toast.
	*/
	description: {
		type: String,
		default: 'Descrição do toast, exibida abaixo do título'
	},
	/**
	* Quando true, apresenta ícone para fechar o toast.
	*/
	dismissible: {
		type: Boolean,
		default: false,
	},
	/**
	* Quando true, o toast fecha-se automaticamente após o tempo definido no `dismissAfter`.
	*/
	autoDismissible: {
		type: Boolean,
		default: false,
	},
	/**
	* Tempo em milisegundos para que o toast seja automaticamente fechado. O valor padrão é 4s (4000ms).
	*/
	dismissAfter: {
		type: Number,
		default: 4000,
		validator: (value) => value >= 4000 && value <= 12000,
	},
	/**
	* Variante do toast. São 4 variantes implementadas: 'success', 'info', 'warning', 'danger'.
	*/
	variant: {
		type: String,
		default: 'info',
		validator: (value) => ['success', 'info', 'warning', 'danger'].includes(value),
	},
	/**
	* Especifica o tema do toast. Quando true, o toast terá o tema claro. O tema escuro é o padrão.
	*/
	light: {
		type: Boolean,
		default: false,
	},
});

const emits = defineEmits(['dismiss']);

const indicatorStyle = ref({});
let timeoutId = null;

const iconResolver = computed(() => {
	switch (props.variant) {
		case 'success':
			return 'check-circle-outline';
		case 'info':
			return 'info-outline';
		case 'warning':
			return 'alert-outline';
		case 'danger':
			return 'warning-outline';
		default:
			return 'info-outline';
	}
});

const toastTitleColor = computed(() => {
	return props.light ? 'n-800' : 'n-0';
});

const toastDescriptionColor = computed(() => {
	return props.light ? 'n-700' : 'n-30';
});

watch(model, () => {
	if (model.value && props.autoDismissible) {
		clearTimeout(timeoutId);
		countDownBarAnimationHandler();
	}
}, { immediate: true });

function countDownBarAnimationHandler() {
	indicatorStyle.value = {
		width: '100%',
		transition: 'none',
	};

	requestAnimationFrame(() => {
		indicatorStyle.value = {
			width: '0%',
			transition: `width ${props.dismissAfter}ms linear`
		};
	});

	timeoutId = setTimeout(() => {
		dismiss();
	}, props.dismissAfter);
}

function dismiss() {
	indicatorStyle.value = {
		width: '100%',
		transition: 'none'
	};
	clearTimeout(timeoutId);
	model.value = false;
	emits('dismiss');
	useToast().dismissToast(attrs.id);
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.toast__title {
	font-size: 15.5px;
	font-weight: 500;
}

.toast__description {
	font-size: 14px;
	font-weight: 440;
	line-height: 1.4;
}

.toast__text-container {
	width: 85%;
}

.toast__container {
	@include tokens.caption;
	padding: tokens.pa(4);
	border-radius: tokens.$border-radius-medium;
	font-weight: tokens.$font-weight-semibold;
	box-shadow: tokens.$shadow-md;
	z-index: tokens.$z-index-toast;
	display: flex;
	min-height: 42px;
	max-width: 380px;
	min-width: 100%;
	margin: tokens.mb(3);
	position: relative;
	overflow: hidden;
	border: 1px solid tokens.$n-700;

	&--success {
		@extend .toast__container;
		background: linear-gradient(275deg, tokens.$n-900 82.5%, tokens.$gp-400 220%);

		&.toast__container--light {
			@extend .toast__container;
			background: linear-gradient(275deg, tokens.$n-0 75.5%, tokens.$gp-100 200%);
			border: 2px solid tokens.$n-20;
		}
	}

	&--info {
		@extend .toast__container;
		background: linear-gradient(275deg, tokens.$n-900 82.5%, tokens.$bn-100 220%);

		&.toast__container--light {
			@extend .toast__container;
			background: linear-gradient(275deg, tokens.$n-0 75.5%, tokens.$bn-100 200%);
			border: 2px solid tokens.$n-20;
		}
	}

	&--warning {
		@extend .toast__container;
		background: linear-gradient(275deg, tokens.$n-900 82.5%, tokens.$al-100 220%);

		&.toast__container--light {
			@extend .toast__container;
			background: linear-gradient(275deg, tokens.$n-0 75.5%, tokens.$al-100 200%);
			border: 2px solid tokens.$n-20;
		}
	}

	&--danger {
		@extend .toast__container;
		background: linear-gradient(275deg, tokens.$n-900 82.5%, tokens.$rc-100 220%);

		&.toast__container--light {
			@extend .toast__container;
			background: linear-gradient(275deg, tokens.$n-0 75.5%, tokens.$rc-100 200%);
			border: 2px solid tokens.$n-20;
		}
	}
}

.dismiss__icon {
	cursor: pointer;
	color: tokens.$n-100;
	transition: color 0.2s ease;

	&:hover {
		color: tokens.$n-10;
		transition: color 0.2s ease;
	}

	&--light {
		cursor: pointer;
		color: tokens.$n-500;
		transition: color 0.2s ease;

		&:hover {
			color: tokens.$n-700;
			transition: color 0.2s ease;
		}
	}
}

.toast__icon {
	&--success {
		color: tokens.$gp-300;

		&.toast__icon--light {
			color: tokens.$gp-500;
		}
	}

	&--info {
		color: tokens.$bn-300;

		&.toast__icon--light {
			color: tokens.$bn-500;
		}
	}

	&--warning {
		color: tokens.$al-300;

		&.toast__icon--light {
			color: tokens.$al-500;
		}
	}

	&--danger {
		color: tokens.$rc-300;

		&.toast__icon--light {
			color: tokens.$rc-500;
		}
	}
}

.toast__countdown-indicator {
	position: absolute;
	height: 3px;
	bottom: 0;
	left: 0;
	border-radius: 4px;
	transition: width linear;

	&--success {
		@extend .toast__countdown-indicator;
		background-color: rgba(tokens.$gp-200, 0.5);

		&--light {
			@extend .toast__countdown-indicator;
			background-color: rgba(tokens.$gp-700, 0.2);
		}
	}

	&--info {
		@extend .toast__countdown-indicator;
		background-color: rgba(tokens.$bn-200, 0.5);

		&--light {
			@extend .toast__countdown-indicator;
			background-color: rgba(tokens.$bn-700, 0.2);
		}
	}

	&--warning {
		@extend .toast__countdown-indicator;
		background-color: rgba(tokens.$al-200, 0.5);

		&--light {
			@extend .toast__countdown-indicator;
			background-color: rgba(tokens.$al-700, 0.2);
		}
	}

	&--danger {
		@extend .toast__countdown-indicator;
		background-color: rgba(tokens.$rc-200, 0.5);

		&--light {
			@extend .toast__countdown-indicator;
			background-color: rgba(tokens.$rc-700, 0.2);
		}
	}
}
</style>
