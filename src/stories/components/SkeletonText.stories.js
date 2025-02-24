import SkeletonText from "../../components/SkeletonText.vue";

const Template = (args) => ({
  components: { CdsSkeletonText: SkeletonText },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-skeleton-text
			v-bind="args" 
		/>
	`,
});

export default {
  title: "Componentes/Loaders/SkeletonText",
  component: SkeletonText,

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

        code: `<cds-skeleton-text
	:width="250"
/>`,
      },
    },
  },
};

export const SkeletonText = {
  render: Template.bind({}),
  name: "SkeletonText",

  args: {
    width: "250",
  },
};
