import AlertCard from "../../components/AlertCard.vue";

const Template = (args) => ({
  components: { CdsAlertCard: AlertCard },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-alert-card
			v-bind="args" 
		/>
	`,
});

const title = "Título do AlertCard";

const subTitle = `Existe uma teoria que diz que, se um dia alguém descobrir 
				exatamente para que serve o Universo e por que ele está aqui, ele 
				desaparecerá instantaneamente e será substituídopor al go ainda 
				mais estranho e inexplicável. Existe uma segunda teoria que diz 
				que isso já aconteceu.`;

export default {
  title: "Componentes/Notificação/AlertCard",
  component: AlertCard,

  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["info", "warning", "danger"],
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

        code: `<cds-alert-card
	:title="title"
	:subTitle="subTitle"
	variant="info"
/>`,
      },
    },
  },
};

export const AlertCard = {
  render: Template.bind({}),
  name: "AlertCard",

  args: {
    title,
    subTitle,
    variant: "info",
    value: false,
  },
};
