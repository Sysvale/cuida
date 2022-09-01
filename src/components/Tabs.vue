<template>
	<span
		id="cds-tabs"
		class="cds-tabs"
	>
		<b-card
			no-body
			class="cds-tabs__wrapper"
		>
			<b-tabs
				:style="activeBorderStyle"
				active-nav-item-class="cds-tab__active-item"
				content-class="cds-tab__content"
				card
			>
				<b-tab
					v-for="(tab, index) in computedTabs"
					:key="`${index}-${tab.name}-tab`"
					:active="isActive(tab)"
					class="cds-tabs__tab-container"
					title-item-class="cds-tabs__item"
					title-link-class="cds-tabs__link"
				>
					<template #title>
						<div
							class="cds-tab__title"
							@contextmenu.prevent.stop="(event) => handleRightClick(event, tab)"
						>
							{{ tab.title }}
						</div>
					</template>
					<b-container fluid>
						<slot
							:name="getSlotName(tab)"
						/>
					</b-container>
				</b-tab>
				<!-- <template #tabs-start>
					<b-nav-item
						v-for="(tab, index) in computedTabs"
						:key="`${index}-${tab.name}-tab`"
						role="presentation"
						class="cds-tabs__item"
						href="#"
					>
						<div
							class="cds-tab__title"
						>
							{{ tab.title }}
						</div>
					</b-nav-item>
				</template> -->
				<template #tabs-end>
					<b-nav-item
						v-if="showAddAction"
						role="presentation"
						class="cds-tab__action"
						href="#"
						@click.prevent="(e) => $emit('add-action', e)"
					>
						<ion-icon
							name="add-outline"
						/>
					</b-nav-item>
				</template>
			</b-tabs>
		</b-card>
	</span>
</template>

<script>
import { colorOptions, colorHexCode } from '../utils/constants/colors';

// @contextmenu.prevent.stop="(event) => handleRightClick(event, tab)"

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
				const filtered = newValue.filter(tab => _.isEqual(tab, this.activeTab));

				if (filtered.length) {
					[this.internalActiveTab] = filtered;
				}
			},
			immediate: true,
		},
	},

	// mounted() {
	// 	document.addEventListener('contextmenu', (e) => {
	// 		e.preventDefault();
	// 	});

	// 	const contextMenu = this.$el.querySelectorAll('.nav-item');
	// 	// const refFirstTab = this.$refs['1-room-42-tab'];
	// 	// console.log(refFirstTab);
	// 	// let contextMenu = refFirstTab.querySelectorAll('a');
	// 	console.log(contextMenu);
	// 	// contextMenu.addEventListener('contextmenu', (e) => {
	// 	// 	console.log('right', e);
	// 	// 	e.preventDefault();
	// 	// 	contextMenu.textContent = 'GeeksForGeeks';
	// 	// });
	// },

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
	padding: 8px 0;
}

#cds-tabs .cds-tabs__tab-container {
	margin: mt(2);
	padding: pYX(6, 7);

	.active {
		color: $n-800 !important;
		border-bottom: 4px solid var(--activeBorderColor);
		background: $n-20;
		border-radius: 4px  4px 0px 0px;
	}

	.container-fluid {
		padding: px(0);
	}
}

.cds-tabs__link,
.cds-tabs__item .nav-link {
	height: 60px;
	max-width: 123px;
	display: flex;
	border-radius: 4px;
	border: 1px solid $n-30 !important;
	border-top: 5px solid $n-30 !important;
	margin-bottom: 8px !important;
	margin-right: 8px;
	background-color: $n-0 !important;
	padding: pYX(4, 5);

	&.active {
		height: 74px;
		border: none !important;
		border-top: 5px solid var(--activeBorderColor) !important;
		margin-bottom: 0 !important;
	}
}

.cds-tabs__wrapper {
	border: none;
	background-color: transparent;

	.card-header {
		background-color: transparent !important;
		border: none;
		padding: 0;
	}
	
	.card-header-tabs {
		margin: 0;
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
		border-radius: 8px;
		padding: pa(1);
	}
}

.cds-tabs__item {
	// 
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
	padding-bottom: 8px;
}

.cds-tab__content {
	background-color: $n-0;
	border-radius: 4px;
}
</style>
