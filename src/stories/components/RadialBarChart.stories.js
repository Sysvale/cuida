import RadialBarChart from "../../components/RadialBarChart.vue";

const Template = (args) => ({
  components: { CdsRadialBarChart: RadialBarChart },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px; height: 340px">
			<div style="height: 280px">
				<cds-radial-bar-chart
					v-bind="args"
					@chart-click="logChartClick"
				/>
			</div>
		</div>
	`,
  methods: {
    logChartClick(e) {
      console.info("logDonutChartClick: ", e);
    },
  },
});

export default {
  title: "Componentes/Charts/RadialBarChart",
  component: RadialBarChart,

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

export const RadialBarChart = {
  render: Template.bind({}),
  name: "RadialBarChart",

  args: {
    theme: "blue",

    data: [
      {
        datasets: [
          {
            label: "Janeiro",
            data: [3000],
          },
        ],
      },
      {
        datasets: [
          {
            label: "Fevereiro",
            data: [2000],
          },
        ],
      },
      {
        datasets: [
          {
            label: "Março",
            data: [1500],
          },
        ],
      },
    ],
  },
};
