<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="chip__container"
		:class="classList"
		data-testid="chip-container"
		@click="handleClick"
	>
		<div
			:class="`chip__content--${size}`"
		>
			<div
				class="chip__content-container"
				:style="{
					maxWidth,
					...containerStyle,
				}"
			>
				<transition name="fade">
					<cds-icon
						v-if="internalValue"
						class="chip__content-icon"
						:height="icon.height"
						:width="icon.width"
						name="check-outline"
					/>
				</transition>
				<div ref="slot-content">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { colorOptions } from '../utils/constants/colors';
import sizes from '../utils/constants/sizes';
import CdsIcon from './Icon.vue'

export default {
	components: {
		CdsIcon,
	},

	props: {
		/**
		 *  Controla o estado de seleção da chip.
		 */
		modelValue: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue', 'dark',
		 * 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		 * Especifica o tamanho da chip. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
		},
	},

	emits: [
		/**
		 * Evento emitido para gerenciar o valor de seleção do chip.
		 * @event update:modelValue
		 * @type {Event}
		 */
		'update:modelValue',
	],

	data() {
		return {
			predefinedColors: colorOptions,
			predefinedSizes: sizes,
			internalValue: this.modelValue,
			classList: '',
			shouldUpdatePadding: true,
			maxWidth: '0px',
		};
	},

	computed: {
		predefinedStyle() {
			let dynamicClass = '';

			if(!this.internalValue) {
				dynamicClass += ' chip--not-selected';
			}

			if (this.predefinedColors.indexOf(this.variant) > -1) {
				dynamicClass += ` chip--${this.variant}`;
			}

			if (this.predefinedSizes.indexOf(this.size) > -1) {
				dynamicClass += ` chip--${this.size}`;
			}

			return dynamicClass;
		},

		icon() {
			switch(this.size) {
				case 'sm':
					return {
						height: 14,
						width: 14,
					};
				case 'lg':
					return {
						height: 20,
						width: 20,
					};
				default:
					return {
						height: 18,
						width: 18,
					};
			}
		},

		containerStyle() {
			return this.shouldUpdatePadding ? {
				paddingRight: ((this.icon.width/2) + 2) + 'px',
				paddingLeft: ((this.icon.width/2) + 2) + 'px',
			} : {};
		},
	},

	
	watch: {
		modelValue(newValue) {
			this.internalValue = newValue;
		},

		internalValue(newValue) {
			if(!newValue) {
				this.classList += ' chip--not-selected';
			} else {
				this.classList = this.removeNotSelectedClass();
			}

			setTimeout(() => {
				this.shouldUpdatePadding = !newValue;
			}, 300);

			this.$emit('update:modelValue', newValue);
		}
	},

	mounted() {
		this.classList = this.predefinedStyle;
		setTimeout(() => {
			this.maxWidth = (this.$refs['slot-content']?.offsetWidth || 0) + 4 + this.icon.width + 'px';
		}, 100);
	},

	methods: {
		handleClick() {
			this.internalValue = !this.internalValue;
		},
		removeNotSelectedClass() {
			let regex = new RegExp('chip--not-selected', 'g');
			return this.classList.replace(regex, '');
		}
	}
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.chip {
	&__container {
		border-radius: 50px !important;
		width: fit-content;
		cursor: pointer;
	}

	&--not-selected {
		color: $n-400 !important;
		background-color: $n-20 !important;
		outline: none !important;
	}


	&--sm {
		padding: pYX(1, 2);
	}

	&--md {
		padding: pYX(1, 2);
	}

	&--lg {
		padding: pYX(1, 3);
	}

	&__content {
		&--sm {
			@include overline;
		}

		&--md {
			@include caption;
			font-weight: $font-weight-semibold;
			line-height: 18px;
		}

		&--lg {
			@include button-1;
			font-weight: $font-weight-semibold;
		}
	}

	&__content-container {
		display: flex;
		align-items: center;
		gap: spacer(1);
		justify-content: center;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
		color: darken($shade-500, 4%);
		background-color: $shade-100;
		outline: 1px solid $shade-600;

		&:hover {
			color: darken($shade-600, 10%) !important;
			background-color: $shade-100 !important;
		}
	}

	&--amber {
		color: $al-700;
		background-color: $al-100;

		&:hover {
			color: darken($al-700, 10%) !important;
			background-color: $al-100 !important;
		}
	}

	&--gray {
		color: $n-600;
		background-color: $n-20;

		&:hover {
			color: darken($n-600, 10%) !important;
			background-color: $n-20 !important;
		}
	}

	&--white {
		color: $n-800;
		background-color: $n-0;
		outline: 1px solid $n-100;

		&:hover {
			color: darken($n-600, 10%) !important;
			background-color: $n-0 !important;
		}
	}

	&--dark {
		color: $n-10;
		background-color: $n-700;
		outline: 1px solid $n-800;

		&:hover {
			color: darken($n-10, 10%) !important;
			background-color: $n-700 !important;
		}
	}
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
