<template>
	<div
		class="card"
	>
		<p 
			v-if="title.length > 0"
			class="card__title"
		>
			{{ title }}
		</p>
		<p v-else>
			<slot name="title" />
		</p>
		<p 
			v-if="description.length > 0"
			class="card__description"
		>
			{{ description }}
		</p>
		<p v-else>
			<slot name="description" />
		</p>
		<p 
			v-if="showAction"
			class="card__action"
			@click="$emit('card-action')"
		>
			{{ action }}
		</p>
		<p v-else>
			<slot name="action" />
		</p>
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
			default: 'Titulo do Card',
			required: false,
		},
		/**
		 * Texto que será exibido abaixo do título. Utilizado para melhor
		 * descrever a informação exibida no card.
		 */
		description: {
			type: String,
			default: 'Descrição do card',
			required: false,
		},
		/**
		 * Prop que exibe o botão de ação do card.
		 */
		showAction: {
			type: Boolean,
			default: true,
			required: false,
		},
		/**
		 * Prop que indica o texto do botão de ação do card.
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

.card {
	background-color: $n-0;
	border: 1px solid $n-40;
	border-radius: $border-radius-small;
	padding: pa(4);
	width: fit-content;
	display: flex;
	flex-direction: column;

	&__title {
		font-weight: 700;
		color: $n-700;
		font-size: 24px;
		line-height: 28px;
		letter-spacing: 0.15px;
	}

	&__description {
		font-weight: 400;
		color: $n-600;
		font-size: 12px;
		line-height: 17px;
		letter-spacing: 0.4px;
	}

	&__action {
		color: $n-800;
		font-weight: 700;
		font-size: 12px;
		line-height: 17px;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		align-self: flex-end;
	}
}

</style>
