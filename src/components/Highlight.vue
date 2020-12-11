<template>
	<span
		class="highlight__container"
		:class="{'highlight__container--highlighted': animated}"
	>
		<!-- @slot Slot usado para especificar o texto que receberá o highlight. -->
		<slot />
	</span>
</template>

<script>
export default {
	props: {
		/**
		 * A variante do Alert. São 3 variantes implementadas: 'info', 'success'
		 * e 'danger'
		 */
		variant: {
			type: String,
			default: 'info',
		},
		/**
		 * Especifica se o highlight vai ser estático ou animado.
		 */
		animated: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.highlight__container {
	padding: 4px;
	border-radius: 4px;
	background-image: linear-gradient(to right, #4fa7e246 50%, transparent 50%);
	background-size: 200%;

	&--highlighted {
		animation: highlight 1s ease-in backwards;
	}
}

@keyframes highlight {
	0% {
		background-position: 100%;
	}
}
</style>
