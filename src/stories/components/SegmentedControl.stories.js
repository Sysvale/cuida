import SegmentedControl from "../../components/SegmentedControl.vue";
import Icon from "../../components/Icon.vue";

const Template = (args) => ({
  components: { CdsSegmentedControl: SegmentedControl, CdsIcon: Icon },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-segmented-control
			v-bind="args"
			@click="handleEmit"
		>
		</cds-segmented-control>
	`,
  methods: {
    handleEmit(value, index) {
      console.info("value: ", value);
    },
  },
});

export default {
  title: "Componentes/Navegação/SegmentedControl",
  component: SegmentedControl,

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

        code: `<cds-segmented-control
	:segments="['info-outline', 'copy-outline', 'edit-outline']"
/>`,
      },
    },
  },
};

export const SegmentedControl1 = {
  render: Template.bind({}),
  name: "SegmentedControl1",

  args: {
    segments: ["info-outline", "copy-outline", "edit-outline"],
    withIcon: false,
  },
};

export const SegmentedControl2 = {
  render: Template.bind({}),
  name: "SegmentedControl2",

  args: {
    segments: ["info-outline", "copy-outline", "edit-outline"],
    segmentsTooltipText: ["info", "copiar", "editar"],
    withIcon: true,
  },
};
