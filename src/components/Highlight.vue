<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<template v-if="firstHalf">
		{{ firstHalf }}
	</template>
	<span
		class="highlight__container"
		:class="dynamicHighlightClass"
		:style="dynamicStyle"
	>
		<template v-if="highlightedText && isAValidSubstring">
			{{ highlightedText }}
		</template>
		<template v-else>
			<!-- @slot Slot usado para especificar o texto que receberá o highlight. -->
			<slot />
		</template>
	</span>
	<template v-if="secondHalf">
		{{ secondHalf }}
	</template>
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
		/**
		* Define uma substring específica do texto enviada por slot que deve receber o destaque (highlight). ⚠️ Essa prop funciona de modo Case Sensitive.
		*/
		highlightedText: {
			type: [String, null],
			default: null,
		},
	},

	data() {
		return {
			firstHalf: '',
			secondHalf: '',
		}
	},

	computed: {
		hasSlots() {
			return !!Object.keys(this.$slots).length;
		},

		isAValidSubstring() {
			return this.$slots.default()[0].children.includes(this.highlightedText);
		},

		paddingResolver() {
			if (this.highlightedText) {
				return '4px 0px';
			}

			return '4px';
		},

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

	watch: {
		highlightedText() {
			this.splitContent();
		}
	},

	mounted() {
		this.splitContent();
	},

	methods: {
		splitContent() {
			if (this.hasSlots && this.highlightedText && this.isAValidSubstring) {
				[this.firstHalf, this.secondHalf] = this.$slots.default()[0].children.split(this.highlightedText);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.highlight__container {
	background-size: 200%;
	border-radius: 4px;
	padding: v-bind(paddingResolver);

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
