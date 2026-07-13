<template>
	<div
		class="segment-control"
	>
		<button
			v-for="(segment, index) in segments"
			:key="index"
			type="button"
			class="segment-control__button"
			:class="{
				'segment-control__button--active': segment === model,
				'segment-control__button--inactive': segment !== model,
			}"
			@click="handleClick(segment, index)"
		>
			<CdsTooltip
				v-if="withIcon"
				:text="segmentsTooltipText[index]"
			>
				<CdsIcon
					height="20"
					width="20"
					:name="segment"
				/>
			</CdsTooltip>

			<span v-else>{{ segment }}</span>
		</button>
	</div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import CdsIcon from './Icon.vue';
import CdsTooltip from './Tooltip.vue';

defineOptions({ name: 'CdsSegmentedControl' });

/**
 * Prop utilizada como v-model do componente.
 */
const model = defineModel({
	type: String,
	default: '',
});

const props = defineProps({
	/**
	 * Array de strings que serão exibidos como opções do componente.
	 */
	segments: {
		type: Array,
		default: () => [],
	},
	/**
	 * Se verdadeiro, exibe ícones no lugar de texto.
	 */
	withIcon: {
		type: Boolean,
		default: false,
	},
	/**
	 * Array de strings que serão exibidos como tooltip quando o mouse estiver sobre o ícone.
	 */
	segmentsTooltipText: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits([
	/**
	 * Evento emitido quando o usuário clica em algum segmento.
	 * @event click
	 */
	'click',
	/**
	 * Evento emitido quando o usuário clica em algum segmento.
	 * @event update:model-value
	 */
	'update:model-value',
]);

watch(() => props.segments, (newValue, oldValue) => {
	if (newValue !== oldValue && newValue.length > 0) {
		model.value = props.segments.find((v) => v === model.value) ?? props.segments[0]
	}
});

onMounted(() => {
	if (props.segments.length > 0) {
		model.value = props.segments.find((v) => v === model.value) ?? props.segments[0];
	}
});

const handleClick = (segment, index) => {
	model.value = segment;
	/**
	 * Evento emitido quando o componente é clicado.
	 * @event click
	 * @type {Event}
	 */
	emit('click', segment, index);
};
</script>

<style lang="scss">
@use '../assets/sass/tokens/index' as tokens;
.segment-control {
	background-color: tokens.$n-20;
	outline: 1px solid tokens.$n-40;
	display: flex;
	width: fit-content;
	padding: tokens.pa(1);
	border-radius: tokens.$border-radius-extra-small;
	
	&__button {
		max-width: 200px;
		border-radius: tokens.$border-radius-extra-small;
		border: none;
		background-color: transparent;
		font-size: 14px;
		cursor: pointer;
		transition: tokens.$opening;
		padding: tokens.pYX(2, 3);
		
		&--active {
			background-color: tokens.$n-0;
			color: tokens.$n-700;
			transition: tokens.$opening;
			box-shadow: 0px 4px 8px rgba(16, 24, 64, 0.04);
			font-weight: tokens.$font-weight-semibold;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
		
		&--inactive {
			font-weight: tokens.$font-weight-semibold;
			background-color: transparent;
			color: tokens.$n-600;
			transition: tokens.$opening;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
