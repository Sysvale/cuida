<template>
	<div>
		<span class="filter-pill_container">
			<span>{{ this.label }}: </span>
			<span>{{ this.content }} </span>
		</span>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * Conteúdo do filter pill.
		 */
		content: {
			type: String,
			default: 'Conteúdo',
			required: true,
		},
		/**
		 * Label exibida ao lado do conteúdo
		 */
		label: {
			type: String,
			default: 'Label',
			required: true,
		},
	},
	computed: {
		filterPillText(){
			return `${this.label}: ${this.content}`;
		}
	},

};
</script>
<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.filter-pill_container {
	padding: 8px 16px;
	border: 1px solid $cinza-4;
	border-radius: 8px;
}
</style>
