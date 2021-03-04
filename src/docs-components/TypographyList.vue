<template>
	<div>
		<copy-token :target="target" />

		<div class="d-flex justify-content-between align-items-center">
			<div>
				<div
					@click="target = TypographyTokenName"
					:id="TypographyTokenName"
					class="copy-clip d-flex align-middle align-items-center"
				>
					<copy-icon size="1.1x" class="text-secondary mr-3" />
					<div class="align-middle"> ${{ TypographyTokenName }} </div>
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
import { CopyIcon } from 'vue-feather-icons'
import CopyToken from './CopyToken.vue';
export default {
	components: {
		CopyIcon,
		CopyToken,
	},
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
	data() {
		return {
			target: '',
		}
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
@import './../assets/sass/app.scss';

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

@each $border-radius-name, $border-radius-token in $border-radius {
	.#{$border-radius-name} {
		border-radius: $border-radius-token;
		width: 60px;
		height: 60px;
		background-color: $verde-piccolo-base;
	}
}

.copy-clip {
    width: fit-content;
    padding: 8px 12px;
    border-radius: 16px;
	border: 1px solid $branco;
	transition: all .15s ease-in-out;
}

.copy-clip:hover {
	border: 1px solid $verde-piccolo-light-1;
	cursor: pointer;
	transition: all .15s ease-in-out;
}
</style>
