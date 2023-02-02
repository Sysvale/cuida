<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="spacer">
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		paddingTop: {
			type: Number,
			default: 0,
			validator: (value) => value <= 12,
		},

		paddingRight: {
			type: Number,
			default: 0,
			validator: (value) => value <= 12,
		},

		paddingBottom: {
			type: Number,
			default: 0,
			validator: (value) => value <= 12,
		},

		paddingLeft: {
			type: Number,
			default: 0,
			validator: (value) => value <= 12,
		},

		marginTop: {
			type: Number,
			default: 0,
			validator: (value) => value <= 12,
		},

		marginRight: {
			type: Number,
			default: 0,
			validator: (value) => value <= 12,
		},

		marginBottom: {
			type: Number,
			default: 0,
			validator: (value) => value <= 12,
		},

		marginLeft: {
			type: Number,
			default: 0,
			validator: (value) => value <= 12,
		},
	},

	computed: {
		paddingTopResolver() {
			let pt = this.paddingTop > 12 ? 12 : +this.paddingTop;
			return `${pt * 4}px`;
		},

		paddingRightResolver() {
			let pr = this.paddingRight > 12 ? 12 : +this.paddingRight;
			return `${pr * 4}px`;
		},

		paddingBottomResolver() {
			let pb = this.paddingBottom > 12 ? 12 : +this.paddingBottom;
			return `${pb * 4}px`;
		},

		paddingLeftResolver() {
			let pl = this.paddingLeft > 12 ? 12 : +this.paddingLeft;
			return `${pl * 4}px`;
		},

		marginTopResolver() {
			let mt = this.marginTop > 12 ? 12 : +this.marginTop;
			return `${mt * 4}px`;
		},

		marginRightResolver() {
			let mr = this.marginRight > 12 ? 12 : +this.marginRight;
			return `${mr * 4}px`;
		},

		marginBottomResolver() {
			let mb = this.marginBottom > 12 ? 12 : +this.marginBottom;
			return `${mb * 4}px`;
		},

		marginLeftResolver() {
			let ml = this.marginLeft > 12 ? 12 : +this.marginLeft;
			return `${ml * 4}px`;
		},
	},
}
</script>

<style lang="scss" scoped>
.spacer {
	margin-bottom: v-bind(marginBottomResolver);
	margin-left: v-bind(marginLeftResolver);
	margin-right: v-bind(marginRightResolver);
	margin-top: v-bind(marginTopResolver);

	padding-bottom: v-bind(paddingBottomResolver);
	padding-left: v-bind(paddingLeftResolver);
	padding-right: v-bind(paddingRightResolver);
	padding-top: v-bind(paddingTopResolver);
}
</style>