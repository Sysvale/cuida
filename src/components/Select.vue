<template>
	<div
		id="cds-select"
	>
		<span>{{ label }}</span>
		<select
			:disabled="disabled"
			v-model="selected"
			class="select__container"
		>
			<option
				v-for="option in options"
				:key="option.value"
			>
				{{ option.value }}
			</option>
		</select>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Prop que especifica o título do select.
		 */
		label: {
			type: String,
			default: 'Label',
			required: true,
		},
		/**
		 * Prop que indica o texto que instrui o usuário a como interagir com o select.
		 */
		placeholder: {
			type: String,
			default: 'Selecione...',
		},
		/**
		 * Prop que indica o estado do select.
		 */
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Especifica a lista de opções do select.
		 */
		options: {
			type: Array,
			default: () => [],
			required: true,
		},
		/**
		 * Guarda o valor selecionado do select.
		 */
		value: {
			type: Object,
			default: () => {},
			required: true,
		},
	},

	data() {
		return {
			selected: this.value,
		};
	},

	computed: {
		predefinedStyle() {
			if (this.predefinedColors.indexOf(this.variant) > -1) {
				return `badge--${this.variant}`;
			}
			return 'badge--gray';
		},
	},

	watch: {
		selected(currentOption) {
			this.$emit('input', currentOption);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.select {
	&__container {
		border-radius: $border-radius-extra-small;
		width: fit-content;
		height: 40px;
		border: 1px solid $n-40;
		background: $n-0;
	}

	&__content {
		font-weight: 500 !important;
		@include body-2;
	}

	&--turquoise {
		color: $ts-700;
		background-color: $ts-100;
		border: 1px solid $ts-400;
	}

	&--green {
		color: $gp-700;
		background-color: $gp-100;
		border: 1px solid $gp-400;
	}

	&--blue {
		color: $bn-700;
		background-color: $bn-100;
		border: 1px solid $bn-400;
	}

	&--indigo {
		color: $in-700;
		background-color: $in-100;
		border: 1px solid $in-400;
	}

	&--violet {
		color: $vr-700;
		background-color: $vr-100;
		border: 1px solid $vr-400;
	}

	&--pink {
		color: $pp-700;
		background-color: $pp-100;
		border: 1px solid $pp-400;
	}

	&--red {
		color: $rc-700;
		background-color: $rc-100;
		border: 1px solid $rc-400;
	}

	&--orange {
		color: $og-700;
		background-color: $og-100;
		border: 1px solid $og-400;
	}

	&--amber {
		color: $al-700;
		background-color: $al-100;
		border: 1px solid $al-500;
	}

	&--gray {
		color: $n-700;
		background-color: $n-20;
		border: 1px solid $n-200;
	}
}
</style>
