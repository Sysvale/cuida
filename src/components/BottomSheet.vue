<template>
	<div>
		<div
			v-if="model"
		>
			<div
				:class="toggleAnimationClass ? 'backdrop__show' : 'backdrop__hide'"
				@click="closeSideSheet"
			>
				<div
					ref="bottomSheetRef"
					:class="toggleAnimationClass ? 'bottom-sheet__show' : 'bottom-sheet__hide'"
				>
					<div class="bottom-sheet__header-border">
						<div class="bottom-sheet__header-border-line" />
					</div>
					<div class="bottom-sheet__header">
						<div class="bottom-sheet__title">
							{{ title }}
						</div>
						<div
							class="bottom-sheet__close-icon"
							@click="closeHandle"
						>
							<icon
								name="x-outline"
								height="20"
								width="20"
								color="#29333D"
							/>
						</div>
					</div>
					<div class="bottom-sheet__content">
						<!-- @slot Scoped slot usado para inserção de conteúdo customizado. -->
						<slot name="default" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import Icon from './Icon.vue';
import { ref, watch } from 'vue';

defineOptions({ name: 'BottomSheet' });

const model = defineModel();

const props = defineProps({
	/**
		 * Define o título do bottom sheet exibido no header
		 */
	title: {
		type: String,
		default: 'Onde encontrar o meu CNS',
	},
	/**
		* Define se o BottomSheet vai ser fechado com o click no backdrop.
		*/
	noCloseOnBackdrop: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits([
	/**
	 * Evento emitido quando a visibilidade do bottom sheet é alterada.
	 * @event update:model-value
	 * @type {Event}
	 */
	'update:model-value',

	/**
	 * Evento emitido quando o bottom sheet é fechado.
	 * @event close
	 * @type {Event}
	 */
	'close',
]);

// const internalModelValue = ref(props.modelValue);
const toggleAnimationClass = ref(true);
const bottomSheetRef = ref(null);

watch(model, (newValue, oldValue) => {
	if (newValue !== oldValue) {
		if (!newValue) {
			closeHandle();
		}

		mustDisableExternalScrolls(newValue);
	}
});

function closeSideSheet(event) {
	if (props.noCloseOnBackdrop) {
		return;
	}

	if (bottomSheetRef.value && !bottomSheetRef.value.contains(event.target)) {
		closeHandle();
	}
}

function closeHandle() {
	toggleAnimationClass.value = false;

	setTimeout(() => {
		// internalModelValue.value = false;
		toggleAnimationClass.value = true;
		model.value = false;
		emit('close', true);
	}, 300);
}

function mustDisableExternalScrolls(value) {
	document.body.style.overflow = value ? 'hidden' : 'auto';
}

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.backdrop {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	padding: tokens.px(4);
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.45);
	z-index: 1060;

	&__show {
		@extend .backdrop;
		animation: zoom-in ease .3s;
	}

	&__hide {
		@extend .backdrop;
		animation: zoom-out ease .3s;
	}
}

.bottom-sheet {
	width: 100%;
    height: 75vh;
    border-top-left-radius: tokens.$border-radius-extra-large;
    border-top-right-radius: tokens.$border-radius-extra-large;
	position: absolute;
	bottom: 0;
	height: fit-content;
	z-index: tokens.$z-index-modal;
	background-color: tokens.$n-0;
	padding: tokens.pa(6);
	color: tokens.$n-800;

	&__header-border {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: tokens.mTRBL(n2, 0, 4, 0);
	}

	&__header-border-line {
		width: 30px;
		height: 4px;
		background: tokens.$n-40;
		border-radius: tokens.$border-radius-large;
	}

	&__show {
		@extend .bottom-sheet;
		animation: slide-up ease .3s;
	}

	&__hide {
		@extend .bottom-sheet;
		animation: slide-down ease .3s;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__close-icon {
		cursor: pointer;
	}

	&__title {
		@include tokens.button-1;
		font-weight: 700;
	}

	&__content {
		margin: tokens.mt(6);
		max-height: 75vh;
		overflow-y: auto;
	}
}

@keyframes zoom-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes zoom-out {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@keyframes slide-up {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0);
    }
}

@keyframes slide-down {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(100%);
    }
}
</style>
