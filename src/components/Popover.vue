<template>
	<div
		v-show="innerValue"
		id="cds-popover"
		v-on-click-outside="hide"
		class="popover"
	>
		<cds-scrollable
			max-height="250px"
		>
			<slot />
		</cds-scrollable>
	</div>
</template>

<script>
import CdsScrollable from './Scrollable.vue';
import vClickOutside from 'click-outside-vue3';

export default {
	components: {
		CdsScrollable,
	},

	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	props: {
		/**
		 * Controla o tamanho do popover do Dropdown (em pixels).
		 * O tamanho nunca é menor que a largura do Dropdown.
		 */
		modelValue: {
			type: Boolean,
			default: false,
		},
		rightAligned: {
			type: Boolean,
			default: true,
		},
		/**
		 * Controla o tamanho do popover do Dropdown (em pixels).
		 * O tamanho nunca é menor que a largura do Dropdown.
		 */
		width: {
			type: Number,
			default: 0,
		},
		/**
		 * Controla o tamanho do popover do Dropdown (em pixels).
		 * O tamanho nunca é menor que a largura do Dropdown.
		 */
		targetId: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			innerValue: this.modelValue,
		};
	},

	watch: {
		modelValue(value) {
			this.innerValue = value;
		}
	},

	mounted() {
		const target = document.getElementById(this.targetId);
		const popover = document.getElementById('cds-popover');

		const targetDOMRect = target.getBoundingClientRect();
		const popoverDOMRect = popover.getBoundingClientRect();

		popover.style.top = (targetDOMRect.y + targetDOMRect.height) + 'px';

		if (this.rightAligned) {
			popover.style.left = targetDOMRect.left - popoverDOMRect.width + targetDOMRect.width + 'px';
		}
	},

	methods: {
		hide() {
			this.innerValue = false;
			this.$emit('update:modelValue', false);
		}
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.popover {
	// width: v-bind(popoverWidth);
	width: 250px;
	background-color: $n-0;
	padding: pa(4);
	border-radius: $border-radius-extra-small;
	box-shadow: 0px 0px 8px rgba($n-900, .08);
	outline: 1px solid $n-30;
	z-index:999999999;
	color: $n-700;
	position: absolute;
	margin: mt(2);

	min-height: 250px;
	max-height: 450px;

	&--active {
		opacity: 1;
	}

	&--inactive {
		opacity: 1;
	}
}
</style>