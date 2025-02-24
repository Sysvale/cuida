import Skeleton from "../../components/Skeleton.vue";

const Template = (args) => ({
  components: { CdsSkeleton: Skeleton },
  setup() {
    return { args };
  },
  template: /*html*/ `
	<div style="height: 100px">
		<cds-skeleton
			v-bind="args"
		/>
	</div>`,
});

export default {
  title: "Componentes/Loaders/Skeleton",
  component: Skeleton,

  argTypes: {
    shape: {
      control: {
        type: "select",
        options: ["circle", "square"],
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

        code: `
					<cds-skeleton
						:width="100"
					/>
				`,
      },
    },
  },
};

export const Skeleton = {
  render: Template.bind({}),
  name: "Skeleton",

  args: {
    width: "100",
  },
};
