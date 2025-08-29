<template>
	<div
		ref="truncateContainerEl"
		class="truncate-container"
	>
		<div class="truncate-container__content">
			<!-- @slot Slot padrão utilizado para exibir o conteúdo enviado para o container -->
			<slot />
		</div>

		<div
			v-if="isOverflowing && !expanded"
			class="fade-overlay"
		/>

		<CdsFlexbox
			v-if="isOverflowing"
			:justify="computedTextAlign"
		>
			<CdsFlatButton
				class="truncate-container__button"
				:text="computedText"
				:variant
				@click="handleFlatButtonClick"
			/>
		</CdsFlexbox>
	</div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue';
import CdsFlatButton from './FlatButton.vue';
import CdsFlexbox from './Flexbox.vue';

const props = defineProps({
	/**
	* Altura do container.
	*/
	height: {
		type: String,
		default: '250px'
	},
	/**
	* Define o alinhamento do texto.
	*/
	textAlign: {
		type: String,
		default: 'center',
	},
	/**
	* A variante da FlatButton. São 9 variantes.
	* @values green, teal, turquoise, blue, indigo, violet, pink, red, orange, amber e dark.
	*/
	variant: {
		type: String,
		default: 'dark',
	},
});

const emits = defineEmits([
	/**
	* Evento emitido quando o FlatButton do TruncateContainer é clicado.
	* @event button-click
	* @type {Event}
	*/
	'button-click',
	/**
	* Evento emitido o TruncateContainer é expandido.
	* @event expand
	* @type {Event}
	*/
	'expand',
	/**
	* Evento emitido o TruncateContainer é colapsado.
	* @event collapse
	* @type {Event}
	*/
	'collapse'
]);

const isOverflowing = ref(false);
const expanded = ref(false);
const truncateContainerEl = ref(null);

const computedHeight = computed(() => (
	expanded.value ? `${truncateContainerEl.value.scrollHeight}px` : `${props.height.replace('px', '')}px`
));

const computedText = computed(() => expanded.value ? 'Mostrar menos' : 'Mostrar mais');
const computedTextAlign = computed(() => props.textAlign);
const computedFlatButtonPosition = computed(() =>  expanded.value ? '-4px' : '8px')

watch([() => props.height, () => truncateContainerEl.value?.scrollHeight], () => {
	nextTick(() => {
		checkOverflow();
	});
}, { immediate: true });

watch(expanded, () => expanded.value ? emits('expand') : emits('collapse'));

function checkOverflow() {
	const el = truncateContainerEl.value;
	if (!el) return;

	isOverflowing.value = el.scrollHeight > el.clientHeight;
}

function handleFlatButtonClick() {
	expanded.value = !expanded.value;
	emits('button-click');
}
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.truncate-container {
	position: relative;
	height: fit-content;
	max-height: v-bind(computedHeight);
	overflow: hidden;
	transition: max-height 0.25s ease-in-out;
}

.fade-overlay {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 40px;
	pointer-events: none;
	background: linear-gradient(
		to bottom,
		rgba(255, 255, 255, 0.8) 0%,
		rgba(255, 255, 255, 0.85) 40%,
		rgba(255, 255, 255, 0.95) 70%,
		rgba(255, 255, 255, 1) 100%
	);
	backdrop-filter: blur(2px);
}

.truncate-container__button {
	position: absolute;
	bottom: v-bind(computedFlatButtonPosition);
	margin: tokens.mx(1);
}

.truncate-container__content {
	padding: tokens.pb(5);
}
</style>
