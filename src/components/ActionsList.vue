<template>
	<span
		id="actionList"
	>
		<div
			class="d-flex actionStyle"
			:class="position === 'right' ? 'justify-content-end' : 'justify-content-start'"
		>
			<div
				v-if="position === 'left'"
			>
				<div
					v-if="!itsBeignShown && actions.length > numberOfExpandedActions"
					class="actionRightBorder action p-4"
					@click="expandList"
				>
					{{ collapsedActionName }}
				</div>
				<div
					v-if="actions.length > numberOfExpandedActions && itsBeignShown"
					class="actionRightBorder action p-4"
					@click="collapseList"
				>
					{{ expandedActionName }}
				</div>
			</div>
			<div
				v-for="(action, i) in actions"
				:key="action.title"
			>
				<transition name="slide-fade">
					<!--
						Evento emitido quando uma das ações é clicada.
						O dado associado à ação vai ser enviada ao componente pai.
						@event action-clicked
						@type {Event}
					-->
					<div
						v-if="i <= internalnumberOfExpandedActions - 1"
						class="action p-4"
						:class="{ actionLeftBorder: i > 0 }"
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
					class="actionLeftBorder action p-4"
					@click="expandList"
				>
					{{ collapsedActionName }}
				</div>
				<div
					v-if="actions.length > numberOfExpandedActions && itsBeignShown"
					class="actionLeftBorder action p-4"
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
}
</script>
<style>
#actionList .actionLeftBorder {
	border-left: 1px solid #CED4DA;
}

#actionList .actionRightBorder {
	border-right: 1px solid #CED4DA;
}

#actionList .action {
	padding: 4px;
	cursor: pointer;
	border-radius: 1px;
}

#actionList .actionStyle {
	color: #6A7580;
	font-weight: 600;
}

#actionList .action:hover {
	background-color: #F8FAFD;
}

#actionList .slide-fade-enter-active {
	transition: all .3s ease;
}

#actionList .slide-fade-leave-active {
	transition: all .1s ease;
}

#actionList .slide-fade-enter, .slide-fade-leave-to {
	transform: translateX(10px);
	opacity: 0;
}
</style>
