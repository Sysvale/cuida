import Avatar from "../../components/Avatar.vue";

const Template = (args) => ({
  components: { CdsAvatar: Avatar },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-avatar
			v-bind="args" 
		>
			<template #dropdown-content>
				Conteúdo do dropdown
			</template>
		</cds-avatar>
	`,
});

export default {
  title: "Componentes/Display/Avatar",
  component: Avatar,

  argTypes: {
    variant: {
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
          "gray",
          "white",
        ],
      },
    },

    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg", "xl"],
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
<cds-avatar
	src="https://thispersondoesnotexist.com/"
/>`,
      },
    },
  },
};

export const Avatar = {
  render: Template.bind({}),
  name: "Avatar",

  args: {
    src: "https://thispersondoesnotexist.com/",
  },
};
