<template>
	<div
		id="inner-tabs"
	>
		<ul class="inner-tabs__header">
			<li
				v-for="(tab, index) in tabs"
				:key="`${index}-${tab.name}-tab`"
				role="presentation"
			>
				<a
					role="tab"
					href="javascript:void(0)"
					target="_self"
					class="inner-tabs__tab"
					:class="isActive(tab) ? 'inner-tabs__tab--active' : 'inner-tabs__tab--inactive'"
					@click="(event) => handleClick(event, tab)"
				>
					{{ tab.title }}
				</a>

				<div
					:class="isActive(tab) ? 'tab__indicator--active' : ''"
					:style="activeBorderStyle"
				/>
			</li>
		</ul>
		
		<hr class="inner-tabs__divider"/>

		<div class="inner-tabs__content">
			<div
				v-for="(tab, index) in tabs"
				:key="`${index}-${tab.name}-tab`"
				role="tabpanel"
				class="content__pane"
				:class="isActive(tab) ? 'content__pane--active' : 'content__pane--inactive'"
			>
				<!-- @slot Slot para renderização customizada do conteúdo das abas
					os slots são nomeados de acordo com os `name` das tabs, cada slot
					nomeado é exibido de acordo com a aba ativa correspondente
				-->
				<slot
					:name="getSlotName(tab)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { colorOptions, colorHexCode } from '../utils/constants/colors';

export default {
	props: {
		/**
		 * Define a lista dos itens da InnerTabs a serem mostrados.
		 * Os itens da lista devem ser objetos com `name` (para identificar o slot)
		 * e `title` (título da aba)
		 */
		tabs: {
			type: Array,
			default: () => ([]),
			required: true,
			validator: (values) => {
				const invalidValues = values.filter((value) => {
					return _.isEmpty(value.title) || _.isEmpty(value.name);
				});
				return !invalidValues.length;
			},
		},
		/**
		 * O item ativo dentre as abas
		 */
		activeTab: {
			type: Object,
			default: () => ({}),
			required: true,
		},
		/**
		 * Cor da borda que indica o item ativo.
		 * Existem algumas cores predefinidas seguindo os guias do Cuida, são elas: 
		 * `turquoise`, `green`, `blue`, `violet`, `pink`, `red`, `orange`, `amber` e `gray`.
		 */
		variant: {
			type: String,
			default: 'green',
			validator: (value) => {
				return colorOptions.includes(value);
			},
		},
	},

	data() {
		return {
			internalActiveTab: this.activeTab,
			colorOptions,
		};
	},

	computed: {
		activeBorderStyle() {
			return {
				'--indicatorColor': this.colorHexCode(this.variant),
			};
		},
	},

	watch: {
		tabs: {
			handler(newValue) {
				const filtered = newValue.filter(tab => tab.name === this.activeTab.name);
				[this.internalActiveTab] = filtered.length ? filtered : newValue;
			},
			immediate: true,
		},
	},

	methods: {
		colorHexCode,

		getSlotName(tab) {
			return tab.name;
		},

		handleClick(event, item) {
			/**
			 * Evento emitido quando a aba ativa é alterada
			* @event change
			* @type {Event}
				*/
			this.$emit('change', { event, item });
			this.internalActiveTab = item;
		},

		isActive(item) {
			return _.isEqual(this.internalActiveTab, item);
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

#inner-tabs {
	.inner-tabs {
		&__header {
			display: grid;
			grid-template-columns: repeat(6, minmax(140px, 176px));
			justify-content: space-between;
			flex-wrap: wrap;
			padding: pl(0);
			margin: mb(0);
			list-style: none;
		}

		&__tab {
			width: 100%;
			@include caption;
			font-weight: $font-weight-regular;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			text-align: center;
			text-decoration: none !important;
			margin: mTRBL(0, 2, 2, 0);
			padding: pYX(2, 5);


			&--active {
				cursor: default;
				color: $n-800;
				font-weight: $font-weight-medium;
			}
			
			&--active:hover {
				color: $n-800;
			}
			
			&--inactive {
				color: $n-500;
				font-weight: $font-weight-regular;
			}
			
			&--inactive:hover {
				color: $n-500;
			}
		}

		&__divider {
			background-color: $n-20;
			margin: ma(0);
		}

		&__content {
			background-color: $n-0;
			padding: pa(5);
			border-radius: $border-radius-button;
		
			> .content__pane--inactive {
				display: none;
			}
		
			> .content__pane--active {
				display: block;
			}
		}
	}

	.tab__indicator--active {
		height: 4px;
		width: 100%;
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
		background-color: var(--indicatorColor);
		transition: all 0.3s ease-out;
	}
}
</style>
