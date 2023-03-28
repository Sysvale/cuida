<template>
	<div
		v-if="isActive"
		class="floating-assistant"
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
				:class="{ 'floating-assistant__dropdown--expanded': isExpanded }"
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

		&--expanded {
			padding: pYX(3, 5);
		}
	}

	&__title {
		display: block;
		@include caption;
		color: $gp-400;
		font-weight: $font-weight-bold;
	}

	&__subtitle {
		color: $n-400;
	}

	&__content {
		margin: mt(1);
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
	}
}
</style>