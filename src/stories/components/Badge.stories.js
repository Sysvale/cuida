import Badge from "../../components/Badge.vue";

const Template = (args) => ({
  components: { CdsBadge: Badge },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-badge
			v-bind="args"
			@click="handleEmit"
		>
			Badge
		</cds-badge>`,
  methods: {
    handleEmit(value) {
      console.info("value: ", value);
    },
  },
});

export default {
  title: "Componentes/Display/Badge",
  component: Badge,

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
          "gray",
          "white",
        ],
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

        code: `<cds-badge
	variant="red"
	size="md"
>
	Badge
</cds-badge>`,
      },
    },
  },
};

export const Badge = {
  render: Template.bind({}),
  name: "Badge",

  args: {
    variant: "red",
  },
};
