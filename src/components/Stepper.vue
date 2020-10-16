<template>
	<div class="stepper d-flex justify-content-between">
		<div class="w-50">
			<div class="stepper__edge d-flex align-items-center">
				<div class="stepper__divider--default" />
			</div>
		</div>
		<div
			v-for="(step, index) in steps"
			:key="index"
			:class="index !== steps.length - 1 ? 'w-100' : ''"
		>
			<div
				class="d-flex align-items-center"
				:id="`step-${index + 1}`"
				@click="changeStep(index)"
			>
				<div
					class="d-flex justify-content-center align-items-center cursor-pointer"
					:class="circleStyle(step)"
				>
					<span
						v-if="!step.concluded"
						class="fs-14"
					>
						{{ index + 1 }}
					</span>
					<check-icon
						v-else
						size="1x"
					/>
				</div>

				<div :class="dividerStyle(index)" />
			</div>
			<div
				class="stepper__step-label mt-2"
				:class="!step.active ? 'stepper__step-label--muted' : ''"
			>
				<small>{{ step.label }}</small>
			</div>
		</div>
		<div class="w-50">
			<div class="d-flex align-items-center stepper__edge">
				<div class="stepper__divider--default" />
			</div>
		</div>
	</div>
</template>
<script>
import { CheckIcon } from 'vue-feather-icons'

export default {
	components: {
		CheckIcon,
	},

	props: {
		steps: {
			type: Array,
			default: () => [],
			required: true,
			description:
				`Um objeto com as propriedades 'label' e 'concluded',
				'label' é o texto que descreve o passo,
				e 'concluded' é o status (booleano) do passo.`,
		},
		vertical: {
			type: Boolean,
			default: false,
			required: false,
		}
	},

	methods: {
		circleStyle(step) {
			if (step.concluded) {
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

			this.$emit('step_changed', index, this.steps[index]);
		},

		dividerStyle(index) {
			const lastStep = index === this.steps.length - 1;
			const firstStep = index === 0;
			const prevStep = index - 1;
			const nextStep = index + 1;
			console.log('hello');

			if (!lastStep
				&& this.steps[index].concluded
				&& this.steps[nextStep].concluded
			) {
				return 'stepper__divider--completed';
			}
			
			if((!lastStep
				&& index > 0
				&& this.steps[index].concluded
				&& this.steps[prevStep].concluded)
				|| (!lastStep
				&& firstStep
				&& this.steps[index].concluded)
			) {
				return 'stepper__divider--in-progress';
			}

			return 'stepper__divider--default';
		},
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/sass/app.scss';

.stepper {
	&__step--active,
	&__step--muted,
	&__step--completed {
		min-width: 30px;
		min-height: 30px;
		border-radius: 50px;
		border: 1px;
		border-style: solid;
	}
	
	&__step--active {
		color: $cinza-6;
		border-color: $verde-piccolo-base;
	}

	&__step--muted {
		color: $cinza-5;
		border-color: $cinza-5;
	}
	
	&__step--completed { 
		background-color: $verde-piccolo-base;
		border-color: $verde-piccolo-base;
		color: $branco;
	}

	&__step-label {
		max-width: 70px;
		margin-left: -10px;
		line-height: 1.0;
		display: block;

		&--muted {
			color: $cinza-6;
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
}

.fs-14 {
	font-size: 14px;
}

.cursor-pointer {
	cursor: pointer;
}
</style>
