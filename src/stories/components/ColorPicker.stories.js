import ColorPicker from "../../components/ColorPicker.vue";

const Template = (args) => ({
  components: { CdsColorPicker: ColorPicker },
  setup() {
    return { args };
  },
  data() {
    return {
      color: "#2AC092",
    };
  },
  template: /*html*/ `
		<div class="d-flex" style="width: 550px; justify-content: space-between; align-items: end;">
			<div>
				<cds-color-picker
					v-bind="args"
					v-model="color"
					@change="handleEmit"
					@variant-chosen="handleVariantChosen"
				/>
			</div>
			<div>
				<div style="height: 52px; width: 52px; border-radius: 8px" :style="{background: color}"/>
				<i style="margin-top: 1px; font-size: 12.5px; color: #3b4754">⚠️ Div usada como demo. Não faz parte do ColorPicker.</i>
			</div>
		</div>`,
  methods: {
    handleEmit(value) {
      console.info("value: ", value);
    },
    handleVariantChosen(value) {
      console.info("%cv-model:colorVariant ", "color: #2C70CD;", value);
    },
  },
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.color);
  },
});

const swatch2 = [
  ["$gp-200", "$gp-300", "$gp-400", "$gp-500"],
  ["$ts-200", "$ts-300", "$ts-400", "$ts-500"],
  ["$bn-200", "$bn-300", "$bn-400", "$bn-500"],
  ["$in-200", "$in-300", "$in-400", "$in-500"],
  ["$vr-200", "$vr-300", "$vr-400", "$vr-500"],
  ["$pp-200", "$pp-300", "$pp-400", "$pp-500"],
  ["$rc-200", "$rc-300", "$rc-400", "$rc-500"],
  ["$og-200", "$og-300", "$og-400", "$og-500"],
  ["$al-200", "$al-300", "$al-400", "$al-500"],
  ["$n-10", "$n-40", "$n-300", "$n-600"],
];

const swatch = [
  ["$gp-400", "$ts-400", "$bn-400", "$in-400", "$vr-400"],
  ["$pp-400", "$rc-400", "$og-400", "$al-400", "$n-400"],
];

export default {
  title: "Componentes/Forms/ColorPicker",
  component: ColorPicker,

  argTypes: {
    popoverHeight: {
      control: {
        type: "range",
        min: 50,
        max: 290,
        step: 10,
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

        code: `<cds-color-picker
	v-model="color"
	label="Cor"
	:swatch="swatch"
	:inline="true"
	@change="handleEmit"
/>`,
      },
    },
  },
};

export const ColorPicker = {
  render: Template.bind({}),
  name: "ColorPicker",

  args: {
    swatch: swatch,
    inline: true,
    label: "Cor",
  },
};

export const ColorPicker2 = {
  render: Template.bind({}),
  name: "ColorPicker2",

  args: {
    swatch: swatch2,
    popoverHeight: 190,
  },
};
