<template>
	<div
		class="cds-card"
	>
		<div>
			<p 
				v-if="title.length > 0"
				class="cds-card__title"
			>
				{{ title }}
			</p>
			<p
				v-else
				class="cds-card__title"
			> 
				<slot name="title-slot" />
			</p>
	
			<p 
				v-if="description.length > 0"
				class="cds-card__description"
			>
				{{ description }}
			</p>
			<p
				v-else
				class="cds-card__description"
			>
				<slot name="description-slot" />
			</p>
		</div>

		<div 
			v-if="showAction"
			class="cds-card__action"
			@click="$emit('action-button-click')"
		>
			{{ action }}
		</div>
		<p v-else> <slot name="slot-action" /> </p>
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
		 * descrever a informação exibida no cds-card.
		 */
		description: {
			type: String,
			default: '',
			required: false,
		},
		/**
		 * Prop que exibe o botão de ação do cds-card.
		 */
		showAction: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		 * Prop que indica o texto do botão de ação do cds-card.
		 */
		action: {
			type: String,
			default: 'Action',
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.cds-card {
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
