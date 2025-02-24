import Scrollable from "../../components/Scrollable.vue";

const Template = (args) => ({
  components: { CdsScrollable: Scrollable },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-scrollable
			v-bind="args" 
		>
			<p>
				Existe uma teoria que diz que, se um dia alguém descobrir 
				exatamente para que serve o Universo e por que ele está aqui, ele 
				desaparecerá instantaneamente e será substituídopor al go ainda 
				mais estranho e inexplicável. Existe uma segunda teoria que diz 
				que isso já aconteceu.
			</p>
			<p>
				Existe uma teoria que diz que, se um dia alguém descobrir 
				exatamente para que serve o Universo e por que ele está aqui, ele 
				desaparecerá instantaneamente e será substituídopor al go ainda 
				mais estranho e inexplicável. Existe uma segunda teoria que diz 
				que isso já aconteceu.
			</p>
			<p>
				Existe uma teoria que diz que, se um dia alguém descobrir 
				exatamente para que serve o Universo e por que ele está aqui, ele 
				desaparecerá instantaneamente e será substituídopor al go ainda 
				mais estranho e inexplicável. Existe uma segunda teoria que diz 
				que isso já aconteceu.
			</p>
			<p>
				Existe uma teoria que diz que, se um dia alguém descobrir 
				exatamente para que serve o Universo e por que ele está aqui, ele 
				desaparecerá instantaneamente e será substituídopor al go ainda 
				mais estranho e inexplicável. Existe uma segunda teoria que diz 
				que isso já aconteceu.
			</p>
		</cds-scrollable>
	`,
});

export default {
  title: "Componentes/Containers/Scrollable",
  component: Scrollable,

  argTypes: {
    maxHeight: {
      description: "Altura máxima do container",
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

        code: `<cds-scrollable
	maxHeight="150px"
>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
	<p>
		Existe uma teoria que diz que, se um dia alguém descobrir 
		exatamente para que serve o Universo e por que ele está aqui, ele 
		desaparecerá instantaneamente e será substituídopor al go ainda 
		mais estranho e inexplicável. Existe uma segunda teoria que diz 
		que isso já aconteceu.
	</p>
</cds-scrollable>`,
      },
    },
  },
};

export const Scrollable = {
  render: Template.bind({}),
  name: "Scrollable",

  args: {
    maxHeight: "150px",
  },
};
