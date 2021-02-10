<template>
	<div
		v-if="internalShow"
		class="cds-modal-window"
		:style="dynamicStyle"
		v-on-click-outside="hide"
	>
		<!-- @slot Slot usado para inserção de conteúdo dentro do Modal Window. -->
		<slot />
	</div>
</template>

<script>
export default {
	data() {
		return {
			internalShow: false,
		}
	},
	props: {
		/**
		 *  Controla a exibição do modal.
		 */
		show: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Controla o posicionamento do modal horizontalmente.
		 */
		right: {
			type: Number,
			default: 0,
		},
		/**
		 * Controla o posicionamento do modal verticalmente.
		 */
		top: {
			type: Number,
			default: 0,
		},
		/**
		 * Define a altura do modal.
		 */
		height: {
			type: Number,
			default: 100,
		},
		/**
		 * Define a largura do modal.
		 */
		width: {
			type: Number,
			default: 150,
		},
	},

	mounted() {
		this.internalShow = this.show;
	},

	watch: {
		show(value) {
			this.internalShow = this.show;
		},
	},

	computed: {
		dynamicStyle() {
			return {
				'--right': `${this.right}px`,
				'--top': `${this.top}px`,
				'--height': `${this.height}px`,
				'--width': `${this.width}px`,
			};
		},
	},

	methods: {
		hide () {
			/**
			 * Evento que indica se o modal foi escondido.
			* @event hide
			* @type {Event}
			*/
			this.$emit('hide', true);
			this.internalShow = !this.internalShow;
		}
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.cds-modal-window {
	height: var(--height);
	width: var(--width);
	position: absolute;
	background-color: white;
	padding: 20px;
	right: var(--right);
	top: var(--top);
	border-radius: 8px;
	box-shadow: 0px 0px 8px rgba(40, 90, 185, 0.2);
	z-index:999999999;
}
</style>
