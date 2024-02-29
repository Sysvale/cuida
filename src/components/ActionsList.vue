<template>
	<span class="action-list">
		<div
			class="action-list--right"
		>
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
						:class="{
							'action-list__item': i === 0, 
							'action-list__item--left-bordered': i !== 0,
							'action-list__item--disabled': action.disabled,
						}"
						@click.stop="handleClick(action)"
					>
						<!-- @slot Scoped slot para renderização customizada das 'actions'.
							A propriedade 'list', que pode ser acessada através do slot,
							representa o array de actions a ser exibido.
						-->
						<slot
							name="action"
							:list="action"
						/>
					</div>
				</transition>
			</div>
			
			<div
				v-if="actions.length > numberOfExpandedActions"
				class="action-list__item--left-bordered"
				@click.stop="toggleCollapseState"
			>
				<!-- @slot Slot para renderização customizada do conteúdo do item
					de expandir/colapsar a lista
				-->
				<slot name="action-trigger">
					{{ itsBeingShown ? 'Menos ações' : 'Mais ações' }}
				</slot>
			</div>
		</div>
	</span>
</template>

<script>
import cloneDeep from 'lodash.clonedeep';

export default {
	props: {
		/**
		* A lista de actions a ser renderizada. Caso queira que um item da lista fique desabilitado, basta passar a prop `disabled` como true nesse item no array.
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
	},

	data() {
		return {
			action: cloneDeep(this.actions),
			internalNumberOfExpandedActions: this.numberOfExpandedActions,
			itsBeingShown: false,
		};
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

		handleClick(action) {
			if(!action.disabled) {
				/**
				* Evento emitido quando o item da lista é clicado.
				* @event action-clicked
				* @type {Event}
				*/
				this.$emit('action-clicked', action);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.action-list {
	&--right {
		color: $n-500;
		display: flex;
		font-weight: 600;
		justify-content: flex-end;
	}

	&--left {
		justify-content: flex-start;
		@extend .action-list--right;
	}

	&__item {
		border-radius: 1px;
		cursor: pointer;
		padding: 24px;
		
		&:hover {
			background-color: $n-10;
		}

		&--disabled {
			@extend .action-list__item;
			color: $n-200;
			cursor: not-allowed;

			&:hover {
				background-color: unset;
			}
		}

		&--right-bordered {
			border-right: 1px solid $n-40;
			@extend .action-list__item;
		}

		&--left-bordered {
			border-left: 1px solid $n-40;
			@extend .action-list__item;
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
		opacity: 0;
		transform: translateX(10px);
	}
}
</style>
