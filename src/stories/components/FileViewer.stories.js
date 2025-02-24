import FileViewer from "../../components/FileViewer.vue";
import { colors } from "../../utils/constants/colors.js";

const Template = (args) => ({
  components: { CdsFileViewer: FileViewer },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-file-viewer
			v-bind="args"
			@download-click="logDownload"
			@close="logClose"
		>
		</cds-file-viewer>
	`,
  methods: {
    logDownload(event) {
      console.log("LogDownload: ", event);
    },
    logClose(event) {
      console.log("logClose: ", event);
    },
  },
});

export default {
  title: "Componentes/Display/FileViewer",
  component: FileViewer,

  argTypes: {
    variant: {
      control: {
        type: "select",

        options: colors
          .filter((item) => item.name != "gray")
          .map(({ name }) => name),
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

        code: `<cds-alert
	variant="green",
	@download-click="logDownload"
/>`,
      },
    },
  },
};

export const FileViewer = {
  render: Template.bind({}),
  name: "FileViewer",

  args: {
    label: "Comprovante de residência",
    fileUrl:
      "https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg",
    variant: "green",
  },
};
