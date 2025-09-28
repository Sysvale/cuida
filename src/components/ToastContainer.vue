<template>
	<TransitionGroup
		tag="div"
		class="toast-container"
	>
		<template
			v-for="toast in toasts"
			:key="toast.id"
		>
			<CdsToast
				:id="toast.id"
				:model-value="true"
				:title="toast.title"
				:description="toast.description"
				:dismissible="toast.dismissible"
				:auto-dismissible="toast.autoDismissible"
				:dismiss-after="toast.dismissAfter"
				:variant="toast.variant"
				:light="toast.light"
			/>
		</template>
	</TransitionGroup>
</template>

<script setup>
import { useToast } from '../utils/composables/useToast.js'
import CdsToast from '../components/Toast.vue';

defineOptions({ name: 'ToastContainer' });

const toasts = useToast().toastState.toasts;
</script>

<style lang="scss" scoped>
@use '../assets/sass/tokens/index' as tokens;

.toast-container {
	position: fixed;
	z-index: tokens.$z-index-toast;
	bottom: 0px;
	right: 12px;
	display: flex;
	flex-direction: column-reverse;
	min-width: 400px;
}

.v-enter-active {
	transition: all 0.3s ease-in-out;
}

.v-move,
.v-leave-active {
	transition: all 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
	transform: translateY(12px);
}

.v-leave-active {
	position: absolute;
}
</style>
