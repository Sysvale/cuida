<template>
	<div
		:class="resolveComputedClass('dashboard-card')"
	>
		<div>
			<div
				class="dashboard-card__header"
			>
				<p class="dashboard-card__title">
					<!-- @slot Slot para renderização customizada do título. -->
					<slot name="title-slot">
						{{ title }}
					</slot>
				</p>

				<div>
					<!-- @slot Slot para renderização customizada de conteúdo localizado na parte direita do header. -->
					<slot name="status-slot" />
				</div>
			</div>
	
			<p :class="resolveComputedClass('dashboard-card__description')">
				<!-- @slot Slot para renderização customizada da descrição. -->
				<slot name="description-slot">
					{{ description }}
				</slot>
			</p>
		</div>

		<!--
			Evento emitido quando o botão de ação é clicado.
			@event action-button-click
			@type {Event}
		-->
		<div 
			class="dashboard-card__action"
			@click="$emit('action-button-click')"
		>
			<!-- @slot Slot para renderização customizada do conteúdo das actions. Sobrescreve a prop `showAction`.
			-->
			<slot name="action-slot">
				<div v-if="showAction">
					{{ action }}
				</div>
			</slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * O título do alert. O título também pode ser usado com o slot.
		 */
		title: {
			type: String,
			default: '',
			required: false,
		},
		/**
		 * Texto que será exibido abaixo do título. Utilizado para melhor
		 * descrever a informação exibida no dashboard-card.
		 */
		description: {
			type: String,
			default: '',
			required: false,
		},
		/**
		 * Prop que exibe o botão de ação do dashboard-card.
		 */
		showAction: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Prop que indica o texto do botão de ação do dashboard-card.
		 */
		action: {
			type: String,
			default: 'Action',
			required: false,
		},
		/**
		 * Prop que indica se o componente deverá ocupar 100% do espaço disponível.
		 */
		fluid: {
			type: Boolean,
			default: false,
		},
	},

	methods: {
		resolveComputedClass(componentClass) {
			return this.fluid ? `${componentClass}--fluid` : componentClass;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.dashboard-card {
	background-color: $n-0;
	border: 1px solid $n-40;
	border-radius: $border-radius-small;
	padding: pa(4);
	width: fit-content;
	min-width: 272px;
	min-height: 120px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&--fluid {
		@extend .dashboard-card;
		width: 100%;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__title {
		font-weight: 700;
		color: $n-700;
		font-size: 24px;
		line-height: 28px;
		letter-spacing: 0.15px;
		margin: mb(1);
	}

	&__description {
		font-weight: 400;
		color: $n-600;
		font-size: 12px;
		line-height: 17px;
		letter-spacing: 0.4px;
		max-width: 224px;
		margin: mb(0);
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

		&--fluid {
			@extend .dashboard-card__description;
			max-width: 80%;
		}
	}

	&__action {
		color: $n-800;
		font-weight: 700;
		font-size: 12px;
		line-height: 17px;
		text-transform: uppercase;
		align-self: flex-end;
		cursor: pointer;
	}
}
</style>
