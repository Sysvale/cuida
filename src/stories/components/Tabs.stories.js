import Tabs from "../../components/Tabs.vue";

const Template = (args) => ({
  components: { CdsTabs: Tabs },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="background-color: #F8F9FA; padding: 16px; border-radius: 4px;">
			<cds-tabs
				v-bind="args"
				@tabs-change="logTabsChange"
			>
				<template #room-42>
					Sala de Psicologia
				</template>
				<template #room-51>
					Sala de Fisioterapia
				</template>
				<template #room-13>
					Sala de Otorrinolaringologista
				</template>
			</cds-tabs>
	</div>
	`,
  methods: {
    logTabsChange(event) {
      console.info("%ctabs-change: ", "color: #2C70CD;", event);
    },
  },
});

const items = [
  {
    title: "Psicologia",
    name: "room-42",
  },
  {
    title: "Fisioterapia",
    name: "room-51",
  },
  {
    title: "Otorrinolaringologista",
    name: "room-13",
  },
];

export default {
  title: "Componentes/Navegação/Tabs",
  component: Tabs,

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

        code: `<cds-tabs
	:tabs="items"
	:activeTab="items[1]"
>
	<template #room-42>
		Sala de Psicologia
	</template>
	<template #room-51>
		Sala de Fisioterapia
	</template>
	<template #room-13>
		Sala de Otorrinolaringologista
	</template>
</cds-tabs>`,
      },
    },
  },
};

export const Tabs = {
  render: Template.bind({}),
  name: "Tabs",

  args: {
    tabs: items,
    activeTab: items[1],
  },
};
