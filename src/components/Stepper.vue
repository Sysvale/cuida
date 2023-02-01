<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div
		:class="vertical ? 'stepper--vertical' : 'stepper'"
	>
		<div
			:class="vertical ? 'stepper__edge-container--vertical' : 'stepper__edge-container'"
		>
			<div class="stepper__edge">
				<div :class="dividerStyle(-1)" />
			</div>
		</div>
		<div
			v-for="(step, index) in steps"
			:key="index"
			:class="stepSectionStyle(index)"
		>
			<div
				v-if="vertical"
				class="stepper__step-label--vertical"
				:class="labelStyle(index)"
				@click="changeStep(index)"
			>
				<small>{{ step.label }}</small>
			</div>
			<div
				:id="`step-${index + 1}`"
				:class="vertical ? 'stepper__icon-container--vertical' : 'stepper__icon-container'"
				@click="changeStep(index)"
			>
				<div
					class="stepper__icon-circle"
					:class="circleStyle(step, index)"
				>
					<!-- <check-icon
						v-if="step.completed"
						size="1x"
					/> -->


					<cds-icon
						v-if="step.completed"
						height="32"
						width="32"
						name="check-outline"
					/>

					<!-- <x-icon
						v-else-if="step.error"
						size="1x"
					/> -->
					
					<cds-icon
						v-else-if="step.error"
						height="32"
						width="32"
						name="x-outline"
					/>

					<div
						v-else-if="step.inProcessing"
						class="stepper__processing-icon"
					>
						<svg
							width="19"
							height="22"
							viewBox="0 0 19 22"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18.78 16.6325C17.738 18.0472 16.3457 19.1664 14.7402 19.8799C13.1346 20.5935 11.3709 20.8769 9.62259 20.7023C7.87428 20.5276 6.20151 19.901 4.76877 18.884C3.33604 17.867 2.19266 16.4945 1.45107 14.9017C0.709475 13.3089 0.395207 11.5504 0.539162 9.79934C0.683116 8.04824 1.28034 6.36474 2.2721 4.9144C3.26387 3.46406 4.61603 2.2968 6.19562 1.52741C7.77522 0.758019 9.52787 0.412981 11.2812 0.526225L10.6287 10.6288L18.78 16.6325Z"
								fill="#3A7EDF"
							/>
						</svg>
					</div>
					<span
						v-else
						class="stepper__icon-text"
					>
						{{ index + 1 }}
					</span>
				</div>

				<div :class="dividerStyle(index)" />
			</div>
			<div
				v-if="!vertical"
				class="stepper__step-label"
				:class="labelStyle(index)"
			>
				<small>{{ step.label }}</small>
			</div>
		</div>
		<div
			v-if="!vertical"
			class="stepper__edge-container"
		>
			<div class="stepper__edge">
				<div :class="dividerStyle(-1)" />
			</div>
		</div>
	</div>
</template>
<script>
// import { CheckIcon, XIcon } from 'vue-feather-icons';
import CdsIcon from './Icon.vue';

export default {
	components: {
		CdsIcon,
	},

	props: {
		/**
		 * Um array com objetos com as propriedades 'label', 'inProcessing',
		 * 'error' e 'completed'. A 'label' é o texto que descreve o passo,
		 * e as demais props são booleanas e representam o status do passo.
		 */
		steps: {
			type: Array,
			default: () => [],
			required: true,
			description:
				`Um array com objetos com as propriedades 'label', 'inProcessing',
				'error' e 'completed'. A 'label' é o texto que descreve o passo,
				e as demais props são booleanas e representam o status do passo.`,
		},
		/**
		 * Define direção do stepper como vertical, por padrão a direção é horizontal (vertical = false).
		 */
		vertical: {
			type: Boolean,
			default: false,
			required: false,
		},
		/**
		* Controla qual step está ativo variando de 1 até o número de steps.
		*/
		value: {
			type: Number,
			default: 1,
			required: true,
		},
		/**
		* Desabilita navegação pelos steps quando setado como `true`.
		*/
		disableOnClick: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			internalValue: this.value - 1,
		};
	},

	watch: {
		internalValue(value) {
			this.$emit('input', value + 1);
		},

		value: {
			handler(newValue) {
				this.internalValue = newValue - 1;
			},
			immediate: true,
		},
	},

	methods: {
		circleStyle(step, index) {
			const classCursor = !this.disableOnClick ? 'stepper__step--clickable' : '';

			if (step.inProcessing) {
				return `stepper__step--in-processing ${classCursor}`;
			}

			if (step.error) {
				return `stepper__step--error ${classCursor}`;
			}

			if (step.completed) {
				return `stepper__step--completed ${classCursor}`;
			}

			if (index === this.internalValue) {
				return `stepper__step--active ${classCursor}`;
			}

			return ` stepper__step--muted ${classCursor}`;
		},

		changeStep(value) {
			if (!this.disableOnClick) {
				this.internalValue = value;
			}
		},

		dividerStyle(index) {
			const vertical = this.vertical ? 'vertical-' : '';
			if (index < 0) {
				return `stepper__${vertical}divider--default`;
			}

			const lastStep = index === this.steps.length - 1;
			const firstStep = index === 0;
			const prevStep = index - 1;
			const nextStep = index + 1;

			if (!lastStep
				&& this.steps[index].completed
				&& this.steps[nextStep].completed
			) {
				return `stepper__${vertical}divider--completed`;
			}

			if ((!lastStep
				&& index > 0
				&& this.steps[index].completed
				&& this.steps[prevStep].completed)
				|| (!lastStep
				&& firstStep
				&& this.steps[index].completed)
			) {
				return `stepper__${vertical}divider--in-progress`;
			}

			return `stepper__${vertical}divider--default`;
		},

		stepSectionStyle(index) {
			let classes = '';
			classes += index !== this.steps.length - 1 ? 'stepper__step-section ' : '';
			classes += this.vertical ? 'stepper__step-section--vertical' : '';
			return classes;
		},

		labelStyle(index) {
			let classes = '';

			classes += index === this.internalValue ? 'stepper__step-label--active' : 'stepper__step-label--muted';
			classes += !this.vertical ? ' stepper__step-label--horizontal' : '';
			classes += !this.disableOnClick ? ' stepper__step--clickable' : '';

			return classes;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/tokens.scss';

.stepper {
	display: flex;
	justify-content: space-between;

	&--vertical {
		@extend .stepper;
		flex-direction: column;
		height: 100%;
	}

	&__step--active,
	&__step--muted,
	&__step--in-processing,
	&__step--error,
	&__step--completed {
		min-width: 30px;
		min-height: 30px;
		border-radius: 50px;
		border: 1px;
		border-style: solid;
	}

	&__step--active {
		color: $n-600;
		border: 2px;
		border-style: solid;
		border-color: $gp-400;
	}

	&__step--muted {
		color: $n-500;
		border-color: $n-500;
	}

	&__step--in-processing {
		border: 2px;
		border-style: solid;
		border-color: $bn-400;
	}

	&__step--error {
		background-color: $rc-400;
		border-color: $rc-400;
		color: $n-0;
	}

	&__step--completed {
		background-color: $gp-400;
		border-color: $gp-400;
		color: $n-0;
	}

	&__step--clickable {
		cursor: pointer;
	}

	&__step-label {
		margin: mTRBL(2, 0, 0, n8);
		line-height: 1.0;
		display: block;
		text-align: center;

		&--muted {
			color: $n-600;
		}

		&--active small {
			color: $n-700;
			font-weight: 600;
		}

		&--horizontal {
			width: 100px;
		}

		&--vertical {
			@extend .stepper__step-label;
			margin: mr(2);
			text-align: right;
		}
	}

	&__edge {
		min-width: 30px;
		min-height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__edge-container {
		width: 50%;

		&--vertical {
			display: flex;
			justify-content: flex-end;
			height: 50%;
		}
	}

	&__divider--default,
	&__divider--in-progress,
	&__divider--completed {
		height: 1px;
		width: 100%;
	}

	&__divider--default {
		background-color: $n-400;
	}

	&__divider--in-progress {
		background: linear-gradient(90deg, #43E4CC 0%, $n-400 67.57%);
	}

	&__divider--completed {
		background: $gp-400;
	}

	&__icon-container {
		display: flex;
		align-items: center;

		&--vertical {
			@extend .stepper__icon-container;
			flex-direction: column;
		}
	}

	&__icon-circle {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: content-box;
	}

	&__icon-text {
		font-size: 14px;
	}

	&__processing-icon {
		margin-left: -1px;
		display: flex;
		align-items: center;
	}

	&__step-section {
		width: 100%;

		&--vertical {
			display: flex;
			justify-content: flex-end;
			height: 100%;
		}
	}

	&__vertical-divider--default,
	&__vertical-divider--in-progress,
	&__vertical-divider--completed {
		min-height: 30px;
		height: 100%;
		width: 1px;
	}

	&__vertical-divider--default {
		background-color: $n-400;
	}

	&__vertical-divider--in-progress {
		background: linear-gradient(180deg, #43E4CC 0%, $n-400 67.57%);
	}

	&__vertical-divider--completed {
		background: $gp-400;
	}
}
</style>
