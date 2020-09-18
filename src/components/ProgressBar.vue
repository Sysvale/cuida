<template>
    <div
        class="progress-bar-container"
    >
        <span
            v-if="showText"
            class="text-style ser"
        >
            {{ formatedPercentage }}
        </span>
        <div
            class="progress-bar-background"
            :style="backgroundColorStyle"
        >
            <div
                class="progress-indicator"
                :style="progressIndicatorStyle"
            />
        </div>
    </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#2EB88D',
      description: 'Defines the color of the progress bar',
      required: false,
    },
    backgroundColor: {
      type: String,
      default: '#DDE2E7',
      description: 'Defines the background color of the progress bar',
      required: false,
    },
    percentage: {
      type: Number,
      default: 0,
      description: 'Defines the width of the progress Bar',
      required: true,
    },
    showText: {
      type: Boolean,
      default: true,
      description: 'Defines if the text will be displayed',
      required: false,
    },
  },

  computed: {
    backgroundColorStyle() {
      return {
        '--backgroundColor': this.backgroundColor,
      };
    },

    formatedPercentage() {
      return `${parseInt(this.percentage * 100, 10)}%`;
    },

    progressIndicatorStyle() {
      return {
        '--width': this.formatedPercentage,
        '--color': this.color,
      };
    },
  },
};
</script>

<style scoped>
.progress-indicator {
    border-radius: 80px;
    height: 7px;
    background-color: var(--color);
    width: var(--width);
}

.progress-bar-background {
    background-color: var(--backgroundColor);
    border-radius: 80px;
    width: 100%;
    height: 7px;
}

.progress-bar-container {
    display: flex;
    align-items: center;
    flex-direction: column;
}

.text-style {
    font-weight: 600;
}
</style>
