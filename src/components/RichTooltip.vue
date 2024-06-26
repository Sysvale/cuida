<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		:id="$attrs.id || id"
		v-on-click-outside="hide"
		class="richTooltip"
	>
		<slot />
	</div>
</template>

<script>
import vClickOutside from 'click-outside-vue3';
import { createPopper } from '@popperjs/core';
import { generateKey } from '../utils';

export default {
	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	props: {
		/**
		* Prop utilizada como v-model.
		* controla a exibição do Popover.
		*/
		modelValue: {
			type: Boolean,
			default: false,
		},
		/**
		* Largura do Popover. A largura mínima é 100px e a máxima é 400px.
		*/
		width: {
			type: [String, Number],
			default: 250,
		},
		/**
		* Quando true deixa a largura do popover adaptável ao conteúdo. `Essa prop tem prevalência sobre a prop width!`
		*/
		fitContentWidth: {
			type: Boolean,
			default: false,
		},
		/**
		* Id do elemento que será referência para a renderização
		* do Popover.
		*/
		targetId: {
			type: String,
			default: '',
		},
		/**
		* Indica o posicionamento padrão do Popover.
		* Quando não especificado é considerado o posicionamento "bottom"
		*/
		defaultPlacement: {
			type: String,
			default: null,
		}
	},

	data() {
		return {
			id: '',
			target: '',
			popover: '',
			popperInstance: null,
			uniqueKey: generateKey(),
		};
	},

	computed: {
		variationPlacement() {
			return this.rightAligned ? 'end' : 'start';
		},

		popoverWidth() {
			if (this.fitContentWidth) {
				return 'fit-content';
			}

			return `${this.width}px`;
		},
	},

	watch: {
		modelValue(isTrue) {
			if (isTrue) {
				this.show();
			} else {
				this.hide();
			}
		},

		targetId(id) {
			this.setPopper(id);
		},
	},

	mounted() {
		this.id = `cds-popover-${this.uniqueKey}`;
		this.setPopper(this.targetId);
	},

	methods: {
		setPopper(id) {
			this.$nextTick(() => {
				this.target = document.querySelector(`[id='${id}']`);
				this.popover = document.querySelector(`#${this.id}`);

				this.popperInstance = createPopper(this.target, this.popover, {
					placement: this.defaultPlacement === null ? 'bottom' : this.defaultPlacement,
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 8],
							},
						},
						{
							name: 'flip',
							options: {
								fallbackPlacements: ['top'],
							},
						},
					],
				});
			});
		},

		show() {
			this.popover.setAttribute('data-show', '');
			this.popover.classList.remove('popover-hide');
			this.popover.classList.add('popover-show');

			this.popperInstance.setOptions((options) => ({
				...options,
				modifiers: [
					...options.modifiers,
					{ name: 'eventListeners', enabled: true },
				],
			}));

			/**
			* Evento utilizado para implementar o v-model.
			* @event update:modelValue
			* @type {Event}
			*/
			this.$emit('update:modelValue', true)

			this.popperInstance.update();
		},

		hide() {
			this.popover.classList.remove('popover-show');
			this.popover.classList.add('popover-hide');
			setTimeout(() => {
				this.popover.removeAttribute('data-show');
			}, 350); // A duração deve coincidir com a duração da animação no CSS

			this.$nextTick(() => {
				this.popperInstance.setOptions((options) => ({
					...options,
					modifiers: [
						...options.modifiers,
						{ name: 'eventListeners', enabled: false },
					],
				}));
				/**
				* Evento utilizado para implementar o v-model.
				* @event update:modelValue
				* @type {Event}
				*/
				this.$emit('update:modelValue', false);
			});
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes fadeOut {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}

.popover-show {
	animation: fadeIn 0.35s forwards;
}

.popover-hide {
	animation: fadeOut 0.35s forwards;
}

.richTooltip {
	background-color: rgba($n-900, 0.90);
	border-radius: $border-radius-medium;
	box-shadow: 0px 0px 8px rgba($n-900, .08);
	color: $n-0;
	display: none;
	max-width: 400px;
	min-width: 100px;
	outline: 1px solid $n-30;
	overflow: hidden;
	padding: pa(4);
	position: absolute;
	width: v-bind(popoverWidth);
	z-index: $z-index-tooltip;

	&[data-show] {
		display: block;
	}
}
</style>
