import Chevron from "../../components/Chevron.vue";

const Template = (args) => ({
  components: { CdsChevron: Chevron },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div
			style="width: 15px;
			height: 15px;
			position: absolute;
			top: 35px;
			left: 40px;"
		>
			<cds-chevron
				v-bind="args" 
			/>
		</div>`,
});

export default {
  title: "Componentes/Forms/Chevron",
  component: Chevron,

  argTypes: {
    direction: {
      control: {
        type: "select",
        options: ["top", "right", "bottom", "left"],
      },
    },

    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
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
        code: `<cds-chevron />`,
      },
    },
  },
};

export const Chevron = {
  render: Template.bind({}),
  name: "Chevron",
};
