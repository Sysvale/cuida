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
					placement: `bottom`,
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
								fallbackPlacements: [`top`],
							},
						},
					],
				});
			});
		},

		show() {
			this.popover.setAttribute('data-show', '');

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
			this.$nextTick(() => {
				this.popover.removeAttribute('data-show');

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
