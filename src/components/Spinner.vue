<template>
	<div
		id="cds-spinner"
		class="spinner__container"
	>
		<div
			id="spinner"
			:class="computedSpinnerClass"
		/>
	</div>
</template>

<script>
import { colorOptions } from '../utils/constants/colors';

const sizeOptions = ['sm', 'md', 'lg'];

export default {
	props: {
		size: {
			type: String,
			default: 'md',
			validator: (value) => sizeOptions.indexOf(value) > -1,
		},
		/**
		*	Variante de cor do componente ('turquoise', 'green', 'blue',
			'indigo', 'violet', 'pink', 'red', 'orange', 'amber')
		*
		*/
		variant: {
			type: String,
			default: 'green',
			validator: (value) => colorOptions.indexOf(value) > -1,
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
	'--turquoise': $ts-400,
	'--green': $gp-400,
	'--blue': $bn-400,
	'--indigo': $in-400,
	'--violet': $vr-400,
	'--pink': $pp-400,
	'--red': $rc-400,
	'--orange': $og-400,
	'--amber': $al-400,
);

$size-sm: 16px;

.spinner {
	border-style: solid;
	border-radius: 50%;
	animation: spin 0.8s infinite linear;
	position: relative;

	&:before, &:after {
		content: '';
		border-radius: 50%;
		position: absolute;
	}

	&--sm {
		@extend .spinner;
		width: $size-sm;
		height: $size-sm;
		border-width: 3px;

		&:before, &:after {
			width: 3px;
			height: 3px;
			left: -2px;
		}

		&:before {
			top: 7px;
		}

		&:after {
			bottom: 8px;
			left: -1px;
		}
	}

	&--md {
		@extend .spinner;
		width: $size-sm * 2;
		height: $size-sm * 2;
		border-width: 5px;

		&:before, &:after {
			width: 5px;
			height: 5px;
			left: 0px;
		}

		&:before {
			top: -2px;
		}

		&:after {
			bottom: -2px;
		}
	}

	&--lg {
		@extend .spinner;
		width: $size-sm * 4;
		height: $size-sm * 4;
		border-width: 8px;

		&:before, &:after {
			width: 8px;
			height: 8px;
			left: 1px;
		}

		&:before {
			top: 0px;
		}

		&:after {
			bottom: 0px;
		}
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

	&__container {
		width: fit-content;
		padding: pa(2);
	}
}

@keyframes spin {
	100% {
		transform: rotate(360deg);
	}
}
</style>
