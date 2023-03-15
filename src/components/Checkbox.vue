<template>
	<span
		class="cds-checkbox__container"
		@click="toggleValue"
	>
		<div class="cds-checkbox__content">
			<input
				v-model="internalValue"
				type="checkbox"
				:id="$attrs.id || 'cds-checkbox-option-input'"
				:name="$attrs.name || 'cds-checkbox-option'"
				:value="true"
				:disabled="disabled"
			/>
			<label
				:for="$attrs.id || 'cds-checkbox-option-input'"
				:class="{
					'cds-checkbox__content--checked': internalValue,
					'cds-checkbox__content--disabled': disabled,
				}"
				@click="toggleValue"
			/>
		</div>
		<div
			v-if="!noText"
			class="cds-checkbox__label"
			:class="{
				'cds-checkbox__label--disabled': disabled
			}"
		>
			<!-- @slot Slot usado pra mostrar o conteúdo do checkbox. -->
			<slot>
				{{ label }}
			</slot>
		</div>
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * A prop usada como v-model para monitorar a seleção do Checkbox
		*/
		value: {
			default: null,
			required: true,
		},
		/**
		 * Controla o status checkbox
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Exibe a etiqueta do checkbox
		 */
		label: {
			type: String,
			default: 'checkbox content',
		},
		/**
		 * Controla a exibição da etiqueta do checkbox
		 */
		noText: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			internalValue: this.value,
		};
	},

	watch: {
		internalValue(value) {
			/**
				 * Evento utilizado para o v-model.
				* @event input
				* @type {Event}
			*/
			this.$emit('input', value);
		},

		value: {
			handler(newValue) {
				this.internalValue = newValue;
			},
			immediate: true,
		},
	},

	methods: {
		toggleValue() {
			if (this.disabled) return;
			this.internalValue = !this.internalValue;
		},
	},
};
</script>
<style lang="scss">
@import '../assets/sass/app.scss';

.cds-checkbox__container {
	display: flex;
	align-items: center;
	width: fit-content;
	cursor: pointer;

	input[type=checkbox] {
		visibility: hidden;
	}

	.cds-checkbox__content {
		width: 18px;
		position: relative;
		margin-right: spacer(6);
		margin-left: spacer(n3);

		label {
			cursor: pointer;
			position: absolute;
			width: 18px;
			height: 18px;
			top: 3px;
			border-radius: $border-radius-button;
			border: 1px solid $n-400;

			&:after {
				border: 2px solid $n-0;
				border-top: none;
				border-right: none;
				content: "";
				height: 6px;
				width: 12px;
				left: 3px;
				opacity: 0;
				position: absolute;
				top: 4px;
				transform: rotate(-45deg);
				border-radius: 0.4px;
			}
		}

		input[type=checkbox]:checked + label:after {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			filter: alpha(opacity=100);
			opacity: 1;
		}

		input[type=checkbox]:not(:checked) + label:after {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=1)";
			filter: alpha(opacity=1);
			opacity: 1;
			border: none !important;
		}

		&--checked {
			background-color: $gp-500 !important;
			border: none !important;
		}

		&--disabled {
			background-color: $n-40 !important;
			border: none !important;
		}
	}

	.cds-checkbox__label {
		@include body-2;
		color: $n-600;

		&--disabled {
			@extend .cds-checkbox__label;
			color: $n-300;
		}
	}
}
</style>
