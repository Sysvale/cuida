import Carousel from "../../components/Carousel.vue";
import Image from "../../components/Image.vue";

const Template = (args) => ({
  components: { CdsCarousel: Carousel, CdsImage: Image },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-carousel
			v-bind="args"
			v-slot="{ item }"
		>
			<cds-image :src="item" width="300" height="400" />
		</cds-carousel>
	`,
  methods: {},
});

export default {
  title: "Componentes/Display/Carousel",
  component: Carousel,

  argTypes: {
    snapTo: {
      control: {
        type: "select",
        options: ["start", "center", "end"],
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
<cds-carousel
	v-slot="{ item }"
	:items="[
		'https://picsum.photos/600/800?random=1',
		'https://picsum.photos/600/800?random=2',
		'https://picsum.photos/600/800?random=3',
		'https://picsum.photos/600/800?random=4',
	]
	:gap="0"
	:snap-to="'start'"
>
	<cds-image :src="item" width="300" height="400" />
</cds-carousel>
`,
      },
    },
  },
};

export const Carousel = {
  render: Template.bind({}),
  name: "Carousel",

  args: {
    items: [
      "https://picsum.photos/600/800?random=1",
      "https://picsum.photos/600/800?random=2",
      "https://picsum.photos/600/800?random=3",
      "https://picsum.photos/600/800?random=4",
      "https://picsum.photos/600/800?random=5",
      "https://picsum.photos/600/800?random=6",
      "https://picsum.photos/600/800?random=7",
    ],

    gap: 0,
    snapTo: "start",
    showArrows: false,
    darkArrows: false,
  },
};
