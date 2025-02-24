import RichTooltip from "../../components/RichTooltip.vue";
import Button from "../../components/Button.vue";

const Template = (args) => ({
  setup() {
    return { args };
  },
  data() {
    return {
      showPopover: false,
    };
  },
  components: { CdsRichTooltip: RichTooltip, CdsButton: Button },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<span
				id="trigger-cds-popover"
				@mouseover="showPopover = true"
				@mouseleave="showPopover = false"
			>
				Tooltip trigger
			</span>
			<cds-rich-tooltip
				v-bind="args"
				v-model="showPopover"
			>
				<div>
					<p><strong>Em atendimento:</strong> 280</p>
					<p><strong>Pendentes:</strong> 60</p>
					<p><strong>Em acompanhamento:</strong> 600</p>
				</div>
			</cds-rich-tooltip>
		</div>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.showPopover);
  },
});

export default {
  title: "Componentes/Overlays/RichTooltip",
  component: RichTooltip,

  argTypes: {
    width: {
      control: {
        type: "range",
        min: 50,
        max: 400,
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

        code: `<div class="d-flex justify-content-center">
			<span
				id="trigger-cds-popover"
				@mouseover="showPopover = true"
				@mouseleave="showPopover = false"
			>
				Tooltip trigger
			</span>
			<cds-rich-tooltip
				v-bind="args"
				v-model="showPopover"
			>
				<div>
					<p><strong>Em atendimento:</strong> 280</p>
					<p><strong>Pendentes:</strong> 60</p>
					<p><strong>Em acompanhamento:</strong> 600</p>
				</div>
			</cds-rich-tooltip>
		</div>`,
      },
    },
  },
};

export const RichTooltip = {
  render: Template.bind({}),
  name: "RichTooltip",

  args: {
    targetId: "trigger-cds-popover",
    width: 250,
    defaultPlacement: "bottom-start",
  },
};
