import Link from "../../components/Link.vue";

const Template = (args) => ({
  components: { CdsLink: Link },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-link
			v-bind="args"
		/>
	`,
});

export default {
  title: "Componentes/Navegação/Link",
  component: Link,

  argTypes: {
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

        code: `<cds-link
	href="https://github.com/Sysvale/cuida"
	text="Cuida"
/>`,
      },
    },
  },
};

export const Link = {
  render: Template.bind({}),
  name: "Link",

  args: {
    href: "https://github.com/Sysvale/cuida",
    text: "Cuida",
  },
};
