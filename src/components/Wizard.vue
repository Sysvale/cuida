<template>
	<div class="cds-wizard">
		<div class="cds-wizard__container">
			<cds-box
				v-for="(step, index) in steps"
				:key="`wizard-step-${index}`"
				fluid
				:padding="5"
				:elevated="currentStep === index"
				:class="{ 'cds-wizard__empty-state-box': currentStep < index }"
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
			/>
			<cds-button
				:text="nextButtonText"
				:variant="nextButtonVariant"
				@button-click="nextActionClick"
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
		 * Um array com objetos com as propriedades 'title' (obrigatório), 'subtitle', 'image',
		 * 'inProcessing', 'error' e 'completed'. O 'title' e 'subtitle' são textos que descrevem
		 * a etapa, a 'imagem' é o caminho para a imagem do empty-state; e as demais props são
		 * Boolean e representam o status da etapa.
		 */
		steps: {
			type: Array,
			default: () => ([]),
			required: true,
			validator: (value) => {
				return value.length >= 2 && value.length <= 3;
			},
		},
		nextButtonText: {
			type: String,
			default: 'Próximo',
		},
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
	},

	data() {
		return {
			currentStep: 0,
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

	methods: {
		emptyStateText(title) {
			return `Preencha todos os campos obrigatórios da etapa anterior para
				liberar a seção de ${title.toLowerCase()}`;
		},

		backActionClick() {
			if (this.currentStep > 0) {
				this.currentStep--;
			} else {
				this.$emit('cancel-action', true);
			}
		},

		nextActionClick() {
			if (this.currentStep < this.steps.length - 1) {
				this.currentStep++;
			}

			this.$emit('next-action', true);
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
		margin: mYX(0, 10);

		&-title {
			@include subheading-3;
			color: $n-600;
		}

		&-subtitle {
			@include caption;
			color: $n-400;
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
</style>
