<template>
	<span
		class="checkbox__container"
		id="cds-checkbox"
	>
		<div class="option__checkbox">
			<input
				v-model="internalValue"
				type="checkbox"
				:name="$attrs.name"
				:value="true"
			/>
			<label
				:id="`checkbox-${option[label]}`"
				:for="`input-${option[label]}`"
				:class="{ 'option__checkbox--checked': option.isSelected }"
				@click="addItemViaCustomCheckbox(option)"
			/>
		</div>
		<!-- @slot Slot usado pra mostrar o conteúdo do checkbox. -->
		<slot>
			{{ label }}
		</slot>
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
		 * Prop com o valor a ser utilizado em caso de o checkbox estar marcado
		 */
		checkedValue: {
			type: [Boolean, Object, String],
			default: true,
		},
		/**
		 * Prop com o valor a ser utilizado em caso de o checkbox não estar marcado
		 */
		uncheckedValue: {
			type: [Boolean, Object, String],
			default: false,
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
};
</script>
<style lang="scss">
@import '../assets/sass/app.scss';

.checkbox__container {
	cursor: pointer;
}

#cds-checkbox [type="checkbox"] {
	width: 18px;
	position: relative;
	margin-right: spacer(6);
	margin-left: spacer(n3);

	label {
		cursor: pointer;
		position: absolute;
		width: 18px;
		height: 18px;
		top: 0;
		border-radius: 4px;
		border: 1px solid $n-500;

		&:after {
			border: 2px solid $n-0;
			border-top: none;
			border-right: none;
			content: "";
			height: 5px;
			left: 3.1px;
			opacity: 0;
			position: absolute;
			top: 4.4px;
			transform: rotate(-45deg);
			width: 8px;
			border-radius: 0.4px;
		}
	}

	&:checked + label:after {
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
		filter: alpha(opacity=100);
		background-color: $gp-500 !important;
		border-radius: $border-radius-button;
		opacity: 1;
	}

	&:focus {
		box-shadow: 0 0 10px red;
		outline: none !important;
	}

	&:indeterminate + label:after {
		-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
		filter: alpha(opacity=100);
		opacity: 1;
		border-left: none;
		top: 4px;
		width: 9px;
		background-color: $gp-500 !important;
		border-radius: $border-radius-button;
		transform: rotate(0deg);
	}
}

// #cds-checkbox [type="checkbox"] + label {
// 	@include body-2;
// 	position: relative;
// 	padding: pl(6);
// 	cursor: pointer;
// 	display: inline-block;
// 	color: $n-500;

// 	&:after {
// 		border: 2px solid $n-0;
// 		border-top: none;
// 		border-right: none;
// 		content: "";
// 		height: 5px;
// 		left: 3.1px;
// 		opacity: 0;
// 		position: absolute;
// 		top: 4.4px;
// 		transform: rotate(-45deg);
// 		width: 8px;
// 		border-radius: 0.4px;
// 	}
// }

// #cds-checkbox [type="checkbox"]:checked + label:before,
// #cds-checkbox [type="checkbox"]:not(:checked) + label:before {
// 	position: absolute;
// 	left: 0;
// 	top: 0;
// 	width: 18px;
// 	height: 18px;
// 	border: 1px solid $n-500;
// 	border-radius: $border-radius-button;
// 	background: $n-0;
// }

// #cds-checkbox [type="checkbox"]:checked + label:after,
// #cds-checkbox [type="checkbox"]:not(:checked) + label:after {
// 	-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
// 	filter: alpha(opacity=100);
// 	background: $gp-500;
// 	position: absolute;
// 	top: 4px;
// 	left: 4px;
// 	-webkit-transition: all 0.3s ease;
// 	transition: all 0.3s ease;
// 	opacity: 1;
// 	// -webkit-transform: scale(1);
// 	// transform: scale(1);
// }

// #cds-checkbox [type="checkbox"]:not(:checked) + label:after {
// 	opacity: 0;
// 	-webkit-transform: scale(0);
// 	transform: scale(0);
// }
</style>
