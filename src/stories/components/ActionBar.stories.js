import ActionBar from "../../components/ActionBar.vue";
import Button from "../../components/Button.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      showActionBar: false,
    };
  },
  components: { CdsActionBar: ActionBar, CdsButton: Button },
  template: /*html*/ `
		<div>
			<cds-button
				id="trigger-popover"
				@click="togglePopover"
			>
				Click
			</cds-button>
			<cds-action-bar
				v-bind="args"
				:show="showActionBar"
				@click="logAction"
				@close="logClose"
			>
				<template #description>
					8 itens selecionados
				</template>
			</cds-action-bar>
		</div>
	`,
  methods: {
    logAction(btn) {
      console.info("logAction: ", btn);
    },
    logClose(event) {
      this.showActionBar = false;
      console.info("logClose: ", event);
    },
    togglePopover() {
      this.showActionBar = true;
    },
  },
});

export default {
  title: "Componentes/Display/ActionBar",
  component: ActionBar,

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
<cds-action-bar
	v-bind="args"
	:show="showActionBar"
	@click="logAction"
	@close="logClose"
>
	<template #description>
		8 itens selecionados
	</template>
</cds-action-bar>`,
      },
    },
  },
};

export const ActionBar = {
  render: Template.bind({}),
  name: "Action Bar",

  args: {
    actions: ["Button1", "Button2", "Button3"],
  },
};
