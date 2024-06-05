<template>
	<div v-if="internalModelValue">
		<div
			:class="toggleAnimationClass ? 'backdrop__show' : 'backdrop__hide'"
		>
			<div
				v-on-click-outside="closeHandle"
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
						<cds-icon
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
</template>

<script>
import Icon from './Icon.vue';
import vClickOutside from 'click-outside-vue3';

export default {
	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	components: {
		'cds-icon': Icon,
	},

	props: {
		/**
		 *  Controla a exibição do bottom sheet.
		 */
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
		},

		/**
		 * Define o título do bottom sheet exibido no header
		 */
		title: {
			type: String,
			default: 'Onde encontrar o meu CNS',
		},
	},

	emits: [
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
	],

	data() {
		return {
			internalModelValue: this.modelValue,
			toggleAnimationClass: true,
		};
	},

	watch: {
		modelValue(newValue, oldValue) {
			if (newValue !== oldValue) {
				this.mustDisableExternalScrolls(newValue);
				this.internalModelValue = newValue;
			}
		},
	},

	methods: {
		closeHandle() {
			this.toggleAnimationClass = false;

			setTimeout(() => {
				this.internalModelValue = false;
				this.toggleAnimationClass = true;
				this.$emit('update:model-value', false);
				this.$emit('close', true);
			}, 300);
		},

		mustDisableExternalScrolls(value) {
			document.body.style.overflow = value ? 'hidden' : 'auto';
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.backdrop {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	padding: px(4);
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.45);
	z-index: 1060;

	&__show {
		@extend .backdrop;
		animation: zoom-in ease .5s;
	}

	&__hide {
		@extend .backdrop;
		animation: zoom-out ease .5s;
	}
}

.bottom-sheet {
	width: 100%;
    height: 100%;
    border-top-left-radius: $border-radius-extra-large;
    border-top-right-radius: $border-radius-extra-large;
	position: absolute;
	bottom: 0;
	height: fit-content;
	z-index: $z-index-modal;
	background-color: $n-0;
	padding: pa(6);
	color: $n-800;

	&__header-border {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: mTRBL(n2, 0, 4, 0);
	}

	&__header-border-line {
		width: 30px;
		height: 4px;
		background: $n-40;
		border-radius: $border-radius-large;
	}

	&__show {
		@extend .bottom-sheet;
		animation: slide-up ease .5s;
	}

	&__hide {
		@extend .bottom-sheet;
		animation: slide-down ease .5s;
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
		@include button-1;
		font-weight: 700;
	}

	&__content {
		margin: mt(6);
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
