import Image from "../../components/Image.vue";

const Template = (args) => ({
  components: { CdsImage: Image },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-image
			v-bind="args"
		/>
	`,
  methods: {
    logClickableClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Utils/Image",
  component: Image,

  argTypes: {
    opacity: {
      control: {
        type: "range",
        min: 0,
        max: 1,
        step: 0.1,
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

        code: `<cds-image
	:width="400"
	:blackAndWhite="false"
	:dimmed="false"
	:roundedCorners="false"
	:opacity="1"
	src="https://cdn.dribbble.com/users/56251/screenshots/10780716/media/bf16339f04fb54b38055adcce2a6da21.png?compress=1&resize=1000x750&vertical=top"
	fallbackSrc="https://sysfront.nyc3.cdn.digitaloceanspaces.com/cuida/images/imagePlaceholder.png"
	alt="Imagem de exemplo do cds-image"
/>`,
      },
    },
  },
};

export const Image = {
  render: Template.bind({}),
  name: "Image",

  args: {
    src: "https://cdn.dribbble.com/users/56251/screenshots/10780716/media/bf16339f04fb54b38055adcce2a6da21.png?compress=1&resize=1000x750&vertical=top",
    fallbackSrc:
      "https://sysfront.nyc3.cdn.digitaloceanspaces.com/cuida/images/imagePlaceholder.png",
    width: 400,
    blackAndWhite: false,
    dimmed: false,
    roundedCorners: false,
    round: false,
    opacity: 1,
    alt: "Imagem de exemplo do cds-image",
  },
};
