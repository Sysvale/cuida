<template>
	<div v-if="inline">
		<div class="color-picker__label">
			{{ label }}
		</div>
	
		<div
			v-for="(swatchline, i) in swatch"
			:key="i"
			class="color-picker__container"
		>
			<div
				v-for="(color, j) in swatchline"
				:key="j"
			>
				<div
					:class="`color-picker__swatch--${color.replace('$', '')}`"
					@click="SwatchSelection(color)"
				>
					<cds-icon
						v-if="isCurrentColorSelected(color)"
						height="22"
						width="22"
						name="check-outline"
						class="swatch__icon"
						:class="iconColorResolver"
					/>
				</div>
			</div>
		</div>
	</div>

	<div v-else>
		<div
			id="color-picker"
			class="color-picker__trigger"
			@click.stop="showPopover = !showPopover"
		>
			<div class="color-picker__preview" /> 
		</div>

		<cds-popover
			v-model="showPopover"
			:right-aligned="false"
			target-id="color-picker"
			:height="popoverHeight"
			fit-content-width
		>
			<div
				v-for="(swatchline, i) in swatch"
				:key="i"
				class="popover__container"
			>
				<div
					v-for="(color, j) in swatchline"
					:key="j"
				>
					<div
						:class="`color-picker__swatch--${color.replace('$', '')}`"
						@click="SwatchSelection(color)"
					>
						<cds-icon
							v-if="isCurrentColorSelected(color)"
							height="22"
							width="22"
							name="check-outline"
							class="swatch__icon"
							:class="iconColorResolver"
						/>
					</div>
				</div>
			</div>
		</cds-popover>
	</div>
</template>

<script>
import CdsPopover from './Popover.vue';
import CdsIcon from './Icon.vue';
import sassColorVariables from '../assets/sass/colors.module.scss';
import ContrastChecker from '../utils/methods/contrastChecker';

export default {
	components: {
		CdsPopover,
		CdsIcon,
	},

	props: {
		/**
		* Guarda a cor selecionada no Color Picker.
		*/
		modelValue: {
			type: String,
			required: true,
		},
		/**
		 * Especifica a label do ColorPicker.
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		* Especifica a label do input.
		*/
		inline: {
			type: Boolean,
			default: false,
		},
		/**
		* Especifica a label do input.
		*/
		popoverHeight: {
			type: Number,
			default: 190,
		},
		/**
		* Conjunto de cores a serem renderizadas no ColorPicker. A prop espera um Array de Array de tokens de cor. Ex.: $gp-400
		*/
		swatch: {
			type: Array,
			default: () => ([]),
		},
	},

	data() {
		return {
			selectedColor: this.modelValue,
			sassColorVariables,
			showPopover: false,
		};
	},

	computed: {
		iconColorResolver() {
			return this.ContrastChecker(this.selectedColor, '#FFFFFF', 'POOR') 
				? 'swatch__icon--white'
				: 'swatch__icon--black';
		}
	},

	methods:{
		ContrastChecker,

		SwatchSelection(color) {
			this.selectedColor = this.sassColorVariables[color.replace(/-|\$/gi, '')];

			/**
			 * Evento utilizado para emitir a cor selecionada. A cor é emitida como uma string no formato HEX.
			 * @event update:modelValue
			 * @type {Event}
			*/
			this.$emit('update:modelValue', this.selectedColor);
		},

		isCurrentColorSelected(color) {
			return this.selectedColor === this.sassColorVariables[color.replace(/-|\$/gi, '')];
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.color-picker {
	&__container {
		display: flex;
	}

	&__label {
		margin: mb(1);
		@include label;
	}

	&__swatch {
		@include paleteResolver using ($color) {
			background-color: $color;
			height: 24px;
			width: 24px;
			border-radius: 4px;
			margin: mTRBL(1, 1, 0, 0);
			padding-top: 2px;
			padding-left: 1px;
			cursor: pointer;
			transition: $interaction;

			&:hover {
				transform: scale(1.1);
				transition: $interaction;
			}
		}
	}

	&__trigger {
		padding: pa(1);
		outline: 1px solid $n-50;
		width: fit-content;
		border-radius: $border-radius-lil;
		transition: $hover;
		cursor: pointer;

		&:hover {
			outline: 1px solid $n-200;
			transition: $hover;
		}
	}

	&__preview {
		height: 24px;
		width: 24px;
		border-radius: 4px;
		background-color: v-bind(selectedColor);
	}
}

.swatch {
	&__icon {
		&--white {
			color: $n-0;
		}

		&--black {
			color: $n-900;
		}
	}
}

.popover__container {
	display: flex;
}
</style>
