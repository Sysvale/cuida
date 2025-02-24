import DonutChart from "../../components/DonutChart.vue";

const Template = (args) => ({
  components: { CdsDonutChart: DonutChart },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px; height: 300px">
			<cds-donut-chart
				v-bind="args"
				@chart-click="logChartClick"
			/>
		</div>
	`,
  methods: {
    logChartClick(e) {
      console.info("logDonutChartClick: ", e);
    },
  },
});

export default {
  title: "Componentes/Charts/DonutChart",
  component: DonutChart,

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

        code: `<cds-donut-chart
	:data="chartData"
	:variant="variant"
	:labels="chartLabels"
/>`,
      },
    },
  },
};

export const DonutChart1 = {
  render: Template.bind({}),
  name: "DonutChart1",

  args: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    colors: ["teal", "violet", "amber", "blue", "red"],

    data: [
      {
        name: "Ecocardiograma",

        datasets: [
          {
            label: "Exames realizados",
            data: [120, 220, 180, 20, 150],
          },
        ],
      },
    ],
  },
};

export const DonutChart2 = {
  render: Template.bind({}),
  name: "DonutChart2",

  args: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    theme: "blue",

    data: [
      {
        name: "Ecocardiograma",

        datasets: [
          {
            label: "Exames realizados",
            data: [120, 220, 180, 20, 150],
          },
        ],
      },
    ],
  },
};

export const DonutChart3 = {
  render: Template.bind({}),
  name: "DonutChart3",

  args: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    variant: "green",

    data: [
      {
        name: "Ecocardiograma",

        datasets: [
          {
            label: "Exames realizados",
            data: [120, 220, 180, 20, 150],
          },
        ],
      },
    ],
  },
};
