import Multiselect from "../../components/Multiselect.vue";

const Template = (args) => ({
  components: { CdsMultiselect: Multiselect },
  setup() {
    return { args };
  },
  data() {
    return {
      value: [{ title: "Naruto" }, { title: "Pokemon" }],
    };
  },
  template: /*html*/ `
		<cds-multiselect
			v-bind="args"
			v-model="value"
		/>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

const options = [
  { title: "Avengers" },
  { title: "Naruto" },
  { title: "X-men" },
  { title: "The Simpsons" },
  { title: "Bananas de pijamas" },
  { title: "Pokemon" },
  { title: "Digimon" },
  { title: "Megamente" },
];

export default {
  title: "Componentes/Forms/Multiselect",
  component: Multiselect,

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
          "dark",
        ],
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

        code: `<cds-multiselect
	:options="options"
	v-model="value"
	label="title"
	trackBy="title"
/>`,
      },
    },
  },
};

export const Multiselect = {
  render: Template.bind({}),
  name: "Multiselect",

  args: {
    options,
    label: "Séries",
    optionsField: "title",
    trackBy: "title",
    variant: "green",
  },
};
