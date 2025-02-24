import Table from "../../components/Table.vue";

const Template = (args) => ({
  components: { CdsTable: Table },
  setup() {
    return { args };
  },
  data() {
    return {
      selected: [],
    };
  },
  /*html*/
  template: `<cds-table
			v-model="selected"
			v-bind="args"
		/>
		<br>
		`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.selected);
  },
});

const fields = [
  {
    key: "field-1",
    label: "Field 1",
    formatter: (value) => {
      return `${value}a`;
    },
    width: "50%",
  },
  {
    key: "field2",
    label: "Field 2",
    width: "20%",
  },
  {
    key: "field-3",
    label: "Field 3",
  },
  {
    key: "field_4",
    label: "Field 4",
  },
];

const items = [
  {
    "field-1": "2023-10-10",
    field2: "0",
    "field-3": 0,
    field_4: 10298726432,
  },
  {
    "field-1": "2023-10-10",
    field2: "1",
    "field-3": 72,
    field_4: 10298726432,
  },
  {
    "field-1": "2023-10-10",
    field2: "field 2 content b",
    field_3: 60,
    field_4: 10298726432,
  },
];

const fields2 = [
  {
    key: "field-1",
    label: "Field 1",
  },
  "field2",
  "field_3",
];

const items2 = [
  {
    "field-1": "Praesent malesuada urna nisi",
    field2: "field 2 content a",
    field_3: 50,
  },
  {
    "field-1": "quis volutpat erat hendrerit non",
    field2: "field 2 content c",
    field_3: 72,
  },
  {
    "field-1": "Nam vulputate dapibus",
    field2: "field 2 content b",
    field_3: 60,
  },
];

export default {
  title: "Componentes/Display/Table",
  component: Table,

  argTypes: {
    selectionVariant: {
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

        code: `<cds-table
	:fields="fields"
	:items="items"
/>`,
      },
    },
  },
};

export const Table = {
  render: Template.bind({}),
  name: "Table",

  args: {
    fields,
    items,
  },
};
