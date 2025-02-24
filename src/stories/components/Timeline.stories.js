import Timeline from "../../components/Timeline.vue";
import TimelineItem from "../../components/TimelineItem.vue";

const Template = (args) => ({
  components: { CdsTimeline: Timeline, CdsTimelineItem: TimelineItem },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-timeline
			v-bind="args" 
		>
			<cds-timeline-item variant="blue" loading>
				<template #title>
					Item 1
				</template>
				<template #content>
					Desta maneira, a determinação clara de objetivos estimula
					a padronização das novas proposições.
				</template>
			</cds-timeline-item> 
			<cds-timeline-item variant="blue">
				<template #title>
					Item 2
				</template>
				<template #content>
					O que temos que ter sempre em mente é que o consenso sobre
					a necessidade de qualificação assume importantes posições
					no estabelecimento das regras de conduta normativas.
				</template>
			</cds-timeline-item>
			<cds-timeline-item variant="blue">
				<template #title>
					Item 3
				</template>
				<template #content>
					A prática cotidiana prova que a complexidade dos estudos
					efetuados estimula a padronização dos paradigmas corporativos.
				</template>
			</cds-timeline-item>
		</cds-timeline>
	`,
});

export default {
  title: "Componentes/Display/Timeline",
  component: Timeline,

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

        code: `<cds-timeline
	:reverse="false"
>
	<cds-timeline-item variant="blue" loading>
		<template #title>
			Item 1
		</template>
		<template #content>
			Desta maneira, a determinação clara de objetivos estimula
			a padronização das novas proposições.
		</template>
	</cds-timeline-item> 
	<cds-timeline-item variant="blue">
		<template #title>
			Item 2
		</template>
		<template #content>
			O que temos que ter sempre em mente é que o consenso sobre
			a necessidade de qualificação assume importantes posições
			no estabelecimento das regras de conduta normativas.
		</template>
	</cds-timeline-item>
	<cds-timeline-item variant="blue">
		<template #title>
			Item 3
		</template>
		<template #content>
			A prática cotidiana prova que a complexidade dos estudos
			efetuados estimula a padronização dos paradigmas corporativos.
		</template>
	</cds-timeline-item>
</cds-timeline>`,
      },
    },
  },
};

export const Timeline = {
  render: Template.bind({}),
  name: "Timeline",

  args: {
    reverse: false,
  },
};
