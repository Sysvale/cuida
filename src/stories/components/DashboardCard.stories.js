import DashboardCard from "../../components/DashboardCard.vue";
import Badge from "../../components/Badge.vue";

const Template = (args) => ({
  components: {
    CdsDashboardCard: DashboardCard,
    CdsBadge: Badge,
  },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-dashboard-card
			v-bind="args"
			@action-button-click="handleActionClick"
		>
			<template #title-slot>
				<bold>45</bold>
				<span style="margin-left: 8px; font-size: 13.5px; font-weight: 500;">gestantes</span>
			</template>
			<template #status-slot>
				<cds-badge variant="red">Alerta</cds-badge>
			</template>
			<template #description-slot>
				Não realizam consulta há mais de 30 dias
			</template>
		</cds-dashboard-card>
	`,
  methods: {
    handleActionClick() {
      console.info("clicked");
    },
  },
});

export default {
  title: "Componentes/Containers/DashboardCard",
  component: DashboardCard,

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

        code: `
<cds-dashboard-card
	:showAction="true"
	:action="Ver lista"
	@action-button-click="handleActionClick"
>
	<template #title-slot>
		<bold>45</bold>
		<span style="margin-left: 8px; font-size: 13.5px; font-weight: 500;">gestantes</span>
	</template>
	<template #status-slot>
		<cds-badge variant="red">Alerta</cds-badge>
	</template>
	<template #description-slot>
		Não realizam consulta há mais de 30 dias
	</template>
</cds-dashboard-card>`,
      },
    },
  },
};

export const DashboardCard = {
  render: Template.bind({}),
  name: "DashboardCard",

  args: {
    showAction: true,
    action: "Ver lista",
  },
};
