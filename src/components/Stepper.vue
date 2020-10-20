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
				:class="labelStyle(step)"
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
					:class="circleStyle(step)"
				>
					<check-icon
						v-if="step.completed"
						size="1x"
					/>
					<x-icon
						v-else-if="step.error"
						size="1x"
					/>
					<img
						v-else-if="step.inProcessing"
						class="ml-n-1px"
						src="../assets/images/in-processing.svg"
					/>
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
				:class="labelStyle(step)"
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
import { CheckIcon, XIcon } from 'vue-feather-icons'

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
				`Um objeto com as propriedades 'label', 'active', 'inProcessing',
				'error' e 'completed', 'label' é o texto que descreve o passo,
				e as demais props são booleanas e representam o status do passo.`,
		},
		vertical: {
			type: Boolean,
			default: false,
			required: false,
		}
	},

	methods: {
		circleStyle(step) {
			if (step.inProcessing) {
				return 'stepper__step--in-processing';
			}

			if (step.error) {
				return 'stepper__step--error';
			}

			if (step.completed) {
				return 'stepper__step--completed';
			}
			
			if (step.active){
				return 'stepper__step--active';
			}

			return ' stepper__step--muted';
		},

		changeStep(index) {
			this.steps[index].active = true;
			this.steps.forEach((item, i) => {
				item.active = i === index ? true : false;
			});

			this.$emit('stepChanged', index, this.steps[index]);
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

		labelStyle(step) {
			let classes = '';

			classes += step.active ? 'stepper__step-label--active' : 'stepper__step-label--muted';
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
