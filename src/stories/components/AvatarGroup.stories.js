import AvatarGroup from "../../components/AvatarGroup.vue";
import Avatar from "../../components/Avatar.vue";

const Template = (args) => ({
  components: { CdsAvatarGroup: AvatarGroup, CdsAvatar: Avatar },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-avatar-group
			v-bind="args" 
		/>
	`,
});

const avatars = [
  {
    src: "https://userstock.io/data/wp-content/uploads/2020/06/kimson-doan-HD8KlyWRYYM-4-1024x1024.jpg",
    name: "Cho Smith",
  },
  {
    src: "https://userstock.io/data/wp-content/uploads/2017/07/ayo-ogunseinde-221958-1024x723.jpg",
    name: "Alice Brown",
  },
  {
    src: "https://userstock.io/data/wp-content/uploads/2020/06/tyler-nix-PQeoQdkU9jQ-1024x1024.jpg",
    name: "Leo Garcia",
  },
  {
    src: "https://userstock.io/data/wp-content/uploads/2017/09/bewakoof-com-official-205182.jpg",
    name: "Dave Jones",
  },
  {
    src: "https://userstock.io/data/wp-content/uploads/2017/09/jason-blackeye-223584-1024x849.jpg",
    name: "Maya Rodriguez",
  },
  {
    src: "https://userstock.io/data/wp-content/uploads/2017/07/pexels-photo-289704-1024x682.jpg",
    name: "Tina Smith",
  },
  {
    src: "https://userstock.io/data/wp-content/uploads/2017/07/pexels-photo-26939-1-1024x1024.jpg",
    name: "Paulo Williams",
  },
];

export default {
  title: "Componentes/Display/AvatarGroup",
  component: AvatarGroup,

  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
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
	src="https://userstock.io/data/wp-content/uploads/2020/06/women-s-white-and-black-button-up-collared-shirt-774909-2-1024x1024.jpg"
/>`,
      },
    },
  },
};

export const AvatarGroup = {
  render: Template.bind({}),
  name: "AvatarGroup",

  args: {
    avatars,
    size: "md",
    maxCount: 4,
  },
};
