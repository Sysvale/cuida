import BarChart from "../../components/BarChart.vue";

const Template = (args) => ({
  components: { CdsBarChart: BarChart },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px; height: 300px">
			<cds-bar-chart
				v-bind="args"
			/>
		</div>
	`,
});

export default {
  title: "Componentes/Charts/BarChart",
  component: BarChart,

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

        code: `<cds-bar-chart
	:data="chartData"
	:variant="variant"
	:labels="chartLabels"
	:bar-width="barWidth"
/>`,
      },
    },
  },
};

export const BarChart = {
  render: Template.bind({}),
  name: "BarChart",

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
          {
            label: "Pendente",
            data: [200, 180, 250, 190, 280],
          },
          {
            label: "Não realizado",
            data: [38, 84, 120, 90, 185],
          },
        ],
      },
      {
        name: "Raio-X",

        datasets: [
          {
            label: "Realizado",
            data: [120, 220, 180, 320, 150],
          },
          {
            label: "Pendente",
            data: [98, 145, 160, 190, 175],
          },
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
            label: "Realizado",
            data: [55, 40, 33, 90, 120],
          },
          {
            label: "Pendente",
            data: [25, 30, 90, 45, 20],
          },
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
