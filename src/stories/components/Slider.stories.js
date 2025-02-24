import Slider from "../../components/Slider.vue";

const Template = (args) => ({
  components: { CdsSlider: Slider },
  setup() {
    return { args };
  },
  data() {
    return {
      value: [20, 60],
    };
  },
  template: /*html*/ `
		<cds-slider
			v-bind="args"
			v-model="value"
		/>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

export default {
  title: "Componentes/Forms/Slider",
  component: Slider,

  argTypes: {
    variant: {
      control: {
        type: "select",

        options: [
          "green",
          "teal",
          "turquoise",
          "blue",
          "indigo",
          "violet",
          "pink",
          "red",
          "orange",
          "amber",
          "dark",
        ],
      },
    },
  },

  /*html*/
  parameters: {
    viewMode: "docs",

    previewTabs: {
      canvas: {
        hidden: true,
      },
    },

    docs: {
      source: {
        language: "html",
        format: true,

        code: `<cds-slider
	:min="0"
	:max="100"
	:value="value"
/>`,
      },
    },
  },
};

export const Slider = {
  render: Template.bind({}),
  name: "Slider",

  args: {
    min: 0,
    max: 100,
  },
};
