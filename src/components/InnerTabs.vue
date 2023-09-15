<template>
	<div
		id="inner-tabs"
	>
		<div class="inner-tabs__header-container">
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
						:class="indicatorClass(tab)"
						:style="activeBorderStyle"
					/>
				</li>
			</ul>
		</div>

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
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';

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
					return isEmpty(value.title) || isEmpty(value.name);
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
			return isEqual(this.internalActiveTab, item);
		},

		indicatorClass(item) {
			return this.isActive(item) ? `tab__indicator--active--${this.variant}` : '';
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/tokens.scss';

#inner-tabs {
	.inner-tabs {
		&__header {
			display: flex;
			justify-content: flex-start;
			gap: spacer(4);
			padding: pl(0);
			margin: mb(0);
			list-style: none;
			transition: $opening;

			&-container {
				overflow-x: scroll;
				margin-bottom: -1px;

				/* width */
				&::-webkit-scrollbar {
					height: 5px;
					border-radius: 8px;
				}

				/* Track */
				&::-webkit-scrollbar-track {
					background: transparent;
				}

				/* Handle */
				&::-webkit-scrollbar-thumb {
					background: $n-40;
					border-radius: 8px;
				}

				/* Handle on hover */
				&::-webkit-scrollbar-thumb:hover {
					background: $n-50;
				}
			}
		}

		&__tab {
			width: max-content;
			min-width: 140px;
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
			cursor: pointer;

			&--active {
				cursor: default;
				color: $n-800;
				font-weight: $font-weight-semibold;
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

		&__content {
			background-color: $n-0;
			padding: pa(5);
			border-bottom-right-radius: 8px;
			border-bottom-left-radius: 8px;
		
			> .content__pane--inactive {
				display: none;
			}
		
			> .content__pane--active {
				display: block;
			}
		}
	}

	.tab__indicator--active {
		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			height: 4px;
			width: 100%;
			border-top-right-radius: 4px;
			border-top-left-radius: 4px;
			background-color: $base-color;
			transition: all 0.3s ease-out;
		}
	}
}
</style>
