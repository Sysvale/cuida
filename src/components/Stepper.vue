<template>
	<div
		class="stepper d-flex justify-content-between"
		:class="vertical ? 'flex-column' : ''"
	>
		<div
			:class="vertical ? 'd-flex justify-content-end' : 'w-50'"
		>
			<div class="stepper__edge d-flex align-items-center justify-content-center">
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
				class="stepper__step-label mr-2 text-right"
				:class="labelStyle(index)"
			>
				<small>{{ step.label }}</small>
			</div>
			<div
				class="d-flex align-items-center"
				:class="vertical ? 'flex-column' : ''"
				:id="`step-${index + 1}`"
				@click="changeStep(index)"
			>
				<div
					class="d-flex justify-content-center align-items-center cursor-pointer"
					:class="circleStyle(step, index)"
				>
					<check-icon
						v-if="step.completed"
						size="1x"
					/>
					<x-icon
						v-else-if="step.error"
						size="1x"
					/>
					<div
						v-else-if="step.inProcessing"
						class="ml-n-1px d-flex align-items-center"
					>
						<svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18.78 16.6325C17.738 18.0472 16.3457 19.1664 14.7402 19.8799C13.1346 20.5935 11.3709 20.8769 9.62259 20.7023C7.87428 20.5276 6.20151 19.901 4.76877 18.884C3.33604 17.867 2.19266 16.4945 1.45107 14.9017C0.709475 13.3089 0.395207 11.5504 0.539162 9.79934C0.683116 8.04824 1.28034 6.36474 2.2721 4.9144C3.26387 3.46406 4.61603 2.2968 6.19562 1.52741C7.77522 0.758019 9.52787 0.412981 11.2812 0.526225L10.6287 10.6288L18.78 16.6325Z" fill="#3A7EDF"/>
						</svg>
					</div>
					<span
						v-else
						class="fs-14"
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
			class="w-50"
		>
			<div class="stepper__edge d-flex align-items-center justify-content-center">
				<div :class="dividerStyle(-1)" />
			</div>
		</div>
	</div>
</template>
<script>
import { CheckIcon, XIcon } from 'vue-feather-icons';

export default {
	components: {
		CheckIcon,
		XIcon,
	},

	props: {
		steps: {
			type: Array,
			default: () => [],
			required: true,
			description:
				`Um objeto com as propriedades 'label', 'inProcessing',
				'error' e 'completed', 'label' é o texto que descreve o passo,
				e as demais props são booleanas e representam o status do passo.`,
		},
		vertical: {
			type: Boolean,
			default: false,
			required: false,
		},
		value: {
			type: Number,
			default: 0,
			required: true,
		}
	},

	data() {
		return {
			internalValue: this.value - 1,
		}
	},

	methods: {
		circleStyle(step, index) {
			if (step.inProcessing) {
				return 'stepper__step--in-processing';
			}

			if (step.error) {
				return 'stepper__step--error';
			}

			if (step.completed) {
				return 'stepper__step--completed';
			}
			
			if (index === this.internalValue) {
				return 'stepper__step--active';
			}

			return ' stepper__step--muted';
		},

		changeStep(value) {
			this.internalValue = value;

			this.$emit('input', this.internalValue + 1);
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
			
			if((!lastStep
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
			classes += index !== this.steps.length - 1 ? 'w-100 ' : '';
			classes += this.vertical ? 'd-flex justify-content-end' : '';
			return classes;
		},

		labelStyle(index) {
			let classes = '';

			classes += index === this.internalValue ? 'stepper__step-label--active' : 'stepper__step-label--muted';
			classes += !this.vertical ? ' label-max-width' : '';
			
			return classes;
		},
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.stepper {
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
		color: $cinza-6;
		border: 2px;
		border-style: solid;
		border-color: $verde-piccolo-base;
	}

	&__step--muted {
		color: $cinza-5;
		border-color: $cinza-5;
	}

	&__step--in-processing {
		border: 2px;
		border-style: solid;
		border-color: $azul-sonic-base;
	}

	&__step--error {
		background-color: $vermelho-mario-base;
		border-color: $vermelho-mario-base;
		color: $branco;
	}
	
	&__step--completed { 
		background-color: $verde-piccolo-base;
		border-color: $verde-piccolo-base;
		color: $branco;
	}

	&__step-label {
		margin-left: -10px;
		margin-top: 6px;
		line-height: 1.0;
		display: block;

		&--muted {
			color: $cinza-6;
		}

		&--active small {
			color: $cinza-9;
			font-weight: 600;
		}
	}
	
	&__edge {
		min-width: 30px;
		min-height: 30px;
	}
	
	&__divider--default,
	&__divider--in-progress,
	&__divider--completed {
		height: 1px;
		width: 100%;
	}
	
	&__divider--default {
		background-color: $cinza-4;
	}
	
	&__divider--in-progress {
		background: linear-gradient(90deg, #43E4CC 0%, $cinza-4 67.57%);
	}
	
	&__divider--completed {
		background: $verde-piccolo-base;
	}

	&__vertical-divider--default,
	&__vertical-divider--in-progress,
	&__vertical-divider--completed {
		height: 30px;
		width: 1px;
	}

	&__vertical-divider--default {
		background-color: $cinza-4;
	}
	
	&__vertical-divider--in-progress {
		background: linear-gradient(180deg, #43E4CC 0%, $cinza-4 67.57%);
	}
	
	&__vertical-divider--completed {
		background: $verde-piccolo-base;
	}
}

.fs-14 {
	font-size: 14px;
}

.cursor-pointer {
	cursor: pointer;
}

.label-max-width {
	max-width: 70px;
}

.ml-n-1px {
	margin-left: -1px;
}
</style>
