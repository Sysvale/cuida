import FilterSelect from "../../components/FilterSelect.vue";

const Template = (args) => ({
  components: { CdsFilterSelect: FilterSelect },
  setup() {
    return { args };
  },
  data() {
    return {
      value: {
        value: "",
        id: "",
      },
    };
  },
  template: /*html*/ `
		<cds-filter-select
			v-bind="args" 
			v-model="value"
		/>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.value);
  },
});

const value = {
  value: "",
  id: "",
};

const options = [
  {
    value: "Breaking Bad",
    id: "1",
  },
  {
    value: "Game of Thrones ",
    id: "2",
  },
  {
    value: "The Umbrella Academy",
    id: "3",
  },
  {
    value: "Fringe",
    id: "4",
  },
  {
    value: "Breaking Bad",
    id: "5",
  },
  {
    value: "Game of Thrones ",
    id: "6",
  },
  {
    value: "Dark",
    id: "7",
  },
  {
    value:
      "👀 Borat: o segundo melhor repórter do glorioso país Cazaquistão viaja à América",
    id: "8",
  },
  {
    value: "The Office",
    id: "9",
  },
  {
    value: "Black Mirror",
    id: "10",
  },
  {
    value: "Westworld ",
    id: "11",
  },
  {
    value: "Avatar: A Lenda de Aang",
    id: "12",
  },
  {
    value: "The Boys",
    id: "13",
  },
  {
    value: "Vikings",
    id: "14",
  },
  {
    value: "Arcane",
    id: "15",
  },
];

export default {
  title: "Componentes/Forms/FilterSelect",
  component: FilterSelect,

  argTypes: {
    width: {
      control: {
        type: "select",
        options: ["thin", "default", "wide"],
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

        code: `<cds-filter-select
	:value="value"
	:options="options"
	width="wide"
	label="Séries"
	placeholder="Selecione uma das séries"
	required
/>`,
      },
    },
  },
};

export const Select = {
  render: Template.bind({}),
  name: "Select",

  args: {
    options,
    width: "wide",
    id: "idzera",
    label: "Séries",
    placeholder: "Selecione uma das séries",
  },
};
