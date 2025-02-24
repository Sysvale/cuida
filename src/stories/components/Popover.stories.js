import Popover from "../../components/Popover.vue";
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
  components: { CdsPopover: Popover, CdsButton: Button },
  template: /*html*/ `
		<div class="d-flex justify-content-center">
			<cds-button
				id="trigger-cds-popover"
				@click="showPopover = true"
			>
				Click
			</cds-button>
			<cds-popover
				v-bind="args"
				v-model="showPopover"
			>
				<span>
					Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
					eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
					leite de mula manquis sem cabeça.
				</span>
				<span>
					Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
					eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
					leite de mula manquis sem cabeça.
				</span>
			</cds-popover>
		</div>
	`,
  updated() {
    console.info("%cv-model: ", "color: #2C70CD;", this.showPopover);
  },
});

export default {
  title: "Componentes/Overlays/Popover",
  component: Popover,

  argTypes: {
    width: {
      control: {
        type: "range",
        min: 50,
        max: 400,
        step: 10,
      },
    },

    height: {
      control: {
        type: "range",
        min: 200,
        max: 500,
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
	<cds-button
		id="trigger-cds-popover"
		@click="showPopover = true"
	>
		Click
	</cds-button>
	<cds-popover
		rightAligned="false"
		targetId="trigger-cds-popover"
		width="250"
		height="250"
		v-model="showPopover"
	>
		<span>
			Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
			eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
			leite de mula manquis sem cabeça.
		</span>
		<span>
			Mussum Ipsum, cacilds vidis litro abertis. A ordem dos tratores não altera o pão duris.Tá deprimidis,
			eu conheço uma cachacis que pode alegrar sua vidis.Paisis, filhis, espiritis santis.Leite de capivaris,
			leite de mula manquis sem cabeça.
		</span>
	</cds-popover>
</div>`,
      },
    },
  },
};

export const Popover = {
  render: Template.bind({}),
  name: "Popover",

  args: {
    rightAligned: false,
    targetId: "trigger-cds-popover",
    width: 250,
    height: 250,
  },
};
