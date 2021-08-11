<template>
	<span
		id="actionList"
	>
		<div
			:class="position === 'right' ? 'action-list--right' : 'action-list--left'"
		>
			<div
				v-if="position === 'left'"
			>
				<div
					v-if="!itsBeignShown && actions.length > numberOfExpandedActions"
					class="action-list__item--right-bordered"
					@click="expandList"
				>
					{{ collapsedActionName }}
				</div>
				<div
					v-if="actions.length > numberOfExpandedActions && itsBeignShown"
					class="action-list__item--right-bordered"
					@click="collapseList"
				>
					{{ expandedActionName }}
				</div>
			</div>
			<div
				v-for="(action, i) in actions"
				:key="action.title"
			>
				<transition name="action-list__slide-fade">
					<!--
						Evento emitido quando uma das ações é clicada.
						O dado associado à ação vai ser enviada ao componente pai.
						@event action-clicked
						@type {Event}
					-->
					<div
						v-if="i <= internalnumberOfExpandedActions - 1"
						:class="i === 0 ? 'action-list__item' : 'action-list__item--left-bordered'"
						@click="$emit('action-clicked', action)"
					>
						<!-- @slot Scoped slot para renderização customizada das 'actions'.
							A proprieade 'list', que pode ser acessada através do slot,
							representa o array de actions a ser exibido.
						-->
						<slot name="action" :list="action" />
					</div>
				</transition>
			</div>
			<div
				v-if="position === 'right'"
			>
				<div
					v-if="!itsBeignShown && actions.length > numberOfExpandedActions"
					class="action-list__item--left-bordered"
					@click="expandList"
				>
					{{ collapsedActionName }}
				</div>
				<div
					v-if="actions.length > numberOfExpandedActions && itsBeignShown"
					class="action-list__item--left-bordered"
					@click="collapseList"
				>
					{{ expandedActionName }}
				</div>
			</div>
		</div>
	</span>
</template>

<script>
export default {
	props: {
		/**
		* A lista de actions a ser renderizada.
		*/
		actions: {
			type: Array,
			default: () => [],
			required: true,
		},
		/**
		 * O número de itens que vai ser mostrado quando o componente for renderizado.
		 */
		numberOfExpandedActions: {
			type: Number,
			default: 2,
			required: false,
		},
		/**
		 * O nome que vai ser mostrado no último item da lista de actions quando ela estiver colapsada.
		 */
		collapsedActionName: {
			type: String,
			default: 'Mais ações',
			required: false,
		},
		/**
		 * O nome que vai ser mostrado no último item da lista de actions quando ela estiver expandida.
		 */
		expandedActionName: {
			type: String,
			default: 'Menos ações',
			description: `The name that will be displayed in the last item of the actions list when it's expanded.`,
			required: false,
		},
		/**
		 * Especifica se o componente vai ser renderizado do lado direito ou do lado esquerdo.
		 */
		position: {
			type: String,
			default: 'right',
			description: `Speficies if the component will be rendered right side or left side.`,
			required: false,
		},
	},
	data() {
		return {
			action: _.cloneDeep(this.actions),
			internalnumberOfExpandedActions: this.numberOfExpandedActions,
			itsBeignShown: false,
		};
	},

	methods: {
		expandList() {
			this.internalnumberOfExpandedActions = this.action.length;
			this.itsBeignShown = !this.itsBeignShown;
		},

		collapseList() {
			this.internalnumberOfExpandedActions = this.numberOfExpandedActions;
			this.itsBeignShown = !this.itsBeignShown;
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

#actionList .action-list {
	color: $cinza-6;
	font-weight: 600;
	display: flex;

	&--right {
		@extend .action-list;
		justify-content: flex-end;
	}

	&--left {
		@extend .action-list;
		justify-content: flex-start;
	}
}

#actionList .action-list__item {
	padding: pa(6);
	cursor: pointer;
	border-radius: 1px;

	&:hover {
		background-color: $cinza-2;
	}

	&--right-bordered {
		@extend .action-list__item;
		border-right: 1px solid $cinza-4;
	}

	&--left-bordered {
		@extend .action-list__item;
		border-left: 1px solid $cinza-4;
	}
}

#actionList .action-list__slide-fade-enter-active {
	transition: all .3s ease;
}

#actionList .action-list__slide-fade-leave-active {
	transition: all .1s ease;
}

#actionList .action-list__slide-fade-enter, .action-list__slide-fade-leave-to {
	transform: translateX(10px);
	opacity: 0;
}
</style>
