import PanelCard from "../../components/PanelCard.vue";

const Template = (args) => ({
  components: { CdsPanelCard: PanelCard },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="background: linear-gradient(158.71deg, #FFFFFF -36.57%, #F1F5FB 156.92%); padding: 24px;">
			<cds-panel-card
				v-bind="args"
			>
				<template #panel-actions>
					<strong>#</strong>
				</template>
				Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
				vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
				Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
				divoltis porris, paradis. Leite de capivaris, leite de mula
				manquis sem cabeça. Viva Forevis aptent taciti sociosqu ad
				litora torquent. Per aumento de cachacis, eu reclamis. Nec
				orci ornare consequat. Praesent lacinia ultrices consectetur.
				Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
			</cds-panel-card>
		</div>
	`,
});

export default {
  title: "Componentes/Containers/PanelCard",
  component: PanelCard,

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

        code: `<cds-panel-card
	title="Redes"
	subtitle="Habilite as redes da regulação"
>
	<template #panel-actions>
		<strong>#</strong>
	</template>
	Mussum Ipsum, cacilds vidis litro abertis. Todo mundo
	vê os porris que eu tomo, mas ninguém vê os tombis que eu levo!
	Atirei o pau no gatis, per gatis num morreus. Pra lá , depois
	divoltis porris, paradis. Leite de capivaris, leite de mula
	manquis sem cabeça.
</cds-panel-card>`,
      },
    },
  },
};

export const PanelCard = {
  render: Template.bind({}),
  name: "PanelCard",

  args: {
    title: "Redes",
    subtitle: "Habilite as redes da regulação",
  },
};
