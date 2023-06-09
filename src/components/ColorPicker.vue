<template>
	<div v-if="inline">
		<div class="labl">{{ label }}</div>
	
		<div
			v-for="(swatchline, index) in swatch"
			:key="index"
			class="d-flex"
		>
			<div
				v-for="(cl, idx) in swatchline"
				:key="idx"
			>
				<div :class="`swatch--${cl}`" @click="SwatchSelection(cl)">
					<cds-icon
						v-if="color === exp[cl.replace('-', '')]"
						height="22"
						width="22"
						name="check-outline"
						class="icnn"
						:class="{
							wht: ContrastChecker(color, '#ffffff', 17, 'POOR'),
							blk: ContrastChecker(color, '#1d262f', 17, 'POOR'),
						}"
					/>
				</div>
			</div>
		</div>
	</div>

	<div v-else>
		<div
			id="color-picker"
			@click.stop="clpClick"
		>
			<div class="preview-container">
				<div class="preview" /> 
			</div>
		</div>
		<cds-popover
			v-model="showPopover"
			:right-aligned="false"
			target-id="color-picker"
			height="190"
			fit-content-width
		>
			<div
				v-for="(swatchline, index) in swatch"
				:key="index"
				class="d-flex"
			>
				<div
					v-for="(cl, idx) in swatchline"
					:key="idx"
				>
					<div
						:class="`swatch--${cl}`"
						@click="SwatchSelection(cl)"
					/>
				</div>
			</div>
		</cds-popover>
	</div>
</template>

<script>
import CdsPopover from './Popover.vue';
import CdsIcon from './Icon.vue';
import Exp from '../assets/sass/colors.module.scss';
import ContrastChecker from '../utils/methods/contrastChecker';

export default {
	components: {
		CdsPopover,
		CdsIcon,
	},

	props: {
		/**
		* Guarda a cor selecionada no Color Picker.
		*/
		modelValue: {
			type: String,
			required: true,
		},
		/**
		 * Especifica a label do ColorPicker.
		 */
		label: {
			type: String,
			default: 'Label',
		},
		/**
		* Especifica a label do input.
		*/
		inline: {
			type: Boolean,
			default: false,
		},
		/**
		* Conjunto de cores a serem renderizadas no ColorPicker. A prop espera um Array de Array de tokens de cor sem `$` (dolar). Ex.: gp-400
		*/
		swatch: {
			type: Array,
			default: () => ([]),
		},
	},

	data() {
		return {
			color: this.modelValue,
			exp: Exp,
			showPopover: false,
		};
	},

	methods:{
		ContrastChecker,

		clpClick() {
			this.showPopover = !this.showPopover;
		},

		SwatchSelection(c) {
			this.color = this.exp[c.replace('-', '')];
			this.$emit('change', this.color);
			/**
			 * Evento que indica se o modal foi escondido.
			 * @event close
			 * @type {Event}
			*/
			this.$emit('update:modelValue', this.color);
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';
.preview-container {
	padding: pa(1);
	outline: 1px solid $n-50;
	width: fit-content;
	border-radius: $border-radius-lil;
	transition: $hover;
}

.preview-container:hover {
	outline: 1px solid $bn-300;
	cursor: pointer;
	transition: $hover;
}

.preview {
	height: 24px;
	width: 24px;
	border-radius: 4px;
	background-color: v-bind(color);
}

.swatch {
	@include paleteResolver using ($color) {
		background-color: $color;
		height: 24px;
		width: 24px;
		border-radius: 4px;
		margin: mTRBL(1, 1, 0, 0);
		padding-top: 2px;
		padding-left: 1px;
		cursor: pointer;
		transition: $interaction;

		&:hover {
			transform: scale(1.1);
			transition: $interaction;
		}
	}
}

.color-input {
	display: flex;
	align-items: center;
	width: fit-content;
	padding: pa(2);
	outline: 1px solid $n-50;
	border-radius: $border-radius-extra-small;
	width: 256px;
	justify-content: space-between;
	height: 40px;
	color: $n-600;
}


.labl {
	margin: mb(1);
	@include label;
}

.icnn {
	transition: $interaction;
}

.blk {
	color: black;
}

.wht {
	color: white;
}
</style>