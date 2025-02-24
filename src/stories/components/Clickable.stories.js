import Clickable from "../../components/Clickable.vue";

const Template = (args) => ({
  components: { CdsClickable: Clickable },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-clickable
			v-bind="args"
			@click="logClickableClick"
		>
			Texto clicável
		</cds-clickable>
	`,
  methods: {
    logClickableClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Utils/Clickable",
  component: Clickable,

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

        code: `<cds-clickable
	clickable
	@click="logClickableClick"
>
	Texto clicável
</cds-clickable>`,
      },
    },
  },
};

export const Clickable = {
  render: Template.bind({}),
  name: "Clickable",

  args: {
    clickable: true,
  },
};
