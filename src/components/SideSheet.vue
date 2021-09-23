<template>
	<span id="side-sheet">
		<transition :name="floatTransition">
			<div
				v-if="value"
				class="side-sheet__overlay"
				tabindex="0"
				@click="shouldCloseOnBackdrop"
			>
				<div
					:class="`side-sheet__container--${position}`"
					@click.stop
				>
					<!-- @slot Slot usado para customizar o botão de fechamento do SideSheet. -->
					<slot name="close-icon">
						<div
							class="close-icon__container"
						>
							<x-icon
								id="close-icon"
								@click.stop="$emit('input', !value)"
							/>
						</div>
					</slot>

					<!-- @slot Slot usado para mostrar o conteúdo dentro do componente. -->
					<slot/>
				</div>
			</div>
		</transition>
	</span>
</template>

<script>
import { XIcon } from 'vue-feather-icons';
import { KeyCodes } from '../utils';

export default {
	components: {
		XIcon,
	},
	props: {
		/**
		 * Prop utilizada como v-model. Controla a visilidade do SideSheet.
		 */
		value: {
			type: Boolean,
			default: false,
			required: true,
		},
		/**
		 * Define a posição ao qual o SideSheet será mostrado.
		*/
		position: {
			type: String,
			default: 'right',
		},
		/**
		 * Define se o SideSheet vai ser fechado com o click no backdrop.
		 */
		noCloseOnBackdrop: {
			type: Boolean,
			default: false,
		},
		/**
		 * Define se o SideSheet vai ser fechado quando o usuário pressionar 'ESC'.
		 */
		noCloseOnEsc: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		floatTransition() {
			return `slide-fade-${this.position}`;
		},
	},

	watch: {
		value(newValue) {
			if (!newValue) {
				this.dettachKeyupEvent();
				return;
			}
			this.attachKeyupEvent();
		},
	},

	created() {
		this.attachKeyupEvent();
	},

	beforeDestroy() {
		this.dettachKeyupEvent();
	},

	methods: {
		shouldCloseOnBackdrop() {
			if (!this.noCloseOnBackdrop) {
				/**
				 * Evento utilizado para implementar o v-model.
				* @event input
				* @type {Event}
				 */
				this.$emit('input', !this.value);
			}
		},
		shouldCloseOnEsc() {
			if (!this.noCloseOnEsc) {
				this.$emit('input', !this.value);
			}
		},

		keyupListener(ev) {
			if (ev.keyCode === KeyCodes.ESC) { // esc
				this.shouldCloseOnEsc();
			}
		},

		attachKeyupEvent() {
			window.addEventListener('keyup', this.keyupListener);
		},

		dettachKeyupEvent() {
			window.removeEventListener('keyup', this.keyupListener);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

#side-sheet .side-sheet__overlay {
	padding: 0;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 999;
	cursor: pointer;
}

#side-sheet .side-sheet__container {
	background: $n-0;
	width: 328px;
	height: 100%;
	border-radius: 0px 0px 0px 0px;

	&--right {
		@extend .side-sheet__container;
		float: right;
	}

	&--left {
		@extend .side-sheet__container;
		float: left;
	}
}

.close-icon__container {
	color: $n-600;
	text-align: right;
	padding: pa(4);

	&:hover {
		color: $n-700;
	}
}

.slide-fade-right-enter-active {
	transition: all .4s ease;
}
.slide-fade-right-leave-active {
	transition: all .4s ease;
}
.slide-fade-right-enter, .slide-fade-right-leave-to{
	transform: translateX(8px);
	opacity: 0;
}

.slide-fade-left-enter-active {
	transition: all .4s ease;
}
.slide-fade-left-leave-active {
	transition: all .4s ease;
}
.slide-fade-left-enter, .slide-fade-left-leave-to{
	transform: translateX(-8px);
	opacity: 0;
}
</style>
