<template>
    <div class="d-flex justify-content-between">
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
                        class="not-concluded-step-text-color fs-14"
                    >
                        {{ index + 1 }}
                    </span>
                    <check-icon
                        v-else
                        size="1x"
                        class="concluded-step"
                    />
                </div>

                <div 
                    v-if="
                        index !== steps.length - 1 &&
                        steps[index].concluded &&
                        steps[index + 1].concluded
                    "
                    class="concluded-stepper-divider"
                />
                <div 
                    v-else-if="
                        (index !== steps.length - 1 &&
                        index > 0 &&
                        steps[index].concluded &&
                        steps[index - 1].concluded) ||
                        (index !== steps.length - 1 &&
                        index === 0 &&
                        steps[index].concluded)
                    "
                    class="in-progress-stepper-divider"
                />
                <div 
                    v-else-if="index !== steps.length - 1"
                    class="common-stepper-divider"
                />

            </div>
            <div
                class="label-container mt-2"
                :class="!step.active ? 'not-active-step-label' : ''"
            >
                <small>{{ step.label }}</small>
            </div>
        </div>
    </div>
</template>
<script>
import { CheckIcon } from 'vue-feather-icons'

export default {
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

    components: {
        CheckIcon,
    },

    methods: {
        circleStyle(step) {
            let style = '';

            if (step.concluded) {
                style += 'concluded-step';
            } 
            
            if (step.active){
                style += 'active-step';
            }

            if (!step.active && !step.concluded) {
                style += ' not-active-step';
            }

            return style;
        },

        changeStep(index) {
            this.steps[index].active = true;
            this.steps.forEach((item, i) => {
                item.active = i === index ? true : false;
            });

            this.$emit('step_changed', index, this.steps[index]);
        }
    }
}
</script>

<style>
    .active-step, .not-active-step, .concluded-step {
        border-radius: 50px;
        min-width: 30px;
        min-height: 30px;
        border: 1.5px;
        border-style: solid;
    }

    .active-step {
        border-color: #00CBAD;
    }

    .concluded-step { 
        background-color: #00CBAD;
        border-color: #00CBAD;
        width: 30px;
        height: 30px;
    }

    .not-active-step {
        color: #BFC2C5;
        border-color: #BFC2C5;
    }

    .not-concluded-step-text-color {
        color: #00CBAD;
    }

    .common-stepper-divider,
    .in-progress-stepper-divider,
    .concluded-stepper-divider {
        height: 3px;
        width: 100%;
    }

    .common-stepper-divider {
        background-color: #BFC2C5;
    }

    .in-progress-stepper-divider {
        background: linear-gradient(90deg, #43E4CC 0%, #BFC2C5 67.57%);
    }

    .concluded-stepper-divider {
        background: #00CBAD;
    }

    .concluded-step {
        color: #fff;
    }

    .label-container {
        max-width: 70px;
        margin-left: -10px;
        line-height: 1.0;
        display: block;
    }

    .fs-14 {
        font-size: 14px;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .not-active-step-label {
        color: #5d6369;
    }
</style>
