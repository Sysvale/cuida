<template>
	<div>
		<div class="d-flex justify-content-between align-items-center">
			<div>
				<div>
					{{ TypographyTokenName}}
				</div>
				<div>
					<small class="font-weight-bold mr-4">font-size: {{ fontSize }}px;</small>
					<small class="font-weight-bold mr-4">font-weight: {{ fontWeight }};</small>
					<small class="font-weight-bold">letter-spacing: {{ letterSpacing}}px;</small>
				</div>
			</div>
			<div
				v-if="!isAButtonSample"
				class="text-sample"
				:style="dynamicStyle"
			>
				{{ sample }}
			</div>
			<button
				v-else
				class="button-sample"
				:style="dynamicStyle"
			>
				Botão
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		fontSize: {
			type: Number,
			default: 33,
		},
		fontWeight: {
			type: Number,
			default: 400,
		},
		letterSpacing: {
			type: Number,
			default: 0,
		},
		TypographyTokenName: {
			type: String,
			default: 'Texto teste',
		},
		sample: {
			type: String,
			default: 'Texto teste',
		},
		isAButtonSample: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		dynamicStyle() {
			return {
				'--fontSize': `${this.fontSize}px`,
				'--fontWeight': this.fontWeight,
				'--letterSpacing': `${this.letterSpacing}px`,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
.text-sample {
	font-size: var(--fontSize);
	font-weight: var(--fontWeight);
	letter-spacing: var(--letterSpacing);
	width: 40%;
}

.button-sample {
	font-size: var(--fontSize);
	font-weight: var(--fontWeight);
	letter-spacing: var(--letterSpacing);
	border: 1px solid #ABB5BF;
	padding: 8px 20px;
	border-radius: 4px;
	background: #FFFFFF;
}
</style>
