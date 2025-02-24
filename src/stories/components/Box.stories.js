import Box from "../../components/Box.vue";

const Template = (args) => ({
  components: { CdsBox: Box },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="height: 200px">
			<cds-box
				v-bind="args"
			>
				2
			</cds-box>
		</div>
	`,
  methods: {
    logClickableClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Containers/Box",
  component: Box,

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
          "gray",
          "dark",
        ],
      },
    },

    padding: {
      control: {
        type: "range",
        min: 4,
        max: 12,
        step: 1,
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

        code: `<cds-box
	:elevated="false"
>
	2
</cds-box>`,
      },
    },
  },
};

export const Box = {
  render: Template.bind({}),
  name: "Box",

  args: {
    padding: 4,
    fluid: false,
    verticalFluid: false,
    elevated: false,
    variant: "gray",
    overflowVisible: false,
  },
};
