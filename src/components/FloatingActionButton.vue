<template>
	<div class="floating-action-button__container">
		<template v-if="showActions || isExiting">
			<div
				v-for="action in actions"
				:key="action"
				class="floating-action-button__subitem-container"
				:class="{ 'exiting': isExiting }"
				@click="onSubItemClick(action)"
			>
				<div class="floating-action-button__subitem-label">
					{{ action?.label }}
				</div>

				<div class="floating-action-button__subitem">
					<icon
						:name="action?.icon"
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
					v-if="showActions"
					key="close-icon"
					name="x-outline"
					height="20"
					width="20"
					:style="{ '--rotation-direction': rotationDirection }"
				/>

				<icon
					v-else
					key="main-icon"
					:name="icon"
					height="20"
					width="20"
					:style="{ '--rotation-direction': rotationDirection }"
				/>
			</transition>
		</div>
	</div>
</template>

<script setup>

defineOptions({ name: 'FloatingActionButton' });

import { ref, computed, watch } from 'vue';
import Icon from '../components/Icon.vue';

const props = defineProps({
	/**
	 * Define a variante de cor do botão. São 9 variantes implementadas: 'green', 'teal',
	 * 'blue', 'indigo', 'violet', 'pink', 'red', 'orange', 'amber', 'gray' e 'dark'.
	 * @values green, teal, blue, indigo, violet, pink, red, orange, amber, dark
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
	actions: {
		type: Array,
		default: () => [],
		validator: (value) => {
			return value.length <= 5;
		},
	},
	/**
	 * Define o tamanho do botão. São 3 variantes implementadas: 'sm', 'md' e 'lg'.
	 * @values sm, md, lg
	 */
	size: {
		type: String,
		default: 'md',
	}
});

const emits = defineEmits(['main-button-click', 'action-click']);

const showActions = ref(false);
const isExiting = ref(false);
const rotationDirection = ref(-1);

const resolvedSize = computed(() => {
	switch (props.size) {
		case 'sm':
			return '44px';
		case 'md':
			return '56px';
		case 'lg':
			return '68px';
		default:
			return '56px';
	}
});

const resolvedActionsMargin = computed(() => {
	switch (props.size) {
		case 'sm':
			return '4px';
		case 'md':
			return '10px';
		case 'lg':
			return '16px';
		default:
			return '10px';
	}
});

const resolvedBorderRadius = computed(() => {
	switch (props.size) {
		case 'sm':
			return '12px';
		case 'md':
			return '16px';
		case 'lg':
			return '20px';
		default:
			return '16px';
	}
})

const resolvedIconColor = computed(() => {
	if (props.variant === 'white' || props.variant === 'gray') {
		return '#3B4754';
	}

	return '#fff';
});

watch(showActions, (newVal) => {
	if (!newVal) {
		isExiting.value = true;
		setTimeout(() => {
			isExiting.value = false;
		}, 500);
	}
});

function onMainButtonClick() {
	if (props.actions.length > 0) {
		rotationDirection.value = showActions.value ? -1 : 1;
		showActions.value = !showActions.value;
		return;
	}

	emits('main-button-click');
}

function onSubItemClick(action) {
	showActions.value = false;
	emits('action-click', action);
}

</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.floating-action-button {

	&__container {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 0 16px 16px 0;
		display: flex;
		flex-direction: column;
		align-items: end;
		gap: tokens.spacer(6);
		z-index: tokens.$z-index-tooltip;
	}

	&__main-button {
		position: relative;
		border-radius: v-bind(resolvedBorderRadius);
		width: v-bind(resolvedSize);
		height: v-bind(resolvedSize);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: tokens.pa(3);
		color: v-bind(resolvedIconColor);
		box-shadow: tokens.$shadow-md;
		cursor: pointer;
		transition: background-color 0.2s ease;

		@include tokens.variantResolver using ($color-name, $shade-50, $shade-100, $shade-200, $shade-300, $base-color, $shade-500, $shade-600) {
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
			border-radius: tokens.$border-radius-medium;
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
		margin-right: v-bind(resolvedActionsMargin);
		z-index: tokens.$z-index-tooltip;
		animation: slide-in 0.3s ease-in-out forwards;

		&.exiting {
			animation: slide-out 0.3s ease-in-out forwards;
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
		@include tokens.caption;
		font-weight: tokens.$font-weight-semibold;
		padding: tokens.pYX(1, 2);
		margin: tokens.mb(1);
		color: tokens.$n-0;
		background-color: rgba(black, 0.6);
		border-radius: tokens.$border-radius-lil;
	}

	&__subitem {
		position: relative;
		border-radius: tokens.$border-radius-small;
		width: 36px;
		height: 36px;
		margin-top: -6px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: tokens.pa(2);
		background-color: tokens.$n-0;
		color: tokens.$n-700;
		box-shadow: tokens.$shadow-md;
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
			border-radius: tokens.$border-radius-small;
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
    transition: opacity 0.25s ease, rotate 0.3s ease;
}

.icon-transition-enter-from {
    opacity: 0;
    rotate: 0deg;
}

.icon-transition-enter-to {
    opacity: 1;
    rotate: 0deg;
}

.icon-transition-leave-from {
    opacity: 1;
    rotate: 0deg;
}

.icon-transition-leave-to {
    opacity: 0;
    rotate: calc(-170deg * var(--rotation-direction, 1));
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
