import Flexbox from "../../components/Flexbox.vue";
import Spacer from "../../components/Spacer.vue";

const Template = (args) => ({
  components: { CdsFlexbox: Flexbox },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-flexbox
			v-bind="args"
			class="grid-background"
		>
			<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 1 </div>
			<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 2 </div>
			<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 3 </div>
			<div style="height: 50px; width: 300px" class="docs-grid-cell"> FlexItem 4 </div>
		</cds-flexbox>
	`,
  methods: {
    logClickableClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Containers/Flexbox",
  component: Flexbox,

  argTypes: {
    direction: {
      control: {
        type: "select",
        options: ["row", "row-reverse", "column", "column-reverse"],
      },
    },

    wrap: {
      control: {
        type: "select",
        options: ["nowrap", "wrap", "wrap-reverse"],
      },
    },

    justify: {
      control: {
        type: "select",
        options: [
          "start",
          "end",
          "center",
          "space-between",
          "space-around",
          "space-evenly",
        ],
      },
    },

    align: {
      control: {
        type: "select",
        options: ["stretch", "start", "center", "end", "baseline"],
      },
    },

    tag: {
      control: {
        type: "select",
        options: [
          "div",
          "span",
          "main",
          "footer",
          "form",
          "header",
          "aside",
          "ul",
          "li",
        ],
      },
    },

    gap: {
      control: {
        type: "range",
        min: 0,
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

export const Flexbox = {
  render: Template.bind({}),
  name: "Flexbox",

  args: {
    direction: "row",
    gap: 1,
    wrap: "wrap",
    justify: "start",
    align: "start",
    tag: "div",
  },
};
