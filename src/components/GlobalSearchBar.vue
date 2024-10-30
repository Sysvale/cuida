<!-- eslint-disable vue/html-indent -->
<template>
	<div
		v-if="internalValue"
		class="global-search-bar"
	>
		<div
			class="global-search-bar__backdrop"
			@click="onBackdropClick"
			@keyup.esc="internalValue = false"
		>
			<cds-flexbox
				gap="3"
				class="global-search-bar__input"
				align="center"
			>
				<cds-icon
					height="24"
					width="24"
					name="search-outline"
					class="global-search-bar__search-icon"
				/>

				<input
					ref="searchInput"
					v-model="searchTerm"
					type="text"
					placeholder="Buscar por nome, CPF ou CNS..."
				>

				<span
					v-if="searchTerm"
					class="global-search-bar__clear"
					@click="clearSearchTerm"
				>
					Limpar
				</span>
			</cds-flexbox>

			<cds-flexbox
				direction="column"
				class="global-search-bar__results"
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
						class="global-search-bar__skeleton-card"
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
					class="global-search-bar__empty-state"
				>
					Ainda não há nada aqui. Experimente fazer uma busca!
				</div>

				<div
					v-else-if="whatToRender === 'renderEmptyState'"
					class="global-search-bar__empty-state"
				>
					Nenhum resultado encontrado
				</div>

				<cds-flexbox
					v-for="recentItem in slicedRecents"
					v-else-if="whatToRender === 'renderRecents'"
					:key="recentItem"
					direction="column"
					gap="4"
					class="global-search-bar__result-item"
					@click="onItemClick(recentItem)"
				>
					<slot
						v-if="hasSlot($slots, 'recent-item')"
						name="recent-item"
						:data="recentItem"
					/>

					<cds-flexbox
						gap="2"
						align="center"
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
				</cds-flexbox>

				<div
					v-for="(group, index) in groups"
					v-else-if="whatToRender === 'renderResults'"
					:key="index"
					class="global-search-bar__results-block"
				>
					<cds-divider
						v-if="group.results.length > 0"
						:text="group.category"
						inline
						class="global-search-bar__divider"
					/>

					<div
						v-for="item in slicedResults(index)"
						:key="item"
						class="global-search-bar__result-item-wrapper"
						@click="onItemClick(item)"
					>
						<slot
							v-if="hasSlot($slots, 'result-item')"
							:data="item"
							name="result-item"
						/>

						<div
							v-else
							class="global-search-bar__result-item"
						>
							{{ item.title }}
						</div>
					</div>

					<cds-flexbox
						v-if="group.results.length > 5"
						class="global-search-bar__show-more"
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
						/>
					</cds-flexbox>
				</div>
			</cds-flexbox>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import CdsIcon from '../components/Icon.vue';
import CdsFlexbox from '../components/Flexbox.vue';
import CdsDivider from '../components/Divider.vue';
import CdsSkeleton from '../components/Skeleton.vue';
import hasSlot from '../utils/methods/hasSlot';

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true,
		default: false,
	},
	groups: {
		type: Array,
		required: false,
		default: () => [],
	},
	recents: {
		type: Array,
		required: false,
		default: () => [],
	},
	loading: {
		type: Boolean,
		required: true,
		default: false,
	}
})

const emits = defineEmits(['update:modelValue', 'search', 'onItemClick', 'onSeeMoreClick', 'close']);

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
	return props.recents.slice(0, 5);
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

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.global-search-bar {

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
		background-color: rgba(0, 0, 0, 0.45);
		z-index: $z-index-modal;
		animation: zoom-in ease .3s;
	}

	&__search-icon {
		color: $n-400;
	}

	&__input {
		width: 70%;
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

	&__results {
		background-color: $n-0;
		border-radius: $border-radius-medium;
		border: 1px solid $n-30;
		padding: py(5);
		width: 70%;
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
</style>

