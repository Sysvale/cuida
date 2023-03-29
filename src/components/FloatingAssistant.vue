<template>
	<div
		class="floating-assistant"
		:class="{ 'floating-assistant--hidden': !isActive }"
	>
		<cds-pulsar
			:id="pulsarId"
			:target-id="targetId"
		/>
		<div
			:id="containerId"
			v-cds-floatify:[position]="pulsarId"
			class="floating-assistant__container"
		>
			<div
				v-on-click-outside="collapse"
				class="floating-assistant__dropdown"
				:class="{
					'floating-assistant__dropdown--expanded': isExpanded,
					'floating-assistant__dropdown--confirmation': waitingConfirmation,
				}"
				@click="expand"
			>
				<div v-if="waitingConfirmation">
					Desativar esta dica?
					<span
						class="floating-assistant__link"
						@click="confirmationHandle(true)"
					>
						Sim
					</span> /
					<span
						class="floating-assistant__link"
						@click="confirmationHandle(false)"
					>
						Não
					</span>
				</div>
				<div v-else>
					<span class="floating-assistant__title">
						{{ title }}
					</span>
					<div
						v-if="isExpanded"
						class="floating-assistant__content"
					>
						<!-- @slot Slot usado para inserção de conteúdo dentro do card do FloatingAssistant
							quando estiver expandido -->
						<slot />
						<span class="floating-assistant__footer">
							Você pode saber mais
							<a
								class="floating-assistant__link"
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
import vClickOutside from 'click-outside-vue3';
import CdsPulsar from './Pulsar.vue';
import CdsIcon from './Icon.vue';

export default {
	components: {
		CdsPulsar,
		CdsIcon,
	},

	directives: {
		'on-click-outside': vClickOutside.directive,
	},

	props: {
		/**
		 * O título do card flutuante que é exibido.
		 */
		title: {
			type: String,
			default: 'Nova funcionalidade!',
		},
		/**
		 * A url para redirecionar para uma página externa ao clicar no
		 * 'clicando aqui' para saber mais sobre o que é descrito no card
		 */
		url: {
			type: String,
			default: '',
			required: true,
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
			pulsarId: null,
			containerId: null,
			position: 'right',
			isExpanded: false,
			isActive: true,
			waitingConfirmation: false,
		};
	},

	mounted() {
		this.pulsarId = `floating-assistant$-${this._uid}`;
		this.containerId = `floating-assistant-container$-${this._uid}`;
	},

	methods: {
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
		}
	},
};
</script>


<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.floating-assistant {
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
		@include overline;
		color: $n-500;
		background-color: $n-0;
		border-radius: $border-radius-small;
		outline: 1px solid $n-20;
		box-shadow: $shadow-md;
		position: absolute;
		margin: ml(3);
		padding: pYX(2, 5);
		z-index: 999999999;
		display: flex;
		max-width: 336px;
		max-height: 46px;
		transition : 0.3s ease-in-out;

		animation-name: showCard;
		animation-duration: 0.5s;
		animation-fill-mode: forwards;

		&--expanded {
			padding: pYX(3, 5);
			width: 100%;
			max-height: none;

			animation-name: expandCard;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;

			.floating-assistant__title {
				animation: fadeInContent ease 1s;
				animation-iteration-count: 1;
				animation-fill-mode: forwards;
			}
		}

		&--confirmation {
			width: auto !important;

			animation-name: collapseCard;
			animation-duration: 5s;
			animation-fill-mode: forwards;
		}
	}

	&__title {
		display: block;
		width: max-content;
		@include caption;
		color: $gp-400;
		font-weight: $font-weight-bold;

		animation: fadeInTitle ease 1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	&__subtitle {
		display: block;
		width: max-content;
		color: $n-400;

		animation: fadeInTitle ease 1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	&__content {
		margin: mt(1);
		width: 276px;

		animation: fadeInContent ease 1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	&__footer {
		display: block;
		margin: mt(1);
	}

	&__link {
		color: $gp-400;
		cursor: pointer;
	}

	&__close-button {
		color: $n-600;
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
	to { width: 202px; }
}

@keyframes expandCard {
	from {
		width: 202px;
	}
	to {
		width: 336px;
	}
}

@keyframes collapseCard {
	from {
		width: 336px;
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