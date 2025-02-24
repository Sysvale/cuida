import CalloutCard from "../../components/CalloutCard.vue";

const Template = (args) => ({
  components: { CdsCalloutCard: CalloutCard },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-callout-card
			v-bind="args"
			@actionButtonClick="logButtonClick"
		/>
	`,
  methods: {
    logButtonClick(event) {
      console.info("logClick: ", event);
    },
  },
});

const title = "Título do CalloutCard";

const text = `Existe uma teoria que diz que, se um dia alguém descobrir 
	exatamente para que serve o Universo e por que ele está aqui, ele 
	desaparecerá instantaneamente.`;

export default {
  title: "Componentes/Display/CalloutCard",
  component: CalloutCard,

  argTypes: {
    actionButtonVariant: {
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

        code: `
<cds-callout-card
	image="caminho-da-imagem.jpg"
	text="Texto do CalloutCard"
	title="Título do CalloutCard"
/>`,
      },
    },
  },
};

export const CalloutCard = {
  render: Template.bind({}),
  name: "CalloutCard",

  args: {
    image: "https://cdn-icons-png.flaticon.com/512/7486/7486747.png",
    title,
    text,
  },
};
