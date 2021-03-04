<template>
	<div>
		<div class="d-flex justify-content-between align-items-center">
			<div>
				<div>
					{{ title }}
				</div>
				<div>
					<small>{{ FontWeightTokenName }}</small>
				</div>
				<div>
					<small class="font-weight-bold">font-weight: {{ fontWeight }};</small>
				</div>
			</div>
			<div
				class="text-sample"
				:style="dynamicStyle"
			>
				{{ sample }}
			</div>
			<br>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'Texto teste',
			required: true,
		},
		fontWeight: {
			type: Number,
			default: 400,
		},
		FontWeightTokenName: {
			type: String,
			default: 'Texto teste',
			required: true,
		},
		sample: {
			type: String,
			default: 'Texto teste',
		},
	},

	computed: {
		dynamicStyle() {
			return {
				'--fontWeight': this.fontWeight,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.text-sample {
	font-size: 16px;
	font-weight: var(--fontWeight);
	letter-spacing: 0;
	width: 40%;
}
</style>
