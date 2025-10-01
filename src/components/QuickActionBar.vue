<!-- eslint-disable vue/html-indent -->
<template>
	<div
		v-if="internalValue"
		class="quick_action_bar"
	>
		<div
			class="quick_action_bar__backdrop"
			@click="onBackdropClick"
			@keyup.esc="internalValue = false"
			@keyup.enter="onEnterPress"
		>
			<CdsFlexbox
				gap="3"
				class="quick_action_bar__input"
				align="center"
			>
				<CdsIcon
					height="24"
					width="24"
					name="search-outline"
					class="quick_action_bar__search-icon"
				/>

				<input
					ref="searchInput"
					v-model="searchTerm"
					type="text"
					:placeholder="placeholder"
				>

				<span
					v-if="searchTerm"
					class="quick_action_bar__clear"
					@click="clearSearchTerm"
				>
					Limpar
				</span>
			</CdsFlexbox>

			<CdsFlexbox
				id="contentResults"
				direction="column"
				class="quick_action_bar__results"
				:class="{ 'quick_action_bar__results--with-overflow-y': mustBeScrollable }"
				wrap="nowrap"
			>
				<CdsFlexbox
					v-if="whatToRender === 'renderLoading'"
					direction="column"
					gap="4"
				>
					<CdsFlexbox
						v-for="n in 5"
						:key="n"
						direction="column"
						gap="1"
						class="quick_action_bar__skeleton-card"
					>
						<CdsSkeleton
							:width="250"
							:height="20"
						/>

						<CdsSkeleton
							:width="180"
							:height="20"
						/>
					</CdsFlexbox>
				</CdsFlexbox>

				<div
					v-else-if="whatToRender === 'renderInitialState'"
					class="quick_action_bar__empty-state"
				>
					{{ initialStateText }}
				</div>

				<div
					v-else-if="whatToRender === 'renderEmptyState'"
					class="quick_action_bar__empty-state"
				>
					{{ emptyStateText }}
				</div>

				<CdsFlexbox
					v-for="recentItem in slicedRecents"
					v-else-if="whatToRender === 'renderRecents'"
					:key="recentItem"
					direction="column"
					gap="4"
					class="quick_action_bar__result-item"
					@click="onItemClick(recentItem)"
				>
					<!--
						@slot Slot usado para renderizar itens personalizados para os itens recentes. Dados do item podem ser acessados através da propriedade `recentItem`.
					-->
					<slot
						v-if="hasSlot($slots, 'recent-item')"
						name="recent-item"
						:data="recentItem"
					/>

					<CdsFlexbox
						v-else
						justify="space-between"
						align="center"
					>
						<CdsFlexbox
							align="center"
							gap="2"
						>
							<CdsIcon
								height="20"
								width="20"
								name="history-outline"
								color="#52616F"
							/>

							<span>
								{{ recentItem.title }}
							</span>
						</CdsFlexbox>

						<CdsIcon
							height="20"
							width="20"
							name="trash-outline"
							color="#52616F"
							class="quick_action_bar__remove-recent-icon"
							@click.stop="onRemoveRecentClick(recentItem)"
						/>
					</CdsFlexbox>
				</CdsFlexbox>

				<div
					v-for="(group, index) in internalGroups"
					v-else-if="whatToRender === 'renderResults'"
					:key="index"
					class="quick_action_bar__results-block"
				>
					<CdsDivider
						v-if="group.results.length > 0"
						:text="group.category"
						inline
						class="quick_action_bar__divider"
					/>

					<div
						v-for="item in sliceResultsByGroup(group.results)"
						:key="item"
						class="quick_action_bar__result-item-wrapper"
						@click="onItemClick(item)"
					>
						<!--
							@slot Slot usado para renderizar itens personalizados para os resultados da busca. Dados do item podem ser acessados através da propriedade `item`.
						-->
						<slot
							v-if="hasSlot($slots, 'result-item')"
							:data="item"
							name="result-item"
						/>

						<div
							v-else
							class="quick_action_bar__result-item"
						>
							<CdsHighlight
								:highlighted-text="searchTerm"
							>
								{{ item.title }}
							</CdsHighlight>
						</div>
					</div>

					<CdsFlexbox
						v-if="group.results.length > props.numResults"
						class="quick_action_bar__show-more"
						align="center"
						justify="start"
						gap="1"
						@click="onSeeMoreClick(group)"
					>
						<span>
							Ver todos os {{ group.results.length }} resultados em <b>{{ group.category }}</b>
						</span>
					</CdsFlexbox>
				</div>

					<!--
						@slot Slot usado para renderizar o footer da barra de busca.
					-->
					<slot
						v-if="whatToRender === 'renderResults' || whatToRender === 'renderEmptyState'"
						name="footer"
						class="quick_action_bar__footer"
					/>
			</CdsFlexbox>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import CdsIcon from './Icon.vue';
import CdsFlexbox from './Flexbox.vue';
import CdsDivider from './Divider.vue';
import CdsSkeleton from './Skeleton.vue';
import hasSlot from '../utils/methods/hasSlot';
import CdsHighlight from './Highlight.vue';

defineOptions({ name: 'CdsQuickActionBar' });

const props = defineProps({
	/**
	 *  Controla a exibição da barra de busca.
	 */
	modelValue: {
		type: Boolean,
		required: true,
		default: false,
	},
	/**
	 *  Informa ao componente se a requisição ainda está em curso ou já foi finalizada.
	 */
	loading: {
		type: Boolean,
		required: true,
		default: false,
	},
	/**
	 *  Resultados da busca a serem mostrados. Os objetos da lista devem ter, obrigatoriamente, uma chave "category" e uma lista "results".
	 * Os itens de results devem ter, obrigatoriamente, uma key chamada "title".
	 */
	groups: {
		type: Array,
		required: true,
		default: () => [],
	},
	/**
	 *  Itens de buscas recentes a serem mostrados no estado inicial do componente. Os itens devem ter, obrigatoriamente, uma key chamada "title".
	 */
	recents: {
		type: Array,
		required: false,
		default: () => [],
	},
	/**
	 *  Define a quantidade máxima de itens recentes que serão exibidos. O mínimo de itens é 1 e o máximo é 10.
	 */
	numRecents: {
		type: Number,
		required: false,
		default: 5,
		validator: (n) => n > 0 && n <= 10,
	},
	/**
	 *  Define a quantidade máxima de itens de busca que serão exibidos.
	 */
	numResults: {
		type: Number,
		required: false,
		default: 5,
		validator: (n) => n > 0,
	},
	/**
	 *  Define o texto que será exibido placeholder do componente.
	 */
	placeholder: {
		type: String,
		required: false,
		default: 'Buscar por nome, CPF ou CNS...',
	},
	/**
	 *  Define o texto que será exibido no estado inicial quando não houver itens recentes.
	 */
	initialStateText: {
		type: String,
		required: false,
		default: 'Ainda não há nada aqui. Experimente fazer uma busca!',
	},
	/**
	 *  Define o texto que será exibido quando não houver resultados.
	 */
	emptyStateText: {
		type: String,
		required: false,
		default: 'Nenhum resultado encontrado',
	},
});

const emits = defineEmits([
	/**
	 * Evento que indica se a variável de controle de exibição foi alterada.
	* @event ok
	* @type {Event}
	*/
	'update:modelValue',

	/**
	 * Evento disparado quando há uma pausa na digitação e retorna o texto da busca.
	* @event ok
	* @type {Event}
	*/
	'search',

	/**
	 * Evento que indica qual item da lista de resultados foi clicado.
	* @event ok
	* @type {Event}
	*/
	'onItemClick',

	/**
	 * Evento que indica que o botão de "Ver mais" foi clicado.
	* @event ok
	* @type {Event}
	*/
	'onSeeMoreClick',

	/**
	 * Evento que indica que a barra de busca foi fechada.
	* @event ok
	* @type {Event}
	*/
	'close',

	/**
	 * Evento que retorna o item a ser removido.
	* @event ok
	* @type {Event}
	*/
	'onRemoveRecent',

	/**
	 * Evento que indica se a tecla enter foi pressionada no campo de busca.
	* @event ok
	* @type {Event}
	*/
	'onEnterPress'
]);

const internalValue = ref(props.modelValue);
const internalGroups = ref([]);
const idTimeout = ref(null);
const isTyping = ref(false);
const searchInput = ref(null);
const searchTerm = ref('');
const currentResultHeight = ref(0);

const whatToRender = computed(() => {
	let hasResults = internalGroups.value.some(item => item.results && item.results.length > 0);
	let hasRecents = props.recents.length > 0;

	if (hasResults && !isTyping.value && !props.loading) {
		return 'renderResults';
	}
	if (isTyping.value || props.loading) {
		return 'renderLoading';
	}
	if (!isTyping.value && !hasResults && searchTerm.value.length > 0) {
		return 'renderEmptyState'
	}
	if (searchTerm.value.length === 0 && hasRecents) {
		return 'renderRecents';
	}
	if (!isTyping.value && !hasRecents && searchTerm.value.length === 0) {
		return 'renderInitialState';
	}

	return 'renderEmptyState';
});

const slicedRecents = computed(() => {
	return props.recents.slice(0, props.numRecents);
});

const mustBeScrollable = computed(() => currentResultHeight.value > 400);

watch(searchTerm, () => {
	onChangeSearchTerm();
});

watch(() => props.modelValue, (newValue) => {
	internalValue.value = newValue;

	if (newValue) {
		setTimeout(() => {
			searchInput.value?.focus();
		}, 100);
	}
});

watch(internalValue, (newValue) => {
	if (!newValue) {
		clearSearchTerm();
		emits('close');
	}

	emits('update:modelValue', newValue);
	mustDisableExternalScrolls(newValue);
});

watch(() => props.groups, (newValue) => {
	internalGroups.value = newValue.filter(item => item.results.length > 0);
	setTimeout(() => verifyResultsHeight(), 100);
});

function mustDisableExternalScrolls(value) {
	document.body.style.overflow = value ? 'hidden' : 'auto';
}

function clearSearchTerm() {
	searchTerm.value = '';
	searchInput.value?.focus();
	onChangeSearchTerm();
}

function onChangeSearchTerm() {
	clearTimeout(idTimeout.value);
	isTyping.value = true;
	internalGroups.value = [];

	if (searchTerm.value.trim().length === 0) {
		isTyping.value = false;

		return;
	}

	idTimeout.value = setTimeout(() => {
		isTyping.value = false;
		emits('search', searchTerm.value);
	}, 1000);
}

function onItemClick(item) {
	emits('onItemClick', item);
}

function onSeeMoreClick(item) {
	emits('onSeeMoreClick', item);
}

function onBackdropClick(event) {
	if (event.target === event.currentTarget) {
		internalValue.value = false;
	}
}

function onRemoveRecentClick(item) {
	emits('onRemoveRecent', item);
	searchInput.value?.focus();
}

function onEnterPress() {
	if (searchTerm.value.trim().length > 0) {
		emits('onEnterPress', searchTerm.value);
	}

	return;
}

function sliceResultsByGroup(results) {
	return results.slice(0, props.numResults);
}

function verifyResultsHeight() {
	currentResultHeight.value = document.querySelector('#contentResults')?.offsetHeight;
}

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.quick_action_bar {

	&__backdrop {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		padding-top: 80px;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.35);
		z-index: tokens.$z-index-modal;
		animation: zoom-in ease .3s;
	}

	&__search-icon {
		color: tokens.$n-400;
	}

	&__input {
		width: 50%;
		padding: tokens.pa(4);
		background-color: tokens.$n-0;
		border-radius: tokens.$border-radius-medium;
		border: 1px solid tokens.$n-30;
		background-color: tokens.$n-0;
		margin: tokens.mb(2);
		box-shadow: tokens.$shadow-md;

		input {
			font-family: 'Satoshi', sans-serif;
			@include tokens.subheading-3;
			font-weight: tokens.$font-weight-regular;
			color: tokens.$n-800;
			border: none;
			flex-grow: 1;

			&:focus {
				outline: none;
			}
		}
	}

	&__clear {
		@include tokens.overline;
		font-weight: tokens.$font-weight-semibold;
		color: tokens.$n-300;
		cursor: pointer;

		&:hover {
			color: tokens.$n-500;
		}
	}

	&__remove-recent-icon {
		display: none;
		cursor: pointer;
	}

	&__results {
		background-color: tokens.$n-0;
		border-radius: tokens.$border-radius-medium;
		border: 1px solid tokens.$n-30;
		padding: tokens.py(5);
		width: 50%;
		max-height: 75svh;
		box-shadow: tokens.$shadow-md;

		&--with-overflow-y {
			overflow-y: scroll;
		}
	}

	&__skeleton-card {
		margin: tokens.ml(5);
	}

	&__empty-state {
		@include tokens.body-2;
		font-weight: tokens.$font-weight-regular;
		font-style: italic;
		color: tokens.$n-400;
		text-align: center;
	}

	&__results-block {

		&:last-child {
			margin: tokens.mb(n(3));
		}
	}

	&__divider {
		padding: tokens.px(5);
	}

	&__result-item-wrapper {
		cursor: pointer;

		&:last-child {
			margin: tokens.mb(3);
		}
	}

	&__result-item {
		cursor: pointer;
		padding: tokens.pYX(3, 5);
		@include tokens.body-1;
		font-weight: tokens.$font-weight-regular;
		color: tokens.$n-800;

		&:hover {
			background-color: tokens.$n-20;

			.quick_action_bar__remove-recent-icon {
				display: block;
			}
		}
	}

	&__show-more {
		@include tokens.caption;
		color: tokens.$n-400;
		text-align: left;
		cursor: pointer;
		height: 40px;
		padding: tokens.pl(5);
		margin: tokens.mb(3);

		&:hover {
			background-color: tokens.$bn-50;
			color: tokens.$bn-400;
		}
	}

	&__footer {
		width: 100%;
		margin: tokens.mb(2);
	}
}

@keyframes zoom-in {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

</style>
