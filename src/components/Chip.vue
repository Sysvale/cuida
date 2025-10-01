<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		class="chip__container"
		:class="classList"
		data-testid="chip-container"
		@click="handleClick"
	>
		<div :class="`chip__content--${size}`">
			<div
				class="chip__content-container"
				:style="{
					maxWidth: maxWidth,
					...containerStyle,
				}"
			>
				<transition name="fade">
					<template v-if="internalValue || props.persistantActionIcon">
						<div 
							v-if="useHasSlot('icon')" 
							class="chip__content--icon"
						>
							<!-- @slot Slot utilizado para alterar o ícone mostrado na chip. -->
							<slot name="icon" />
						</div>
						<CdsIcon
							v-else
							name="check-outline"
							:height="icon.height"
							:width="icon.width"
						/>
					</template>
				</transition>
				<div ref="slot-content">
					<!-- @slot Slot utilizado para o conteúdo textual da chip. -->
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, ref, onMounted, useTemplateRef, watch } from 'vue';
import { useHasSlot } from '../utils/composables/useHasSlot';
import { colorOptions } from '../utils/constants/colors';
import sizes from '../utils/constants/sizes';
import CdsIcon from './Icon.vue';

defineOptions({ name: 'CdsChip' });

const modelValue = defineModel('modelValue', {
	type: Boolean,
	required: true,
});

const props = defineProps({
	/**
	 * A variante da Badge. São 9 variantes.
	 * @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
	 */
	variant: {
		type: String,
		default: 'gray',
	},
	/**
	 * Especifica o tamanho da chip. São 3 tamanhos implementados. 
	 * @values sm, md, lg
	 */
	size: {
		type: String,
		default: 'md',
	},
	/**
	 * Especifíca se o ícone de ação da chip é mostrado independentemente do estado de seleção.
	 */
	persistantActionIcon: {
		type: Boolean,
		default: false
	},
	/**
	 * Especifica se o ícone da chip é mostrado na esquerda (true) ou direita (false).
	 */
	iconLeft: {
		type: Boolean,
		default: true,
	},
});

const slotContentRef = useTemplateRef('slot-content');
const predefinedColors = ref(colorOptions);
const predefinedSizes = ref(sizes);
const internalValue = ref(modelValue.value);
const classList = ref('');
const shouldUpdatePadding = ref(true);
const maxWidth = ref('0px');


const predefinedStyle = computed(() => {
	let dynamicClass = '';

	if (!internalValue.value) {
		dynamicClass += ' chip--not-selected';
	}

	if (predefinedColors.value.indexOf(props.variant) > -1) {
		dynamicClass += ` chip--${props.variant}`;
	}

	if (predefinedSizes.value.indexOf(props.size) > -1) {
		dynamicClass += ` chip--${props.size}`;
	}

	return dynamicClass;
});

const icon = computed(() => {
	switch (props.size) {
		case 'sm':
			return {
				height: 14,
				width: 14,
			};
		case 'lg':
			return {
				height: 20,
				width: 20,
			};
		default:
			return {
				height: 18,
				width: 18,
			};
	}
});

const containerStyle = computed(() => {
	if (props.persistantActionIcon) {
		return;
	}
	return shouldUpdatePadding.value
		? {
			paddingRight: icon.value.width / 2 + 2 + 'px',
			paddingLeft: icon.value.width / 2 + 2 + 'px',
		}
		: {};
});

const iconPosition = computed(() => {
	return props.iconLeft ? 'row' : 'row-reverse';
});

watch(
	() => modelValue,
	(newModelValue) => {
		internalValue.value = newModelValue.value;
	}
);

watch(
	() => internalValue.value,
	(newInternalValue) => {
		if (!newInternalValue) {
			classList.value += ' chip--not-selected';
		} else {
			classList.value = removeNotSelectedClass();
		}

		setTimeout(() => {
			shouldUpdatePadding.value = !newInternalValue;
		}, 300);

		modelValue.value = newInternalValue;
	}
);

onMounted(() => {
	classList.value = predefinedStyle.value;
	setTimeout(() => {
		maxWidth.value =
			(slotContentRef.value?.offsetWidth || 0) + 4 + icon.value.width + 'px';
	}, 100);
});

function handleClick() {
	internalValue.value = !internalValue.value;
}

function removeNotSelectedClass() {
	let regex = new RegExp('chip--not-selected', 'g');
	return classList.value.replace(regex, '');
}

</script>
<style lang="scss" scoped>
@use 'sass:color';
@use '../assets/sass/tokens/index' as tokens;

.chip {
	&__container {
		border-radius: 50px !important;
		width: fit-content;
		cursor: pointer;
	}

	&--not-selected {
		color: tokens.$n-400 !important;
		background-color: tokens.$n-20 !important;
		outline: none !important;
	}

	&--sm {
		padding: tokens.pYX(1, 2);
	}

	&--md {
		padding: tokens.pYX(1, 2);
	}

	&--lg {
		padding: tokens.pYX(1, 3);
	}

	&__content {
		&--sm {
			@include tokens.overline;
		}

		&--md {
			@include tokens.caption;
			font-weight: tokens.$font-weight-semibold;
			line-height: 18px;
		}

		&--lg {
			@include tokens.button-1;
			font-weight: tokens.$font-weight-semibold;
		}
		&--icon {
			display: flex;
			overflow: hidden;
			align-items: center;
			width: v-bind('icon.width');
			height: v-bind('icon.height');
		}
		&--icon > :slotted(svg) {
			height: 100%;
			width: 100%;
		}
	}

	&__content-container {
		display: flex;
		flex-direction: v-bind(iconPosition);
		align-items: center;
		gap: tokens.spacer(1);
		justify-content: center;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	@include tokens.variantResolver using
		(
			$color-name,
			$shade-50,
			$shade-100,
			$shade-200,
			$shade-300,
			$base-color,
			$shade-500,
			$shade-600
		) {
		color: color.adjust($shade-500, $lightness: -4%);
		background-color: $shade-100;
		outline: 1px solid $shade-600;

		&:hover {
			color: color.adjust($shade-600, $lightness: -10%) !important;
			background-color: $shade-100 !important;
		}
	}

	&--amber {
		color: tokens.$al-700;
		background-color: tokens.$al-100;

		&:hover {
			color: color.adjust(tokens.$al-700, $lightness: -10%) !important;
			background-color: tokens.$al-100 !important;
		}
	}

	&--gray {
		color: tokens.$n-600;
		background-color: tokens.$n-20;

		&:hover {
			color: color.adjust(tokens.$n-600, $lightness: -10%) !important;
			background-color: tokens.$n-20 !important;
		}
	}

	&--white {
		color: tokens.$n-800;
		background-color: tokens.$n-0;
		outline: 1px solid tokens.$n-100;

		&:hover {
			color: color.adjust(tokens.$n-600, $lightness: -10%) !important;
			background-color: tokens.$n-0 !important;
		}
	}

	&--dark {
		color: tokens.$n-10;
		background-color: tokens.$n-700;
		outline: 1px solid tokens.$n-800;

		&:hover {
			color: color.adjust(tokens.$n-10, $lightness: -10%) !important;
			background-color: tokens.$n-700 !important;
		}
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
