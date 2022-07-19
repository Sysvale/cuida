<template>
	<div id="cds-spinner">
		<div :class="computedSpinnerClass"/>
		<div
			v-if="!noText"
			:class="computedLabelClass"
		>
			{{ label }}
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		*	Texto a ser exibido juntamente com o spinner
		*/
		label: {
			type: String,
			default: 'Carregando...',
		},
		/**
		*	Propriedade para inibir a exibição da etiqueta do Spinner
		*/
		noText: {
			type: Boolean,
			default: false,
		},
		/**
		*	Tamanho do componente
		*/
		size: {
			type: String,
			default: 'md',
			validator: (value) => ['sm', 'md', 'lg'].indexOf(value) > -1,
		},
	},

	computed: {
		computedSpinnerClass() {
			return `spinner--${this.size}`;
		},
		computedLabelClass() {
			return `spinner__label--${this.size}`;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

$spinner-width: 15px;
$spinner-color: #239F78;

.spinner {
	border-width: $spinner-width;
	border-style: solid;
	border-color: $spinner-color $spinner-color $spinner-color transparent;
	border-radius: 50%;
	animation: spin 1.5s infinite;
	position: relative;

	&:before, &:after {
		content: '';
		width: $spinner-width;
		height: $spinner-width;
		border-radius: 50%;
		background: $spinner-color;
		position: absolute;
		left: 0.1px;
	}

	&--sm {
		@extend .spinner;
		width: 40px;
		height: 40px;
		border-width: $spinner-width;

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
		$spinner-width: 8px;

		border-width: $spinner-width;

		&:before, &:after {
			width: $spinner-width;
			height: $spinner-width;
			left: 3px;
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
		border-width: $spinner-width;

		&:before {
			top: 1px;
		}

		&:after {
			bottom: 1px;
		}
	}

	&__label {
		margin: mt(6);
		@include subheading-2;

		&--sm {
			@extend .spinner__label;
		}

		&--md {
			@extend .spinner__label;
		}

		&--lg {
			@extend .spinner__label;
		}
	}
}

@keyframes spin {
	100% {
		transform: rotate(360deg);
	}
}
</style>
