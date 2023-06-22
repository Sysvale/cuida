<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="cds-wizard">
		<div class="cds-wizard__container">
			<cds-box
				v-for="(step, index) in steps"
				:key="`wizard-step-${index}`"
				:class="{ 'cds-wizard__empty-state-box': currentStep < index }"
				:padding="5"
				:elevated="currentStep === index"
				fluid
				:clickable="clickable"
				@box-click="handleStepBoxClick(index)"
				@click.prevent
			>
				<span v-if="currentStep >= index">
					<slot :name="`step-${index + 1}-header`">
						<h3 class="cds-wizard__title">
							{{ step.title }}
						</h3>
						<h4 class="cds-wizard__subtitle">
							{{ step.subtitle }}
						</h4>
					</slot>
					<div class="cds-wizard__content">
						<slot :name="`step-${index + 1}`" />
					</div>
				</span>
				<div
					v-else
					class="cds-wizard__empty-state"
				>
					<img
						v-if="step.image"
						class="cds-wizard__empty-state-image"
						:src="step.image"
						:alt="`Imagem de ${step.title}`"
					>
					<div
						class="cds-wizard__empty-state-title"
					>
						{{ step.title }}
					</div>
					<div
						class="cds-wizard__empty-state-subtitle"
					>
						{{ emptyStateText(step.title) }}
					</div>
				</div>
			</cds-box>
		</div>
		<div class="cds-wizard__buttons">
			<cds-button
				:text="cancelButtonText"
				secondary
				@button-click="backActionClick"
				@click.prevent
			/>
			<cds-button
				:text="nextButtonText"
				:variant="nextButtonVariant"
				:disabled="disableNextButton"
				@button-click="nextActionClick"
				@click.prevent
			/>
		</div>
	</div>
</template>

<script>
import CdsBox from './Box.vue';
import CdsButton from './Button.vue';

export default {
	components: {
		CdsBox,
		CdsButton,
	},

	props: {
		/**
		 * Um array com objetos com as propriedades 'title' (obrigatório), 'subtitle' e 'image'.
		 * O 'title' e 'subtitle' são textos que descrevem a etapa, a 'imagem' é o caminho para
		 * a imagem do empty-state;
		 */
		steps: {
			type: Array,
			default: () => ([]),
			required: true,
			validator: (value) => value.length >= 2 && value.length <= 3,
		},
		/**
		 * O índice da etapa atual (0, 1 ou 2)
		 */
		activeStep: {
			type: Number,
			default: 0,
			validator: (value) => (value >= 0 && value <= 2),
		},
		/**
		* Ativa ou desativa o clique no passo (etapa) para ir para esta etapa
		*/
		clickable: {
			type: Boolean,
			default: false,
		},
		/**
		 * O texto do botão de avançar (ação principal).
		 */
		nextButtonText: {
			type: String,
			default: 'Próximo',
		},
		/**
		 * O texto do botão de voltar (ação secundária).
		 */
		cancelButtonText: {
			type: String,
			default: 'Anterior',
		},
		/**
		 * A variante do botão de ação principal. São 10 variantes: 'teal', 'green', 'blue',
		 * 'indigo', 'violet', 'pink', 'red', 'orange', 'amber' e 'dark'.
		 */
		nextButtonVariant: {
			type: String,
			default: 'green',
		},
		/**
		 * Controla a disponibilidade do botão de ação principal.
		 */
		disableNextButton: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			currentStep: this.activeStep,
		};
	},

	computed: {
		disabledBack() {
			return this.currentStep <= 0;
		},

		disabledNext() {
			return this.currentStep >= this.steps.length - 1;
		},
	},

	watch: {
		activeStep: {
			handler(newValue, oldValue) {
				if (newValue !== oldValue) {
					this.currentStep = newValue;
				}
			},
			immediate: true,
		},

		currentStep(newValue, oldValue) {
			if (newValue !== oldValue) {
				/**
				 * Evento emitido quando a etapa ativa é alterada
				* @event step-change
				* @type {Event}
				*/
				this.$emit('step-change', newValue);
			}
		},
	},

	methods: {
		emptyStateText(title) {
			return `Preencha todos os campos obrigatórios da etapa anterior para
				liberar a seção de ${title.toLowerCase()}`;
		},

		handleStepBoxClick(index) {
			this.currentStep = index;
		},

		backActionClick() {
			if (this.currentStep > 0) {
				this.currentStep--;
			} else {
				/**
				* Evento que indica que a ação de cancelar foi acionada.
				* Emitido ao clicar no botão de voltar na primeira etapa.
				* @event cancel-action
				* @type {Event}
				*/
				this.$emit('cancel-action', true);
			}
		},

		nextActionClick() {
			let nextStep = this.currentStep;
			if (this.currentStep < this.steps.length - 1) {
				nextStep++;
			}
			/**
			* Evento que indica que ação de avançar foi acionada
			* @event next-action
			* @type {Event}
			*/
			this.$emit('next-action', { nextStep });
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

::v-deep .cds-wizard__empty-state-box .box__container {
	height: 100% !important;
}
::v-deep .cds-wizard__empty-state-box .spacer {
	display: flex !important;
	height: 100% !important;
}

.cds-wizard {
	&__container {
		display: flex;
		gap: spacer(3);
	}

	&__empty-state {
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
		margin: mYX(0, 10);

		&-title {
			@include subheading-3;
			color: $n-600;
			margin: mb(2);
		}

		&-subtitle {
			@include caption;
			color: $n-400;
		}

		&-image {
			width: 75px;
			height: auto;
			margin: mb(5);
		}
	}

	&__buttons {
		display: flex;
		justify-content: flex-end;
		margin: mt(5);
		gap: spacer(3);
	}

	&__title {
		@include subheading-2;
		color: $n-700;
		margin: mb(1);
	}

	&__subtitle {
		@include body-2;
		color: $n-400;
		margin: ma(0);
	}

	&__content {
		margin: mYX(6, 0);
	}
}

@media (max-width: 992px) {
	.cds-wizard {
		&__container {
			flex-direction: column;
		}
	}
}
</style>
