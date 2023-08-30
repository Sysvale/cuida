<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		id="cds-pulsar"
		v-cds-floatify:[position]="targetId"
	>
		<div :class="`pulsar__outer-circle--${variant}`">
			<div :class="`pulsar__inner-circle--${variant}`" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * A variante de cor. São 9 variantes implementadas: 'green', 'teal',
		 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange' e 'amber'.
		 */
		variant: {
			type: String,
			default: 'green',
		},
		/**
		* Id do elemento que será referência para a renderização do Pulsar.
		*/
		targetId: {
			type: String,
			default: '',
		},
		/**
		* Posicionamento do Pulsar com relação ao elemento de referência.
		*/
		position: {
			type: String,
			default: 'top-end',
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.pulsar {
	&__inner-circle {
		width: 10px;
		height: 10px;
		opacity: 90%;
		border-radius: $border-radius-circle;
		background-color: $bn-400;
		animation: innerPulse  2.5s cubic-bezier(0, 0, 0.58, 1) both infinite;
	
		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .pulsar__inner-circle;
			background-color: $base-color;
		}
	}
	
	&__outer-circle {
		width: 18px;
		height: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 90%;
		border-radius: $border-radius-circle;
		animation: outerPulse 2.5s cubic-bezier(0, 0, 0.58, 1) both infinite;
	
		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			@extend .pulsar__outer-circle;
			background-color: $shade-200;
		}
	}
}

@keyframes innerPulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes outerPulse {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.6);
	}
	100% {
		transform: scale(1);
	}
}
</style>