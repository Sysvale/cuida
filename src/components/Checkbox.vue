<template>
	<span
		id="cds-checkbox"
		class="checkbox__container"
		@click="toggleValue"
	>
		<div class="checkbox__content">
			<input
				v-model="internalValue"
				type="checkbox"
				:id="$attrs.name || 'cds-checkbox-option'"
				:name="$attrs.name || 'cds-checkbox-option'"
				:value="true"
			/>
			<label
				:for="$attrs.name || 'cds-checkbox-option'"
				:class="{ 'checkbox__content--checked': internalValue }"
				@click="toggleValue"
			/>
		</div>
		<!-- @slot Slot usado pra mostrar o conteúdo do checkbox. -->
		<div
			class="checkbox__label"
		>
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
		 * A prop usada como v-model para monitorar a seleção do RadioButton
		*/
		value: {
			default: null,
			required: true,
		},
		/**
		 * Controla o status do grupo de radio buttons
		 */
		disabled: {
			type: Boolean,
			default: false,
		},
		/**
		 * Controla o status do grupo de radio buttons
		 */
		label: {
			type: String,
			default: 'checkbox content',
		},
	},

	data() {
		return {
			internalValue: this.value,
		};
	},

	watch: {
		internalValue(value) {
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
			this.internalValue = !this.internalValue;
		},
	}
};
</script>
<style lang="scss">
@import '../assets/sass/app.scss';

.checkbox__container {
	display: flex;
	align-items: center;
	width: fit-content;
	cursor: pointer;
}

#cds-checkbox {


	input[type=checkbox] {
		visibility: hidden;
	}

	.checkbox__content {
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
			border: 1px solid $n-500;

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

		input[type="checkbox"]:indeterminate + label:after {
			-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
			filter: alpha(opacity=100);
			opacity: 1;
			border-left: none;
			top: 4px;
			width: 9px;
			transform: rotate(0deg);
		}
	}

	.checkbox__content--checked {
		background-color: $gp-500 !important;
		border: none !important;
	}

	.checkbox__content--indeterminate {
		background-color: $gp-500 !important;
		border: none !important;
	}

	.checkbox__label {
		@include body-2;
		color: $n-500;
	}
}


</style>
