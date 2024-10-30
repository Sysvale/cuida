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

				<div
					v-for="item in items"
					v-else-if="whatToRender === 'renderResults'"
					:key="item"
				>
					<cds-divider
						v-if="item.results.length > 0"
						:text="item.category"
						inline
						class="global-search-bar__divider"
					/>

					<div
						v-for="result in item.results.slice(0, 5)"
						:key="result"
						class="global-search-bar__result-item"
						@click="onItemClick(result)"
					>
						{{ result.title }}
					</div>

					<cds-flexbox
						v-if="item.results.length > 5"
						class="global-search-bar__show-more"
						align="center"
						justify="center"
						@click="onSeeMoreClick(item)"
					>
						Ver todos os {{ item.results.length }} resultados
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

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true,
		default: false,
	},
	items: {
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
	let hasResults = props.items.some(item => item.results && item.results.length > 0);
	let hasRecents = props.recents.length > 0;

	if (hasResults && !isTyping.value) {
		return 'renderResults';
	} else if (!isTyping.value && !hasRecents && searchTerm.value.length === 0) {
		return 'renderInitialState';
	} else if (isTyping.value || props.loading) {
		return 'renderLoading';
	} else if (!isTyping.value && !hasResults && hasRecents) {
		return 'renderRecents';
	}

	return 'renderEmptyState';
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
		padding-top: 100px;
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
		max-height: 70svh;
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

	&__divider {
		padding: px(5);
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

		&:last-child {
			margin: mb(3);
		}
	}

	&__show-more {
		@include caption;
		color: $n-400;
		text-align: center;
		cursor: pointer;
		height: 40px;

		&:hover {
			background-color: $bn-50;
			color: $bn-400;
		}
	}
}
</style>

