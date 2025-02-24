import ActionsList from "../../components/ActionsList.vue";

const Template = (args) => ({
  components: { CdsActionsList: ActionsList },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-actions-list
			v-bind="args"
			@actionClicked="logActionClick"
			@expanded="logExpansion"
		>
			<template
				#action="{ list }"
			>
				{{ list.title }}
			</template>
		</cds-actions-list>
	`,
  methods: {
    logActionClick(action) {
      console.info("logActionClick: ", action);
    },
    logExpansion(event) {
      console.info("isExpanded: ", event);
    },
  },
});

const actions = [
  {
    title: "Icon1",
    disabled: true,
  },
  {
    title: "Icon2",
  },
  {
    title: "Icon3",
  },
  {
    title: "Icon4",
  },
];

export default {
  title: "Componentes/Display/ActionsList",
  component: ActionsList,

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
<cds-actions-list
	:actions="actions"
	:numberOfExpandedActions="2"
>
	<template
		#action="{ list }"
	>
		{{ list.title }}
	</template>
</cds-actions-list>`,
      },
    },
  },
};

export const ActionsList = {
  render: Template.bind({}),
  name: "Actions list",

  args: {
    actions: actions,
    numberOfExpandedActions: 2,
  },
};
