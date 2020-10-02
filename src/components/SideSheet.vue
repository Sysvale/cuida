<template>
	<span id="side-sheet">
		<transition :name="floatTransition">
			<div
				v-if="value"
				class="overlay"
				tabindex="0"
				@click="shouldCloseOnBackdrop"
			>
				<div
					class="container px-0"
					:class="floatClass"
					@click.stop
				>
					<!-- @slot Slot usado para customizar o botão de fechamento do SideSheet. -->
					<slot name="close-icon">
						<div
							class="text-right p-3"
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
		 * Define se o SideSheet vai ser mostrado no canto direito. Situação padrão.
		 */
		right: {
			type: Boolean,
			default: false,
		},
		/**
		 * Define se o SideSheet vai ser mostrado no canto esquerdo.
		 */
		left: {
			type: Boolean,
			default: false,
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
		floatClass() {
			if (this.left) {
				return 'left';
			}

			return 'right';
		},

		floatTransition() {
			if (this.left) {
				return 'slide-fade-left';
			}

			return 'slide-fade-right';
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
		}
	},
};
</script>
<style>
#side-sheet .overlay {
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

#side-sheet .container {
	background: #fff;
	width: 328px;
	height: 100%;
	border-radius: 0px 0px 0px 0px;
}

#close-icon {
	color: rgb(106, 117, 128, 0.75);
}

#close-icon:hover {
	color: rgb(106, 117, 128, 1);
}

.right {
	float: right;
}

.left {
	float: left;
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
