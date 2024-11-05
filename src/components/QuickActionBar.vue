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
			<cds-flexbox
				gap="3"
				class="quick_action_bar__input"
				align="center"
			>
				<cds-icon
					height="24"
					width="24"
					name="search-outline"
					class="quick_action_bar__search-icon"
				/>

				<input
					ref="searchInput"
					v-model="searchTerm"
					type="text"
					placeholder="Buscar por nome, CPF ou CNS..."
				>

				<span
					v-if="searchTerm"
					class="quick_action_bar__clear"
					@click="clearSearchTerm"
				>
					Limpar
				</span>
			</cds-flexbox>

			<cds-flexbox
				direction="column"
				class="quick_action_bar__results"
				wrap="nowrap"
			>
				<cds-flexbox
					v-if="whatToRender === 'renderLoading'"
					direction="column"
					gap="4"
				>
					<cds-flexbox
						v-for="n in 5"
						:key="n"
						direction="column"
						gap="1"
						class="quick_action_bar__skeleton-card"
					>
						<cds-skeleton
							:width="250"
							:height="20"
						/>

						<cds-skeleton
							:width="180"
							:height="20"
						/>
					</cds-flexbox>
				</cds-flexbox>

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

				<cds-flexbox
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

					<cds-flexbox
						v-else
						justify="space-between"
						align="center"
					>
						<cds-flexbox
							align="center"
							gap="2"
						>
							<cds-icon
								height="20"
								width="20"
								name="history-outline"
								color="#52616F"
							/>

							<span>
								{{ recentItem.title }}
							</span>
						</cds-flexbox>

						<cds-icon
							height="20"
							width="20"
							name="trash-outline"
							color="#52616F"
							class="quick_action_bar__remove-recent-icon"
							@click.stop="onRemoveRecentClick(recentItem)"
						/>
					</cds-flexbox>
				</cds-flexbox>

				<div
					v-for="(group, index) in groups"
					v-else-if="whatToRender === 'renderResults'"
					:key="index"
					class="quick_action_bar__results-block"
				>
					<cds-divider
						v-if="group.results.length > 0"
						:text="group.category"
						inline
						class="quick_action_bar__divider"
					/>

					<div
						v-for="item in slicedResults(index)"
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
							{{ item.title }}
						</div>
					</div>

					<cds-flexbox
						v-if="group.results.length > 5"
						class="quick_action_bar__show-more"
						align="center"
						justify="start"
						gap="1"
						@click="onSeeMoreClick(group)"
					>
						<span>
							Ver todos os {{ group.results.length }} resultados em <b>{{ group.category }}</b>
						</span>

						<cds-icon
							height="16"
							width="16"
							name="arrow-right-outline"
							color="#52616F"
							class="quick_action_bar__search-icon"
						/>
					</cds-flexbox>
				</div>
			</cds-flexbox>
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
	 *  Define a quantidade máxima de itens recentes vão ser exibidos. O mínimo de itens é 1 e o máximo é 10.
	 */
	numRecents: {
		type: Number,
		required: false,
		default: 5,
		validator: (n) => n > 0 && n <= 10,
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
const idTimeout = ref(null);
const isTyping = ref(false);
const searchInput = ref(null);
const searchTerm = ref('');

const whatToRender = computed(() => {
	let hasResults = props.groups.some(item => item.results && item.results.length > 0);
	let hasRecents = props.recents.length > 0;

	if (hasResults && !isTyping.value) {
		return 'renderResults';
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
	if (isTyping.value || props.loading) {
		return 'renderLoading';
	}

	return 'renderEmptyState';
});

const slicedResults = computed(() => {
	return (index) => props.groups[index].results.slice(0, 5);
});

const slicedRecents = computed(() => {
	return props.recents.slice(0, props.numRecents);
});

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

	if (searchTerm.value.length === 0) {
		isTyping.value = false;
		emits('search', searchTerm.value);

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
	if (searchTerm.value.length > 0) {
		emits('onEnterPress', searchTerm.value);
	}

	return;
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

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
		z-index: $z-index-modal;
		animation: zoom-in ease .3s;
	}

	&__search-icon {
		color: $n-400;
	}

	&__input {
		width: 50%;
		padding: pa(4);
		background-color: $n-0;
		border-radius: $border-radius-medium;
		border: 1px solid $n-30;
		background-color: $n-0;
		margin: mb(2);
		box-shadow: $shadow-md;

		input {
			font-family: 'Satoshi', sans-serif;
			@include subheading-3;
			font-weight: $font-weight-regular;
			color: $n-800;
			border: none;
			flex-grow: 1;

			&:focus {
				outline: none;
			}
		}
	}

	&__clear {
		@include overline;
		font-weight: $font-weight-semibold;
		color: $n-300;
		cursor: pointer;

		&:hover {
			color: $n-500;
		}
	}

	&__remove-recent-icon {
		display: none;
		cursor: pointer;
	}

	&__results {
		background-color: $n-0;
		border-radius: $border-radius-medium;
		border: 1px solid $n-30;
		padding: py(5);
		width: 50%;
		max-height: 75svh;
		box-shadow: $shadow-md;
		overflow-y: scroll;
	}

	&__skeleton-card {
		margin: ml(5);
	}

	&__empty-state {
		@include body-2;
		font-weight: $font-weight-regular;
		font-style: italic;
		color: $n-400;
		text-align: center;
	}

	&__results-block {

		&:last-child {
			margin: mb(n(3));
		}
	}

	&__divider {
		padding: px(5);
	}

	&__result-item-wrapper {
		cursor: pointer;

		&:last-child {
			margin: mb(3);
		}
	}

	&__result-item {
		cursor: pointer;
		padding: pYX(3, 5);
		@include body-1;
		font-weight: $font-weight-regular;
		color: $n-800;

		&:hover {
			background-color: $n-20;

			.quick_action_bar__remove-recent-icon {
				display: block;
			}
		}
	}

	&__show-more {
		@include caption;
		color: $n-400;
		text-align: left;
		cursor: pointer;
		height: 40px;
		padding: pl(5);
		margin: mb(3);

		&:hover {
			background-color: $bn-50;
			color: $bn-400;
		}
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
