import QuickActionBar from "../../components/QuickActionBar.vue";
import Button from "../../components/Button.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      showSearchBar: false,
      filteredItems: [],
      groups,
      recents,
      loading: false,
    };
  },
  methods: {
    filterItems(searchTerm) {
      this.loading = true;
      if (searchTerm === "") {
        this.filteredItems = this.groups.map((item) => {
          return {
            ...item,
            results: [],
          };
        });
        return;
      }
      setTimeout(() => {
        this.filteredItems = this.groups.map((item) => {
          return {
            ...item,
            results: item.results.filter((n) =>
              n.title.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
          };
        });
        this.loading = false;
      }, 800);
    },
  },
  components: { CdsQuickActionBar: QuickActionBar, CdsButton: Button },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<cds-button
				id="trigger-popover"
				@click="showSearchBar = !showSearchBar"
			>
				Abrir barra de busca
			</cds-button>
			<cds-quick-action-bar
				v-bind="args"
				v-model="showSearchBar"
				:groups="filteredItems"
				:recents="recents"
				:loading="loading"
				@search="filterItems"
				@onItemClick="console.log('Item clicado: ', $event)"
				@onSeeMoreClick="console.log('Ver mais clicado: ', $event)"
				@onRemoveRecent="console.log('Item removido:', $event)"
				@onEnterPress="console.log('Enter clicado:', $event)"
			>
			</cds-quick-action-bar>
		</div>
	`,
});

const recents = [
  {
    title: "Carla Santana",
    cpf: "22233344405",
  },
  {
    title: "Carlota Oliveira",
  },
  {
    title: "Rodrigo Barboza",
  },
  {
    title: "Lucas Barbosa",
    cpf: "22233344405",
  },
  {
    title: "Greg Uesley Silver",
    cpf: "22233344405",
  },
  {
    title: "coração",
  },
];

const groups = [
  {
    category: "Gestantes",
    results: [
      {
        title: "Carla Santana",
        cpf: "22233344405",
        cns: "900098367891993",
      },
      {
        title: "Carliane Ferreira",
        cpf: "22233344405",
        cns: "900098367891993",
      },
      {
        title: "Fernanda Cardoso da Fonseca",
        cpf: "22233344405",
        cns: "900098367891993",
      },
      {
        title: "Rafael Assunção",
        cpf: "22233344405",
        cns: "900098367891993",
      },
      {
        title: "Alzira Monte",
        cpf: "22233344405",
        cns: "900098367891993",
      },
      {
        title: "Antônio de Almeida Castro Silva",
        cpf: "22233344405",
        cns: "900098367891993",
      },
      {
        title: "Marcela da Cunha",
        cpf: "22233344405",
        cns: "900098367891993",
      },
      {
        title: "Euclides do Amaral",
        cpf: "22233344405",
        cns: "900098367891993",
      },
      {
        title: "Constantino Xavier",
        cpf: "22233344405",
        cns: "900098367891993",
      },
    ],
  },
  {
    category: "Métricas",
    results: [
      {
        title: "Nº de pessoas",
        num: 398,
      },
      {
        title: "Nº de crianças",
        num: 398,
      },
      {
        title: "Nº de cachorros",
        num: 3,
      },
      {
        title: "Nº de gatos",
        num: 0,
      },
      {
        title: "Média de pessoas",
        num: 398,
      },
      {
        title: "Moda de animais por residência",
        num: 398,
      },
      {
        title: "Moda de sertanejo",
        num: 400,
      },
      {
        title: "Máximo de pessoas em uma residência",
        num: 400,
      },
      {
        title: "Máximo de pessoas em um bairro",
        num: 400,
      },
      {
        title: "Máximo de pessoas em uma cidade",
        num: 400,
      },
    ],
  },
];

export default {
  title: "Componentes/Overlays/QuickActionBar",
  component: QuickActionBar,
  argTypes: {},

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

        code: `<cds-quick-action-bar
	v-bind="args"
	v-model="showSearchBar"
	:groups="filteredItems"
	:recents="recents"
	@search="filterItems"
	@onItemClick="console.log('Item clicado: ', $event)"
	@onSeeMoreClick="console.log('Ver mais clicado: ', $event)"
	@onRemoveRecent="console.log('Item removido:', $event)"
	@onEnterPress="console.log('Enter clicado:', $event)"
>`,
      },
    },
  },
};

export const QuickActionBar = {
  render: Template.bind({}),
  name: "QuickActionBar",

  args: {
    recents,
    groups,
  },
};
