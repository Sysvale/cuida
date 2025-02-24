import Tooltip from "../../components/Tooltip.vue";

const Template = (args) => ({
  components: { CdsTooltip: Tooltip },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<cds-tooltip
				v-bind="args"
			>
				Tooltip trigger
			</cds-tooltip>
		</div>
	`,
  methods: {
    logClickableClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Display/Tooltip",
  component: Tooltip,

  argTypes: {
    position: {
      control: {
        type: "select",
        options: ["top", "right", "bottom", "left"],
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

export const Tooltip = {
  render: Template.bind({}),
  name: "Tooltip",

  args: {
    text: "Texto do tooltip",
  },
};
