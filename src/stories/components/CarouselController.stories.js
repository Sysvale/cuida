import CarouselController from "../../components/CarouselController.vue";

const Template = (args) => ({
  components: { CdsCarouselController: CarouselController },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-carousel-controller
			v-bind="args"
			@click-forward="handleClickForwardEvent"
			@click-back="handleClickBackEvent"
		/>
	`,
  methods: {
    handleClickForwardEvent() {
      console.info("clicked forward");
    },
    handleClickBackEvent() {
      console.info("clicked back");
    },
  },
});

export default {
  title: "Componentes/Containers/CarouselController",
  component: CarouselController,

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
<cds-carousel-controller
	:total="12"
	:perPage="4"
	propertyName="Métricas"
	@click-forward="handleClickForwardEvent"
	@click-back="handleClickBackEvent"
/>`,
      },
    },
  },
};

export const CarouselController = {
  render: Template.bind({}),
  name: "CarouselController",

  args: {
    total: 12,
    perPage: 4,
    propertyName: "Métricas",
  },
};
