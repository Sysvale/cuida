<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="spacer">
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		padding: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
		paddingTop: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
		paddingRight: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
		paddingBottom: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
		paddingLeft: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
		margin: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
		marginTop: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
		marginRight: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
		marginBottom: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
		marginLeft: {
			type: [Number, String],
			default: 0,
			validator: (value) => (value >= 0 && value <= 12),
		},
	},

	computed: {
		paddingTopResolver() {
			let pt = this.paddingTop > 12 ? 12 : +this.paddingTop;
			pt = this.padding ? this.basePropertyResolver(this.padding) : pt;

			return `${pt * 4}px`;
		},

		paddingRightResolver() {
			let pr = this.paddingRight > 12 ? 12 : +this.paddingRight;
			pr = this.padding ? this.basePropertyResolver(this.padding) : pr;
			return `${pr * 4}px`;
		},

		paddingBottomResolver() {
			let pb = this.paddingBottom > 12 ? 12 : +this.paddingBottom;
			pb = this.padding ? this.basePropertyResolver(this.padding) : pb;
			return `${pb * 4}px`;
		},

		paddingLeftResolver() {
			let pl = this.paddingLeft > 12 ? 12 : +this.paddingLeft;
			pl = this.padding ? this.basePropertyResolver(this.padding) : pl;
			return `${pl * 4}px`;
		},

		marginTopResolver() {
			let mt = this.marginTop > 12 ? 12 : +this.marginTop;
			mt = this.margin ? this.basePropertyResolver(this.margin) : mt;
			return `${mt * 4}px`;
		},

		marginRightResolver() {
			let mr = this.marginRight > 12 ? 12 : +this.marginRight;
			mr = this.margin ? this.basePropertyResolver(this.margin) : mr;
			return `${mr * 4}px`;
		},

		marginBottomResolver() {
			let mb = this.marginBottom > 12 ? 12 : +this.marginBottom;
			mb = this.margin ? this.basePropertyResolver(this.margin) : mb;
			return `${mb * 4}px`;
		},

		marginLeftResolver() {
			let ml = this.marginLeft > 12 ? 12 : +this.marginLeft;
			ml = this.margin ? this.basePropertyResolver(this.margin) : ml;
			return `${ml * 4}px`;
		},
	},

	methods: {
		basePropertyResolver(baseProperty) {
			if (baseProperty >= 0 && baseProperty <= 12) {
				return baseProperty;
			}

			if (baseProperty < 0) {
				return 0;
			}

			return 12;
		}
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