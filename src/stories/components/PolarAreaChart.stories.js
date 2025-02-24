import PolarAreaChart from "../../components/PolarAreaChart.vue";

const Template = (args) => ({
  components: { CdsPolarAreaChart: PolarAreaChart },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px; height: 300px">
			<cds-polar-area-chart
				v-bind="args"
			/>
		</div>
	`,
});

export default {
  title: "Componentes/Charts/PolarAreaChart",
  component: PolarAreaChart,

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

        code: `<cds-polar-area-chart
	:data="chartData"
	:variant="variant"
	:labels="chartLabels"
	:is-visible-point-names="isVisiblePointNames"
/>`,
      },
    },
  },
};

export const PolarAreaChart = {
  render: Template.bind({}),
  name: "PolarAreaChart",

  args: {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    variant: "green",
    isVisiblePointNames: true,

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
