<template>
	<div id="cds-spinner">
		<div
			id="spinner"
			:class="computedSpinnerClass"
		/>
		<div
			v-if="withTitle"
			id="title"
			class="spinner__title"
		>
			{{ title }}
		</div>
		<div
			v-if="withSubtitle"
			id="subtitle"
			class="spinner__subtitle"
		>
			{{ subtitle }}
		</div>
	</div>
</template>

<script>
const predefinedColors = [
	'teal',
	'green',
	'blue',
	'indigo',
	'violet',
	'pink',
	'red',
	'orange',
	'amber',
];
const predefinedSizes = ['sm', 'md', 'lg'];

export default {
	props: {
		/**
		*	Texto a ser exibido como título do Spinner
		*/
		title: {
			type: String,
			default: 'Insert title here',
		},
		/**
		*	Texto a ser exibido como subtítulo do Spinner
		*/
		subtitle: {
			type: String,
			default: 'Insert subtitle here',
		},
		/**
		*	Propriedade para inibir a exibição do título do Spinner
		*/
		withTitle: {
			type: Boolean,
			default: false,
		},
		/**
		*	Propriedade para inibir a exibição do subtítulo do Spinner
		*/
		withSubtitle: {
			type: Boolean,
			default: false,
		},
		/**
		*	Tamanho do componente ('sm', 'md' ou 'lg')
		*/
		size: {
			type: String,
			default: 'md',
			validator: (value) => predefinedSizes.indexOf(value) > -1,
		},
		/**
		*	Variante de cor do componente ('teal', 'green', 'blue',
			'indigo', 'violet', 'pink', 'red', 'orange', 'amber')
		*
		*/
		variant: {
			type: String,
			default: 'green',
			validator: (value) => predefinedColors.indexOf(value) > -1,
		},
	},

	computed: {
		computedSizeClass() {
			return `spinner--${this.size}`;
		},
		computedColorClass() {
			return `spinner--${this.variant}`;
		},
		computedSpinnerClass() {
			return `${this.computedSizeClass} ${this.computedColorClass}`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

$colors: (
	'--teal': $ts-400,
	'--green': $gp-400,
	'--blue': $bn-400,
	'--indigo': $in-400,
	'--violet': $vr-400,
	'--pink': $pp-400,
	'--red': $rc-400,
	'--orange': $og-400,
	'--amber': $al-400,
);

.spinner {
	border-style: solid;
	border-radius: 50%;
	animation: spin 1.5s infinite;
	position: relative;

	&:before, &:after {
		content: '';
		border-radius: 50%;
		position: absolute;
	}

	&--sm {
		@extend .spinner;
		width: 40px;
		height: 40px;
		border-width: 4px;

		&:before, &:after {
			width: 4px;
			height: 4px;
			left: 2px;
		}

		&:before {
			top: 1px;
		}

		&:after {
			bottom: 1px;
		}
	}

	&--md {
		@extend .spinner;
		width: 80px;
		height: 80px;
		border-width: 8px;

		&:before, &:after {
			width: 8px;
			height: 8px;
			left: 4px;
		}

		&:before {
			top: 1px;
		}

		&:after {
			bottom: 1px;
		}
	}

	&--lg {
		@extend .spinner;
		width: 120px;
		height: 120px;
		border-width: 15px;

		&:before, &:after {
			width: 15px;
			height: 15px;
			left: 1px;
		}

		&:before {
			top: 1px;
		}

		&:after {
			bottom: 1px;
		}
	}

	&__title {
		margin: mt(6);
		@include subheading-2;
		color: $n-300;
	}

	&__subtitle {
		margin: mt(3);
		@include caption;
		color: $n-100;
	}

	@each $color, $variant in $colors {
		&#{$color} {
			$spinner-color: $variant;
			border-color: $spinner-color $spinner-color $spinner-color transparent;
			&:before, &:after {
				background: $spinner-color;
			}
		}
	}
}

@keyframes spin {
	100% {
		transform: rotate(360deg);
	}
}
</style>
