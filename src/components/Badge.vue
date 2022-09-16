<template>
	<div
		class="badge__container"
		:class="predefinedStyle"
	>
		<div class="badge__content">
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
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.badge {
	&__container {
		border-radius: 50px !important;
		width: fit-content;
		padding: pYX(1, 2);
	}

	&__content {
		font-size: 12px;
		font-weight: $font-weight-semibold !important;
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
}
</style>
