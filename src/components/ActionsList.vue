<template>
	<span class="action-list">
		<div
			:class="left ? 'action-list--left' : 'action-list--right'"
		>
			<div v-if="left">
				<div
					v-if="actions.length > numberOfExpandedActions"
					class="action-list__item--right-bordered"
					@click.stop="toggleCollapseState"
				>
					<!-- @slot Slot para renderização customizada do conteúdo do item
						de expandir/colapsar a lista
					-->
					<slot
						v-if="hasActionTrigger"
						name="action-trigger"
					/>

					<span
						v-else
					>
						{{ itsBeingShown ? 'Menos ações' : 'Mais ações'}}
					</span>
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
						v-if="i <= internalNumberOfExpandedActions - 1"
						:class="i === 0 ? 'action-list__item' : 'action-list__item--left-bordered'"
						@click.stop="$emit('action-clicked', action)"
					>
						<!-- @slot Scoped slot para renderização customizada das 'actions'.
							A propriedade 'list', que pode ser acessada através do slot,
							representa o array de actions a ser exibido.
						-->
						<slot name="action" :list="action" />
					</div>
				</transition>
			</div>
			<div v-if="!left">
				<div
					v-if="actions.length > numberOfExpandedActions"
					class="action-list__item--left-bordered"
					@click.stop="toggleCollapseState"
				>
					<slot
						v-if="hasActionTrigger"
						name="action-trigger"
					/>

					<span
						v-else
					>
						{{ itsBeingShown ? 'Menos ações' : 'Mais ações'}}
					</span>
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
		 * Faz com que o componente seja renderizado do lado esquerdo.
		 */
		left: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			action: _.cloneDeep(this.actions),
			internalNumberOfExpandedActions: this.numberOfExpandedActions,
			itsBeingShown: false,
		};
	},

	computed: {
		hasActionTrigger() {
			return Object.keys(this.$slots).some(slot => slot === 'action-trigger');
		},
	},

	methods: {
		toggleCollapseState() {
			this.internalNumberOfExpandedActions = this.itsBeingShown
				? this.numberOfExpandedActions : this.action.length;
			this.itsBeingShown = !this.itsBeingShown;
			/**
			* Evento emitido quando a lista é expandida ('true') ou contraída ('false').
			* @event expanded
			* @type {Event}
			*/
			this.$emit('expanded', this.itsBeingShown);
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.action-list {
	&--right {
		color: $n-500;
		font-weight: 600;
		display: flex;
		justify-content: flex-end;
	}

	&--left {
		@extend .action-list--right;
		justify-content: flex-start;
	}

	&__item {
		padding: 24px;
		cursor: pointer;
		border-radius: 1px;

		&:hover {
			background-color: $n-10;
		}

		&--right-bordered {
			@extend .action-list__item;
			border-right: 1px solid $n-40;
		}

		&--left-bordered {
			@extend .action-list__item;
			border-left: 1px solid $n-40;
		}
	}

	&__slide-fade-enter-active {
		transition: all .3s ease;
	}

	&__slide-fade-leave-active {
		transition: all .1s ease;
	}

	&__slide-fade-enter,
	&__slide-fade-leave-to {
		transform: translateX(10px);
		opacity: 0;
	}
}
</style>
