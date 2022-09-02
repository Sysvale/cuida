<template>
	<span
		id="cds-tabs"
		class="cds-tabs"
	>
		<div class="card cds-tabs__wrapper">
			<div
				class="tabs"
				:style="activeBorderStyle"
			>
				<div class="card-header">
					<ul class="nav nav-tabs card-header-tabs">
						<li
							v-for="(tab, index) in computedTabs"
							:key="`${index}-${tab.name}-tab`"
							role="presentation"
							class="nav-item cds-tabs__item"
						>
							<a
								role="tab"
								href="javascript:void(0)"
								target="_self"
								class="nav-link cds-tabs__link"
								:class="isActive(tab) ? 'cds-tab__active-item active' : ''"
								@click="(event) => handleClick(event, tab)"
								@contextmenu.prevent.stop="(event) => handleRightClick(event, tab)"
							>
								<div
									class="cds-tab__title"
								>
									{{ tab.title }}
								</div>
							</a>
						</li>
						<li
							role="presentation"
							class="nav-item cds-tab__action"
						>
							<a
								role="tab"
								href="javascript:void(0)"
								target="_self"
								class="nav-link"
								@click.prevent="handleAddAction"
							>
								<ion-icon
									name="add-outline"
								/>
							</a>
						</li>
					</ul>
				</div>
				<div class="tab-content cds-tab__content">
					<div
						v-for="(tab, index) in computedTabs"
						:key="`${index}-${tab.name}-tab`"
						role="tabpanel"
						class="tab-pane cds-tabs__tab-container card-body"
						:class="isActive(tab) ? 'active' : ''"
					>
						<div class="container-fluid">
							<slot
								:name="getSlotName(tab)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</span>
</template>

<script>
import { colorOptions, colorHexCode } from '../utils/constants/colors';

export default {
	props: {
		/**
		 * Define a lista dos itens do Tabs a serem mostrados.
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
		activeColor: {
			type: String,
			default: null,
			validator: (value) => {
				return colorOptions.includes(value);
			},
		},
		/**
		 * Define se o botão de adicionar deve ser exibido ou não, por padrão ele não será exibido
		 */
		showAddAction: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			internalActiveTab: this.activeTab,
			colorOptions,
		};
	},

	computed: {
		computedTabs() {
			return this.tabs;
		},

		activeBorderStyle() {
			if (!this.activeColor) {
				return {
					'--activeBorderColor': this.isLightThemed
						? '#206ED9' // $bn-500
						: '#2AC092' // $gp-400
				};
			}
			const presetColor = this.colorOptions.includes(this.activeColor);
			const borderColor = presetColor ? this.colorHexCode(this.activeColor) : this.activeColor;
			return {
				'--activeBorderColor': borderColor,
			};
		},
	},

	watch: {
		computedTabs: {
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

		handleRightClick(event, item) {
			/**
			 * Evento emitido quando uma das abas é clicada com o botão direito
			* @event right-click
			* @type {Event}
				*/
			this.$emit('right-click', { event, item });
		},

		handleClick(event, item) {
			/**
			 * Evento emitido quando muda de aba
			* @event change
			* @type {Event}
				*/
			this.$emit('change', { event, item });
			this.internalActiveTab = item;
		},

		handleAddAction(event) {
			/**
			 * Evento emitido ao clicar no botão de adicionar
			* @event add-action
			* @type {Event}
			*/
			this.$emit('add-action', event);
		},

		isActive(item) {
			return _.isEqual(this.internalActiveTab, item);
		},
	},
};
</script>

<style lang="scss">
@import '../assets/sass/app.scss';

a {
	outline: none;
}

#cds-tabs .cds-tabs {
	padding: py(2);
}

#cds-tabs .cds-tabs__tab-container {
	margin: mt(2);
	padding: pYX(6, 7);

	.container-fluid {
		padding: px(0);
	}
}

.cds-tabs__link,
.cds-tabs__item .nav-link {
	height: 60px;
	max-width: 123px;
	display: flex;
	border-radius: $border-radius-button;
	border: 1px solid $n-30 !important;
	border-top: 5px solid $n-30 !important;
	margin: mTRBL(0, 2, 2, 0);
	background-color: $n-0 !important;
	padding: pYX(4, 5);

	&.active {
		height: 74px;
		border: none !important;
		border-top: 5px solid var(--activeBorderColor) !important;
		margin: mr(2);
	}
}

.cds-tabs__wrapper {
	border: none;
	background-color: transparent;

	.card-header {
		background-color: transparent !important;
		border: none;
		padding: pa(0);
	}
	
	.card-header-tabs {
		margin: ma(0);
		max-height: 60px;
	}
}

.cds-tab__action {
	display: flex;
	align-items: center;
	height: 68px;

	.nav-link {
		display: flex;
		height: 30px;
		width: 30px;
		align-items: center;
		justify-content: center;
		color: $n-200;
		background-color: $n-0;
		border: 1px solid $n-30 !important;
		border-radius: $border-radius-extra-small;
		padding: pa(1);
	}
}

.cds-tab__title {
	@include caption;
	font-weight: $font-weight-semibold;
	color: $n-600;
	max-height: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.cds-tab__active-item {
	font-weight: bold;
	cursor: default;
	border: none !important;
}

.cds-tab__content {
	background-color: $n-0;
	border-radius: $border-radius-button;
}
</style>
