import GaugeChart from "../../components/GaugeChart.vue";

const Template = (args) => ({
  components: { CdsGaugeChart: GaugeChart },
  setup() {
    return { args };
  },
  /*html*/
  template: `<cds-gauge-chart
			v-bind="args"
		>
			<template #popover>
				<p style="margin: 0;"><strong>Em atendimento:</strong> 280</p>
				<p style="margin: 0;"><strong>Pendentes:</strong> 60</p>
				<p style="margin: 0;"><strong>Em acompanhamento:</strong> 600</p>
			</template>
		</cds-gauge-chart>`,
});

export default {
  title: "Componentes/Charts/GaugeChart",
  component: GaugeChart,

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

    value: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },

    target: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
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

        code: `<cds-gauge-chart
	variant="green"
	:size="300"
	:value="79.2"
>
	<template #popover>
		<p style="margin: 0;"><strong>Em atendimento:</strong> 280</p>
		<p style="margin: 0;"><strong>Pendentes:</strong> 60</p>
		<p style="margin: 0;"><strong>Em acompanhamento:</strong> 600</p>
	</template>
</cds-gauge-chart>
`,
      },
    },
  },
};

export const GaugeChart = {
  render: Template.bind({}),
  name: "Gauge Chart",

  args: {
    value: 79.2,
    showTarget: false,
    target: 85,
    variant: "green",
    size: 300,
    subtitle: "aptos ao indicador",
  },
};
