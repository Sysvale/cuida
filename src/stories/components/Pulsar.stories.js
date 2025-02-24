import Pulsar from "../../components/Pulsar.vue";

const Template = (args) => ({
  components: { CdsPulsar: Pulsar },
  setup() {
    return { args };
  },
  template: /*html*/ `
			<div id="pulsar-target" style="width: fit-content;">Pulsar target</div>
			<cds-pulsar
				v-bind="args"
				targetId="pulsar-target"
			>
			</cds-pulsar>
	`,
  methods: {
    logClickableClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Notificação/Pulsar",
  component: Pulsar,

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
        ],
      },
    },

    position: {
      control: {
        type: "select",

        options: [
          "top-start",
          "top",
          "top-end",
          "right-start",
          "right",
          "right-end",
          "bottom-end",
          "bottom",
          "bottom-start",
          "left-end",
          "left",
          "left-start",
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

        code: `<cds-tooltip
	text="Texto do tooltip"
>
	Tooltip trigger
</cds-tooltip>`,
      },
    },
  },
};

export const Pulsar = {
  render: Template.bind({}),
  name: "Pulsar",

  args: {
    variant: "green",
    position: "top-end",
  },
};
