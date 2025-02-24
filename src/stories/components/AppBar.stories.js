import AppBar from "../../components/AppBar.vue";
import Icon from "../../components/Icon.vue";

const Template = (args) => ({
  components: { CdsAppBar: AppBar, CdsIcon: Icon },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-app-bar
			v-bind="args"
			@settings-click="logClick"
			@help-click="logClick"
			@notification-click="logClick"
			@avatar-click="logClick"
			@app-switcher-click="logClick"
		>
			<template #app-info>
				<div>
					<cds-icon
						height="24"
						width="24"
						light
						name="calendar-outline"
					/>
					<p class="app-name">
						Central de marcação
					</p>
				</div>
			</template>
            <template #dropdown-content>
				Conteúdo do dropdown
			</template>
		</cds-app-bar>
	`,
  methods: {
    logClick(element) {
      console.info("%clogAction: ", "color: #2C70CD;", element);
    },
  },
});

export default {
  title: "Componentes/Estrutural/AppBar",
  component: AppBar,

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
<cds-app-bar
	:csBrand="true"
	:sysvaleBrand="false"
	:appSwitcher="true"
	:help="true"
	:settings="true"
	userName="Rafael Dias"
	userDescription="Administrador"
	@settings-click="logClick"
	@help-click="logClick"
	@avatar-click="logClick"
	@app-switcher-click="logClick"
>
	<template #app-info>
		<div class="app-switcher">
			<cds-icon
				height="24"
				width="24"
				light
				name="calendar-outline"
			/>
			<p class="app-name">
				Central de marcação
			</p>
		</div>
	</template>
	<template #dropdown-content>
			Conteúdo do dropdown
	</template>
</cds-app-bar>`,
      },
    },
  },
};

export const AppBar = {
  render: Template.bind({}),
  name: "AppBar",

  args: {
    csBrand: true,
    sysvaleBrand: false,
    hideAppSwitcher: true,
    hideHelp: true,
    hideSettings: true,
    userName: "Rafael Dias",
    userDescription: "Administrador",
  },
};
