import Highlight from "../../components/Highlight.vue";

const Template = (args) => ({
  components: { CdsHighlight: Highlight },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-highlight v-bind="args">
			O rato ROeu A RoUpA do rei de ROMA com eficácia, força e determinação.
		</cds-highlight>
	`,
});

const DefaultSlotDemoTemplate = (args) => ({
  components: { CdsHighlight: Highlight },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-highlight>
			O rato ROeu A RoUpA do rei de ROMA
		</cds-highlight>
	`,
});

const HighlightedTextTemplate = (args) => ({
  components: { CdsHighlight: Highlight },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-highlight highlightedText="RO">
			O rato ROeu A RoUpA do rei de ROMA
		</cds-highlight>
	`,
});

const CaseSensitiveTemplate = (args) => ({
  components: { CdsHighlight: Highlight },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<cds-highlight highlightedText="RO" :caseSensitive="true">
			O rato ROeu A RoUpA do rei de ROMA
		</cds-highlight>
	`,
});

export default {
  title: "Componentes/Display/Highlight",
  component: Highlight,

  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["info", "success", "danger"],
      },
    },

    duration: {
      control: {
        type: "range",
        min: 0.5,
        max: 5,
        step: 0.1,
      },
    },

    delay: {
      control: {
        type: "range",
        min: 0,
        max: 5,
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

        code: `<cds-highlight
	animated
	:duration="1"
	:delay="0"
	highlightedText: 'ro',
	caseSensitive: false,
>
	O rato roeu a roupa do rei de Roma
</cds-highlight>`,
      },
    },
  },
};

export const SlotDemoTemplate = {
  render: DefaultSlotDemoTemplate.bind({}),
  name: "slot-demo-template",
};

export const HighlightedTextTemplate_ = {
  render: HighlightedTextTemplate.bind({}),
  name: "highlighted-text-template",
};

export const CaseSensitiveTemplate_ = {
  render: CaseSensitiveTemplate.bind({}),
  name: "case-sensitive-template",
};

export const Highlight = {
  render: Template.bind({}),
  name: "Highlight",

  args: {
    animated: true,
    duration: 1,
    delay: 0,
    highlightedText: "ro",
    caseSensitive: false,
  },
};
