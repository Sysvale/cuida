<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		:id="$attrs.id || id"
		v-on-click-outside="hide"
		class="popover"
	>
		<cds-scrollable
			v-if="!verticalFluid"
			:max-height="`${popoverHeight}`"
		>
			<!-- @slot Slot utilizado para renderização do conteúdo do Popover.-->
			<slot />
		</cds-scrollable>
		
		<slot v-else />
	</div>
</template>

<script>
import CdsScrollable from './Scrollable.vue';
import vClickOutside from 'click-outside-vue3';
import { createPopper } from '@popperjs/core';
import { generateKey } from '../utils';

export default {
	components: {
		CdsScrollable,
	},

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
		 * Altura do Popover. A altura máxima é 500px
		 */
		height: {
			type: [String, Number],
			default: 200,
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
		 * Quando `true`, alinha o popover à direita do
		 * do componente referência (target).
		 */
		rightAligned: {
			type: Boolean,
			default: false,
		},
		/**
		 * Quando `true`, remove o scroll interno e torna
		 * o tamanho do Popover fluido.
		 */
		verticalFluid: {
			type: Boolean,
			default: false,
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

		popoverHeight() {
			return this.verticalFluid ? 'fit-content' : `${this.height}px`;
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
					placement: `bottom-${this.variationPlacement}`,
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
								fallbackPlacements: [`top-${this.variationPlacement}`],
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
.popover {
	background-color: $n-0;
	border-radius: $border-radius-extra-small;
	box-shadow: 0px 0px 8px rgba($n-900, .08);
	color: $n-700;
	display: none;
	max-height: 500px;
	max-width: 400px;
	min-height: v-bind(popoverHeight);
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
