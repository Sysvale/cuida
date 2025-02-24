import TimelineItem from "../../components/TimelineItem.vue";

import dedent from "ts-dedent";

const Template = (args) => ({
  components: { CdsTimelineItem: TimelineItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-timeline-item
			v-bind="args"
		>
			<template #opposite>
				24/01/20202
			</template>
			<template #title>
				Denis Ritchie
			</template>
			<template #content>
				Criador da linguagem de programação C
			</template>
		</cds-timeline-item>
	`,
});

export default {
  title: "Componentes/Display/TimelineItem",
  component: TimelineItem,

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

        code: `<cds-timeline-item
	variant="green"
	:loading="false"
	:hollowed="false"
>
	<template #opposite>
		24/01/20202
	</template>
	<template #title>
		Denis Ritchie
	</template>
	<template #content>
		Criador da linguagem de programação C
	</template>
</cds-timeline-item>`,
      },
    },
  },
};

export const TimelineItem = {
  render: Template.bind({}),
  name: "TimelineItem",

  args: {
    variant: "green",
    loading: false,
    hollowed: false,
  },
};
