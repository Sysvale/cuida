import PieChart from "../../components/PieChart.vue";

const Template = (args) => ({
  components: { CdsPieChart: PieChart },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px; height: 300px">
			<cds-pie-chart
				v-bind="args"
			/>
		</div>
	`,
});

export default {
  title: "Componentes/Charts/PieChart",
  component: PieChart,

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

        code: `<cds-pie-chart
	:data="chartData"
	:variant="variant"
	:labels="chartLabels"
/>`,
      },
    },
  },
};

export const PieChart = {
  render: Template.bind({}),
  name: "PieChart",

  args: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    colors: ["teal", "violet", "amber", "blue", "red"],
    variant: "green",

    data: [
      {
        name: "Ecocardiograma",

        datasets: [
          {
            label: "Exames realizados",
            data: [120, 220, 180, 320, 150],
          },
        ],
      },
    ],
  },
};
