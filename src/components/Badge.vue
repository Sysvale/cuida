<template>
	<div
		class="badge__container"
		:class="predefinedStyle"
	>
		<div
			:class="{
				'badge__content--sm': size === 'sm',
				'badge__content--md': size === 'md',
				'badge__content--lg': size === 'lg',
			}"
		>
			<!-- @slot Slot padrão utilizado para exibir o conteúdo dentro da badge -->
			<slot/>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue',
		 * 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
		 */
		variant: {
			type: String,
			default: 'gray',
		},
		/**
		 * Especifica o tamanho da badge. São 3 tamanhos implementados: 'sm', 'md', 'lg'.
		 */
		size: {
			type: String,
			default: 'md',
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
				'white',
			],
			predefinedSizes: [
				'sm',
				'md',
				'lg',
			],
		};
	},

	computed: {
		predefinedStyle() {
			let dynamicClass = '';

			if (this.predefinedColors.indexOf(this.variant) > -1) {
				dynamicClass += `badge--${this.variant}`;
			}

			if (this.predefinedSizes.indexOf(this.size) > -1) {
				dynamicClass += ` badge--${this.size}`;
			}

			return dynamicClass;
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.badge {
	&__container {
		border-radius: 50px !important;
		width: fit-content;
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
			font-weight: $font-weight-medium;
		}

		&--lg {
			@include button-2;
			font-weight: $font-weight-medium;
		}
	}

	&--turquoise {
		color: $ts-600;
		background-color: $ts-100;
	}

	&--green {
		color: $gp-600;
		background-color: $gp-100;
	}

	&--blue {
		color: $bn-500;
		background-color: $bn-100;
	}

	&--indigo {
		color: $in-600;
		background-color: $in-100;
	}

	&--violet {
		color: $vr-600;
		background-color: $vr-100;
	}

	&--pink {
		color: $pp-600;
		background-color: $pp-100;
	}

	&--red {
		color: $rc-600;
		background-color: $rc-100;
	}

	&--orange {
		color: $og-500;
		background-color: $og-100;
	}

	&--amber {
		color: $al-600;
		background-color: $al-100;
	}

	&--gray {
		color: $n-600;
		background-color: $n-20;
	}

	&--white {
		color: $n-600;
		background-color: $n-0;
		outline: 1px solid $n-50;
	}
}
</style>
