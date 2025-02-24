import Alert from "../../components/Alert.vue";

const Template = (args) => ({
  components: { CdsAlert: Alert },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-alert
			v-bind="args" 
		>
			Texto do alerta pelo slot
		</cds-alert>
	`,
});

export default {
  title: "Componentes/Notificação/Alert",
  component: Alert,

  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["info", "success", "warning", "danger"],
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

        code: `<cds-alert
	variant="info",
	text="Texto do alerta",
/>`,
      },
    },
  },
};

export const Alert = {
  render: Template.bind({}),
  name: "Alert",

  args: {
    variant: "info",
    text: "Texto do alerta",
  },
};
