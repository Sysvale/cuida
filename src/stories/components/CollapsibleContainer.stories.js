import CollapsibleContainer from "../../components/CollapsibleContainer.vue";

const Template = (args) => ({
  components: { CdsCollapsibleContainer: CollapsibleContainer },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-collapsible-container
			v-bind="args" 
		>
			<p class="p-3">
				Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
				vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
				Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
				divoltis porris, paradis. Leite de capivaris, leite de mula
				manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
				litora torquent. Per aumento de cachacis, eu reclamis. Nec
				orci ornare consequat. Praesent lacinia ultrices consectetur.
				Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
			</p>
		</cds-collapsible-container>
	`,
});

export default {
  title: "Componentes/Containers/CollapsibleContainer",
  component: CollapsibleContainer,

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
<cds-collapsible-container
	:value="false"
	title="Veja mais informações"
>
	<p>
		Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
		vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
		Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
		divoltis porris, paradis. Leite de capivaris, leite de mula
		manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
		litora torquent. Per aumento de cachacis, eu reclamis. Nec
		orci ornare consequat. Praesent lacinia ultrices consectetur.
		Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
	</p>
</cds-collapsible-container>
`,
      },
    },
  },
};

export const CollapsibleContainer = {
  render: Template.bind({}),
  name: "CollapsibleContainer",

  args: {
    value: false,
    title: "Veja mais informações",
  },
};
