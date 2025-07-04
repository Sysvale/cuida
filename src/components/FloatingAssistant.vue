<template>
	<div
		:id="id"
		class="floating-assistant"
		:class="{ 'floating-assistant--hidden': !isActive }"
	>
		<cds-pulsar
			:id="pulsarId"
			:target-id="targetId"
			:variant="variant"
		/>
		<div
			:id="containerId"
			v-cds-floatify:[position]="pulsarId"
			class="floating-assistant__container"
		>
			<div
				ref="floatingAssistantRef"
				class="floating-assistant__dropdown"
				:class="{
					'floating-assistant__dropdown--expanded': isExpanded,
					'floating-assistant__dropdown--confirmation': waitingConfirmation,
				}"
				@click="expand"
			>
				<div v-if="waitingConfirmation">
					Ocultar dica para sempre?
					<span
						:class="`floating-assistant__link--${variant}`"
						@click="confirmationHandle(true)"
					>
						Sim
					</span> /
					<span
						:class="`floating-assistant__link--${variant}`"
						@click="confirmationHandle(false)"
					>
						Não
					</span>
				</div>
				<div v-else>
					<span :class="`floating-assistant__title--${variant}`">
						{{ title }}
					</span>
					<div
						v-if="isExpanded"
						class="floating-assistant__content"
					>
						<!-- @slot Slot usado para inserção de conteúdo dentro do card do FloatingAssistant
							quando estiver expandido -->
						<slot />
						<span
							v-if="url"
							class="floating-assistant__footer"
						>
							Você pode saber mais
							<a
								:class="`floating-assistant__link--${variant}`"
								:href="url"
								target="_blank"
							>
								clicando aqui
							</a>.
						</span>
					</div>
					<span
						v-else
						class="floating-assistant__subtitle"
					>
						Clique para mais informações
					</span>
				</div>
				<div v-if="isExpanded">
					<div @click.stop="close">
						<cds-icon
							class="floating-assistant__close-button"
							name="x-outline"
							height="20"
							width="20"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CdsPulsar from './Pulsar.vue';
import CdsIcon from './Icon.vue';

export default {
	components: {
		CdsPulsar,
		CdsIcon,
	},

	props: {
		/**
		 * Representa o estado do componente. Quando 'false' o componente não é mostrado
		 * e quando 'true' o componente é exibido.
		 */
		modelValue: {
			type: Boolean,
			default: true,
			required: true,
		},
		/**
		 * O título do card flutuante que é exibido.
		 */
		title: {
			type: String,
			default: 'Nova funcionalidade!',
			validator: (value) => value.length <= 22,
		},
		/**
		 * Define se a animação de exibição do componente vai começar apenas após a ação de scroll pelo usuário.
		 */
		startOnScroll: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * A url para redirecionar para uma página externa ao clicar no
		 * 'clicando aqui' para saber mais sobre o que é descrito no card
		 */
		url: {
			type: String,
			default: '',
		},
		/**
		* A variante da Badge. São 9 variantes: 'turquoise', 'green', 'blue',
		* 'violet', 'pink', 'red', 'orange', 'amber' e 'gray'.
		*/
		variant: {
			type: String,
			default: 'green',
		},
		/**
		* Id do elemento que será referência para a renderização do FloatingAssistant.
		*/
		targetId: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			isActive: this.modelValue,
			id: null,
			pulsarId: null,
			containerId: null,
			position: 'right',
			isExpanded: false,
			waitingConfirmation: false,
			boxTop: 0,
		};
	},

	watch: {
		isActive(newValue) {
			/**
			* Evento emitido quando o componente é exibido ('true') ou ocultado ('false').
			* @event expanded
			* @type {Event}
			*/
			this.$emit('update:modelValue', newValue);
		},

		modelValue(newValue) {
			this.isActive = newValue;
			this.handleEventAnimation();
		},
	},

	mounted() {
		this.handleEventAnimation();

		document.querySelector('body').addEventListener('click', this.closeFloatingAssistant);
	},

	methods: {
		handleEventAnimation() {
			this.id = `floating-assistant$-${this._uid}`;
			this.pulsarId = `floating-assistant-pulsar$-${this._uid}`;
			this.containerId = `floating-assistant-container$-${this._uid}`;

			if (this.startOnScroll) {
				window.addEventListener('scroll', this.startAnimation);
			} else {
				this.startAnimation();
			}
		},

		startAnimation() {
			if (this.startOnScroll) {
				if (this.isScrolledIntoView()) {
					setTimeout(() => {
						document.getElementById(this.id).classList.add('animation');
						window.removeEventListener('scroll', this.startAnimation);
					}, 1000);
				}
			} else {
				setTimeout(() => {
					document.getElementById(this.id).classList.add('animation');
				}, 1000);
			}
		},

		isScrolledIntoView() {
			const { top, bottom } = document.getElementById(this.id).getBoundingClientRect();

			return (top >= 0 && bottom <= window.innerHeight);
		},

		expand() {
			if (!this.waitingConfirmation) {
				this.isExpanded = true;
			}
		},

		collapse() {
			this.isExpanded = false;
		},

		close() {
			this.collapse();
			this.waitingConfirmation = true;
		},

		confirmationHandle(shouldDisable) {
			if (!shouldDisable) {
				this.isActive = false;
				return;
			}

			/**
			* Evento que indica que a opção de desativar a dica foi selecionada
			* @event disable-tip
			* @type {Event}
			*/
			this.$emit('disable-tip', true);
			this.isActive = false;
		},

		closeFloatingAssistant(event) {
			if (
				this.$refs.floatingAssistantRef
				&& !this.$refs.floatingAssistantRef.contains(event.target)
			) {
				this.collapse();
			}
		},
	},
};
</script>


<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.floating-assistant {
	&.animation {
		.floating-assistant__dropdown {
			display: flex;
			animation-name: showCard;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;

			&--expanded {
				animation-name: expandCard;
				animation-duration: 0.5s;
				animation-fill-mode: forwards;
			}
		}

		.floating-assistant__title {
			animation: fadeInTitle ease 1s;
			animation-iteration-count: 1;
			animation-fill-mode: forwards;
		}
	}

	&--hidden {
		animation: fadeOut ease .2s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	&__container {
		display: flex;
		align-items: center;
		width: 100%;
	}

	&__dropdown {
		@include tokens.caption;
		display: none;
		color: tokens.$n-600;
		background-color: tokens.$n-0;
		border-radius: tokens.$border-radius-small;
		outline: 1px solid tokens.$n-20;
		box-shadow: tokens.$shadow-md;
		position: absolute;
		margin: tokens.ml(3);
		padding: tokens.pYX(2, 5);
		z-index: tokens.$z-index-tooltip;
		max-width: 400px;
		transition : 0.3s ease-in-out;

		&--expanded {
			padding: tokens.pYX(3, 5);
			width: 100%;
			max-height: none;

			.floating-assistant__title {
				animation: fadeInContent ease 1s;
				animation-iteration-count: 1;
				animation-fill-mode: forwards;
			}
		}

		&--confirmation {
			animation-name: collapseCard;
			animation-duration: 5s;
			animation-fill-mode: forwards;

			span {
				font-weight: tokens.$font-weight-bold;
			}
		}
	}

	&__title {
		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			width: max-content;
			@include tokens.caption;
			color: $shade-500;
			font-weight: tokens.$font-weight-bold;
			width: 162px;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin: tokens.mb(2);
		}
	}

	&__subtitle {
		display: block;
		width: max-content;
		color: tokens.$n-400;

		animation: fadeInTitle ease 1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	&__content {
		margin: tokens.mt(1);
		width: 304px;
		line-height: 132%;
		animation: fadeInContent ease 1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	&__footer {
		display: block;
		margin: tokens.mt(2);
	}

	&__link {
		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			color: $shade-500;
			cursor: pointer;
		}
	}

	&__close-button {
		color: tokens.$n-600;
		cursor: pointer;

		animation: fadeInContent ease 2s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}
}

@keyframes fadeInContent {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0.3;
	}
	100% {
		opacity: 1;
	}
}

@keyframes fadeInTitle {
	0% {
		opacity: 0;
		margin-top: 8px;
	}
	50% {
		opacity: 0.3;
		margin-top: 2px;
	}
	100% {
		opacity: 1;
		margin-top: 0;
	}
}

@keyframes showCard {
	from { width: 0; }
	to { width: 220px; }
}

@keyframes expandCard {
	from {
		width: 220px;
	}
	to {
		width: 356px;
	}
}

@keyframes collapseCard {
	from {
		width: 356px;
	}
	to {
		width: 206px;
	}
}

@keyframes fadeOut {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0.3;
	}
	100% {
		opacity: 0;
		display: none;
	}
}
</style>
