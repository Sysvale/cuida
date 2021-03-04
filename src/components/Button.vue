<template>
	<div>
		<b-button>
			{{ content }}
		</b-button>
	</div>
</template>

<script>
import { ChevronDownIcon } from 'vue-feather-icons'

export default {
	components: {
		ChevronDownIcon
	},
	props: {
		/**
		 * Conteúdo do filter pill.
		 */
		content: {
			type: String,
			default: 'Conteúdo',
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

</style>
