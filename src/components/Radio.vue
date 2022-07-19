<template>
	<span class="cds-radio">
		<input
			type="radio"
			:id="value"
			:value="value"
			v-model="selected"
			:disabled="disabled"
		>
		<label
			class="cds-radio__content"
			:for="value"
		>
			<slot name="label">
				<span
					class="cds-radio__label"
				>
					{{ label }}
				</span>
			</slot>
		</label>
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
		label: {
			type: String,
			default: false,
			required: true,
		},
		/**
		 * Controla o status do grupo de radio buttons
		 */
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Controla o status do grupo de radio buttons
		 */
		invalid: {
			type: Boolean,
			default: false,
			required: false,
		},
	},

	data() {
		return {
			selected: this.value,
		};
	},

	watch: {
		selected(value) {
			/**
			* Evento emitido quando o radio muda seu estado.
			* @event change
			* @type {Event}
			*/
			this.$emit('change', value);
		},

		value: {
			handler(newValue) {
				this.selected = newValue;
			},
			immediate: true,
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

.cds-radio [type="radio"]:checked,
.cds-radio [type="radio"]:not(:checked) {
	position: absolute;
	left: -9999px;
}

.cds-radio [type="radio"]:checked + label,
.cds-radio [type="radio"]:not(:checked) + label
{
	position: relative;
	padding: pl(7);
	cursor: pointer;
	line-height: 20px;
	display: inline-block;
	color: $n-600;
}

.cds-radio [type="radio"]:checked + label:before,
.cds-radio [type="radio"]:not(:checked) + label:before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	width: 20px;
	height: 20px;
	border: 1px solid $n-800;
	border-radius: 100%;
	background: $n-0;
}

.cds-radio [type="radio"]:checked + label:after,
.cds-radio [type="radio"]:not(:checked) + label:after {
	content: '';
	width: 12px;
	height: 12px;
	background: $bn-600;
	position: absolute;
	top: 4px;
	left: 4px;
	border-radius: 100%;
	-webkit-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

.cds-radio [type="radio"]:not(:checked) + label:after {
	opacity: 0;
	-webkit-transform: scale(0);
	transform: scale(0);
}

.cds-radio [type="radio"]:checked + label:after {
	opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
}

.cds-radio {
	&__content {
		margin: ma(0);
	}
}
</style>
