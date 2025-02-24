import StackedBarChart from "../../components/StackedBarChart.vue";

const Template = (args) => ({
  components: { CdsStackedBarChart: StackedBarChart },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="background-color: #FCFCFC; padding: 16px; border-radius: 4px; height: 500px">
			<cds-stacked-bar-chart
				v-bind="args"
			/>
		</div>
	`,
});

export default {
  title: "Componentes/Charts/StackedBarChart",
  component: StackedBarChart,

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

    theme: {
      control: {
        type: "select",
        options: ["blue", "indigo"],
      },
    },

    barWidth: {
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
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

        code: `<cds-stacked-bar-chart
	:data="chartData"
	:variant="variant"
	:labels="chartLabels"
	:bar-width="barWidth"
/>`,
      },
    },
  },
};

export const StackedBarChart = {
  render: Template.bind({}),
  name: "StackedBarChart",

  args: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    variant: "green",

    data: [
      {
        name: "Ecocardiograma",

        datasets: [
          {
            label: "Realizado",
            data: [50, 50, 50, 50, 50],
          },
        ],
      },
      {
        name: "Raio-X",

        datasets: [
          {
            label: "Não realizado",
            data: [49, 84, 120, 78, 130],
          },
        ],
      },
      {
        name: "Tomografia",

        datasets: [
          {
            label: "Não realizado",
            data: [38, 84, 120, 90, 45],
          },
        ],
      },
    ],

    barWidth: 1,
  },
};

export const StackedBarChart2 = {
  render: Template.bind({}),
  name: "StackedBarChart2",

  args: {
    labels: ["0-5", "6-15", "16-24", "25-40", "41-64", "+65"],

    data: [
      {
        name: "Designers",

        datasets: [
          {
            label: "Designers",
            data: [49, 84, 120, 78, 130, 10],
            variant: "violet",
          },
        ],
      },
      {
        name: "Desenvolvedores",

        datasets: [
          {
            label: "Desenvolvedores",
            data: [79, 14, 10, 82, 30, 5],
            variant: "blue",
          },
        ],
      },
      {
        name: "QA",

        datasets: [
          {
            label: "QA",
            data: [10, 50, 30, 60, 50, 20],
            variant: "indigo",
          },
        ],
      },
    ],

    barWidth: 1,
  },
};
