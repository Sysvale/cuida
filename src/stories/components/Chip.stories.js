import Chip from "../../components/Chip.vue";

const Template = (args) => ({
  components: { CdsChip: Chip },
  setup() {
    return { args };
  },
  data() {
    return {
      select: false,
    };
  },
  template: /*html*/ `
		<cds-chip
			v-bind="args"
			@click="handleEmit"
		>
				Chip
		</cds-chip>`,
  methods: {
    handleEmit(value) {
      console.info("value: ", value);
    },
  },
});

export default {
  title: "Componentes/Forms/Chip",
  component: Chip,

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
          "dark",
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

        code: `<cds-chip
	v-model="select"
	variant="red"
	size="md"
>
	Chip
</cds-chip>`,
      },
    },
  },
};

export const Chip = {
  render: Template.bind({}),
  name: "Chip",

  args: {
    variant: "red",
  },
};
