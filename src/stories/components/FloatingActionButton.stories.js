import FloatingActionButton from "../../components/FloatingActionButton.vue";
import { colorOptions } from "../../utils/constants/colors";

const Template = (args) => ({
  components: { CdsFloatingActionButton: FloatingActionButton },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="position: relative">
			<img
				src="https://images.unsplash.com/photo-1738526787238-96d5352c2ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				style="width: 100%; height: 100%;"
			/>
			<div
				style="position: absolute; bottom: 0; right: 0; margin-bottom: 76px;"
			>
				<cds-floating-action-button
					icon="search-outline"
					size="sm"
					variant="white"
					@main-button-click="console.info('⚡ %cMain button clicked!', 'color: rgb(37, 227, 139);');"
				/>
			</div>
			<cds-floating-action-button
				icon="plus-outline"
				size="md"
				variant="green"
				@main-button-click="console.info('⚡ %cMain button clicked!', 'color: rgb(37, 227, 139);');"
			/>
		</div>
	`,
});

const TemplateSubItems = (args) => ({
  components: { CdsFloatingActionButton: FloatingActionButton },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="position: relative">
			<img
				src="https://images.unsplash.com/photo-1738526787238-96d5352c2ba9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				style="width: 100%; height: 100%;"
			/>
			<cds-floating-action-button
				v-bind="args"
				@action-click="console.info('Action clicked!', $event)"
			/>
		</div>
	`,
});

export default {
  title: "Componentes/Forms/FloatingActionButton (FAB)",
  component: FloatingActionButton,

  argTypes: {
    variant: {
      control: {
        type: "select",
        options: colorOptions,
      },
    },

    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
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

        code: `
<cds-floating-action-button
	icon="plus-outline"
	size="md"
	variant="green"
	:actions="[
		{
			icon: 'document-outline',
			label: 'Documentos',
		},
		{
			icon: 'home-outline',
			label: 'Início',
		},
		{
			icon: 'edit-outline',
			label: 'Editar',
		}
	]"
/>
`,
      },
    },
  },
};

export const FloatingActionButton1 = {
  render: Template.bind({}),
  name: "FloatingActionButton1",
};

export const FloatingActionButton = {
  render: TemplateSubItems.bind({}),
  name: "FloatingActionButton",

  args: {
    actions: [
      {
        icon: "document-outline",
        label: "Documentos",
      },
      {
        icon: "home-outline",
        label: "Início",
      },
      {
        icon: "edit-outline",
        label: "Editar",
      },
    ],

    variant: "green",
    size: "md",
  },
};
