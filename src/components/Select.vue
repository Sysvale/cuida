<template>
	<div
		class="badge__container"
	>
		<span>{{ label }}</span>
		<select :disabled="disabled" v-model="value">
			<option 
				v-for="option in options"
				:key="option.value"
				:placeholder="placeholder"
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
		},
		/**
		 * Especifica a lista de opções do select.
		 */
		options: {
			type: Array,
			default: () => [],
		},
		/**
		 * Guarda o valor selecionado do select.
		 */
		value: {
			type: Object,
			default: {},
		},
	},

	data() {
		return {
			predefinedColors: [
				'turquoise',
				'green',
				'blue',
				'indigo',
				'violet',
				'pink',
				'red',
				'orange',
				'amber',
				'gray',
			],
			value: '',
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
		value(currentOption) {
			this.$emit('input', currentOption);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.badge {
	&__container {
		border-radius: 50px !important;
		width: fit-content;
		padding: pYX(0, 2);
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
