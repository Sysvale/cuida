import SideSheet from "../../components/SideSheet.vue";
import Button from "../../components/Button.vue";

const Template = (args) => ({
  components: { CdsSideSheet: SideSheet, CdsButton: Button },
  setup() {
    return { args };
  },
  data() {
    return {
      show: false,
    };
  },
  props: Object.keys(args),
  template: /*html*/ `
		<div>
			<cds-button
				@click="show = true"
			>
				Click
			</cds-button>
			<cds-side-sheet
				v-model="show"
				v-bind="$props"
				@ok="okHandle"
				@close="closeHandle"
				@cancel="cancelHandle"
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
				<p class="p-3">
					Per aumento de cachacis, eu reclamis. Nec
					orci ornare consequat. Praesent lacinia ultrices consectetur.
					Sed non ipsum felis. Cevadis im ampola pa arma uma pindureta.
					leite de mula manquis sem cabeça. Sociosqu ad
					litora torquent.
				</p>
			</cds-side-sheet>
		</div>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.show);
  },
  methods: {
    okHandle(ev) {
      console.info("%cok: ", "color: #2C70CD;", ev);
    },
    closeHandle(ev) {
      console.info("%cclose: ", "color: #2C70CD;", ev);
    },
    cancelHandle(ev) {
      console.info("%ccancel: ", "color: #2C70CD;", ev);
    },
  },
});

export default {
  title: "Componentes/Overlays/SideSheet",
  component: SideSheet,

  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["xl", "lg", "md", "sm"],
      },
    },

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

        code: `<cds-side-sheet
	v-model="show"
	:position="right"
	:no-close-on-backdrop="false"
	:no-close-on-esc="false"
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
</cds-side-sheet>`,
      },
    },
  },
};

export const SideSheet = {
  render: Template.bind({}),
  name: "SideSheet",

  args: {
    size: "md",
    title: "SideSheet",
    withOverlay: true,
    noCloseOnBackdrop: false,
    noCloseOnEsc: false,
    noFooter: false,
    noCancelButton: false,
    disableOkButton: false,
    disableCancelButton: false,
    okButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    blockOkButton: true,
    actionButtonVariant: "blue",
    noCloseOkButton: false,
    noCloseCancelButton: false,
  },
};
