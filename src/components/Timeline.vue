<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="cds-timeline">
		<slot />
	</div>
</template>

<script>
import CdsDivider from './Divider.vue';
import CdsSpinner from './Spinner.vue';

export default {
	components: {
		CdsDivider,
		CdsSpinner,
	},

	props: {
		/**
		* O array que especifica os eventos que vão ser mostrados na timeline
		*/
		history: {
			type: Array,
			default: () => [],
			required: true,
		},
		/**
		* O array que especifica os eventos que vão ser mostrados na timeline
		*/
		reverse: {
			type: Boolean,
			default: false,
		},
		/**
		* O array que especifica os eventos que vão ser mostrados na timeline
		*/
		variant: {
			type: Boolean,
			default: false,
		},
		/**
		* O array que especifica os eventos que vão ser mostrados na timeline
		*/
		leftAligned: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			innerHistory: this.reverse ? this.history.slice().reverse() : this.history,
		};
	},
};
</script>
<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.cds-timeline {
	padding: pa(5);
}
</style>
