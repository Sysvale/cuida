import Dropdown from "../../components/Dropdown.vue";

const Template = (args) => ({
  components: { CdsDropdown: Dropdown },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-dropdown
			v-bind="$props"
		>
			<p>Slot do dropdown do Dropdown</p>
		</cds-dropdown>`,
});

export default {
  title: "Componentes/Display/Dropdown",
  component: Dropdown,

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

        code: `<cds-dropdown
	label="Idade"
	content="0 a 120 anos"
	@click="isActive = !isActive"
/>`,
      },
    },
  },
};

export const Dropdown = {
  render: Template.bind({}),
  name: "Dropdown",

  args: {
    label: "Idade",
    content: "0 a 120 anos",
  },
};
