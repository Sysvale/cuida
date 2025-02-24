import Truncate from "../../components/Truncate.vue";

const Template = (args) => ({
  components: { CdsTruncate: Truncate },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-truncate
			v-bind="args"
		>
			Texto longo para testar o truncate
		</cds-truncate>
	`,
  methods: {
    logClickableClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Utils/Truncate",
  component: Truncate,

  argTypes: {
    width: {
      control: {
        type: "range",
        min: 10,
        max: 250,
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

        code: `<cds-truncate
	width="80"
>
	Texto longo para testar o truncate
</cds-truncate>`,
      },
    },
  },
};

export const Truncate = {
  render: Template.bind({}),
  name: "Truncate",

  args: {
    width: 80,
  },
};
