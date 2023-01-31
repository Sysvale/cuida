<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<span
		class="highlight__container"
		:class="dynamicHighlightClass"
		:style="dynamicStyle"
	>
		<!-- @slot Slot usado para especificar o texto que receberá o highlight. -->
		<slot />
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * A variante do Highlight. São 3 variantes implementadas: 'info', 'success'
		 * e 'danger'
		 */
		variant: {
			type: String,
			default: 'info',
		},
		/**
		 * Especifica se o highlight vai ser estático ou animado.
		 */
		animated: {
			type: Boolean,
			default: false,
		},
		/**
		 * Especifica a duração da animação.
		 */
		duration: {
			type: Number,
			default: 1,
		},
		/**
		 * O tempo de espera até a animação começar.
		 */
		delay: {
			type: Number,
			default: 0,
		},
	},

	computed: {
		dynamicHighlightClass() {
			let dynamicClass = '';

			if (this.animated) {
				dynamicClass = 'highlight__container--highlighted';
			}

			switch (this.variant) {
				case 'info':
					return `${dynamicClass} highlight__container--info`;
				case 'success':
					return `${dynamicClass} highlight__container--success`;
				case 'danger':
					return `${dynamicClass} highlight__container--danger`;
				default:
					return `${dynamicClass} highlight__container--info`;
			}
		},

		dynamicStyle() {
			return {
				'--duration': `${this.duration}s`,
				'--delay': `${this.delay}s`,
			};
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.highlight__container {
	background-size: 200%;
	border-radius: 4px;
	padding: pa(1);

	&--highlighted {
		animation: highlight var(--duration) ease-in var(--delay) backwards;
	}

	&--info {
		background-image: linear-gradient(to right, rgba($bn-300, .25) 50%, transparent 50%);
	}

	&--success {
		background-image: linear-gradient(to right, rgba($gp-300, .28) 50%, transparent 50%);
	}

	&--danger {
		background-image: linear-gradient(to right, rgba($rc-300, .22) 50%, transparent 50%);
	}
}

@keyframes highlight {
	0% {
		background-position: 100%;
	}
}
</style>
