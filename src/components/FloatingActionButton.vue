<template>
	<div class="floating-action-button__container">
		<template v-if="showSubItems || isExiting">
			<div
				v-for="subItem in subItems"
				:key="subItem"
				class="floating-action-button__subitem-container"
				:class="{ 'exiting': isExiting }"
				@click="onSubItemClick(subItem)"
			>
				<div class="floating-action-button__subitem-label">
					{{ subItem?.label }}
				</div>

				<div class="floating-action-button__subitem">
					<icon
						:name="subItem?.icon"
						height="32"
						width="32"
					/>
				</div>
			</div>
		</template>

		<div
			class="floating-action-button__main-button"
			:class="`floating-action-button__main-button--${variant}`"
			@click="onMainButtonClick"
		>
			<transition
				name="icon-transition"
				mode="out-in"
			>
				<icon
					v-if="showSubItems"
					key="close-icon"
					name="x-outline"
					height="20"
					width="20"
				/>

				<icon
					v-else
					key="main-icon"
					:name="icon"
					height="20"
					width="20"
				/>
			</transition>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Icon from '../components/Icon.vue';

const props = defineProps({
	/**
	 * Define a variante de cor do botão. São 9 variantes implementadas: 'green', 'teal',
	 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray' e 'dark'.
	 */
	variant: {
		type: String,
		default: 'green',
	},
	/**
	 * Define o ícone do botão.
	 */
	icon: {
		type: String,
		default: 'plus-outline',
	},
	/**
	 * Lista de ações do subMenu. Cada item deve conter os atributos `label` e `icon`.
	 */
	subItems: {
		type: Array,
		default: () => [],
		validator: (value) => {
			return value.length <= 5;
		},
	},
	/**
	 * Define o tamanho do botão. São 3 variantes implementadas: 'sm', 'md' e 'lg'.
	 */
	size: {
		type: String,
		default: 'md',
	}
});

const emits = defineEmits(['main-button-click', 'sub-item-click']);

const showSubItems = ref(false);
const isExiting = ref(false);

const resolvedSize = computed(() => {
	switch (props.size) {
		case 'sm':
			return '44px';
		case 'md':
			return '56px';
		case 'lg':
			return '60px';
		default:
			return '56px';
	}
});

const resolvedSubItemsMargin = computed(() => {
	switch (props.size) {
		case 'sm':
			return '4px';
		case 'md':
			return '10px';
		case 'lg':
			return '12px';
		default:
			return '10px';
	}
});

const resolvedIconColor = computed(() => {
	if (props.variant === 'white' || props.variant === 'gray') {
		return '#3B4754';
	}

	return '#fff';
});

watch(showSubItems, (newVal) => {
	if (!newVal) {
		isExiting.value = true;
		setTimeout(() => {
			isExiting.value = false;
		}, 500);
	}
});

function onMainButtonClick() {
	if (props.subItems.length > 0) {
		showSubItems.value = !showSubItems.value;
		return;
	}

	emits('main-button-click');
}

function onSubItemClick(subItem) {
	emits('sub-item-click', subItem);
}

</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.floating-action-button {

	&__container {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 0 16px 16px 0;
		display: flex;
		flex-direction: column;
		align-items: end;
		gap: spacer(6);
		z-index: $z-index-tooltip;
	}

	&__main-button {
		position: relative;
		border-radius: $border-radius-medium;
		width: v-bind(resolvedSize);
		height: v-bind(resolvedSize);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: pa(3);
		color: v-bind(resolvedIconColor);
		box-shadow: $shadow-md;
		cursor: pointer;
		transition: background-color 0.2s ease;

		@include variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
			background-color: $base-color;
		}

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.1);
			border-radius: $border-radius-medium;
			opacity: 0;
			transition: opacity 0.2s ease;
		}

		&:active::before {
			opacity: 1;
		}
	}

	&__subitem-container {
		position: relative;
		display: flex;
		align-items: center;
		gap: 6px;
		margin-right: v-bind(resolvedSubItemsMargin);
		z-index: $z-index-tooltip;
		animation: slide-in 0.5s ease-in-out forwards;

		&.exiting {
			animation: slide-out 0.5s ease-in-out forwards;
		}
	}

	@keyframes slide-in {
		0% {
			transform: translateY(30px);
			opacity: 0;
		}
		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	&__subitem-label {
		@include overline;
		font-weight: $font-weight-semibold;
		padding: pYX(1, 2);
		margin: mb(1);
		color: $n-0;
		background-color: rgba(black, 0.6);
		border-radius: $border-radius-lil;
	}

	&__subitem {
		position: relative;
		border-radius: $border-radius-small;
		width: 36px;
		height: 36px;
		margin-top: -6px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: pa(2);
		background-color: $n-0;
		color: $n-700;
		box-shadow: $shadow-md;
		cursor: pointer;
		transition: background-color 0.2s ease;

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.1);
			border-radius: $border-radius-small;
			opacity: 0;
			transition: opacity 0.2s ease;
		}

		&:active::before {
			opacity: 1;
		}
	}
}

.icon-transition-enter-active,
.icon-transition-leave-active {
	transition: opacity 0.15s ease, transform 0.15s ease;
}

.icon-transition-enter-from {
	opacity: 0;
	transform: scale(0.8);
}

.icon-transition-enter-to {
	opacity: 1;
	transform: scale(1);
}

.icon-transition-leave-from {
	opacity: 1;
	transform: scale(1);
}

.icon-transition-leave-to {
	opacity: 0;
	transform: scale(0.8);
}

@keyframes slide-in {
	0% {
		opacity: 0;
		transform: translateY(30px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes slide-out {
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(30px);
	}
}

</style>
