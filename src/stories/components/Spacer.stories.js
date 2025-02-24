import Spacer from "../../components/Spacer.vue";

const Template = (args) => ({
  components: { CdsSpacer: Spacer },
  setup() {
    return { args };
  },
  template: /*html*/ `
		<div style="width: fit-content; background-color: #def7eb; border-radius: 20px">
			<div
				style="padding: 0.5px; background-color: #def7eb; border-radius: 20px"
			>
				<cds-spacer
					v-bind="args"
				>
					<div style="width: 100px; height: 100px; background-color: #2AC092; border-radius: 20px"/>
				</cds-spacer>
			</div>
		</div>
	`,
  methods: {
    logClickableClick(event) {
      console.info("logClick: ", event);
    },
  },
});

export default {
  title: "Componentes/Utils/Spacer",
  component: Spacer,

  argTypes: {
    padding: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
      },
    },

    paddingTop: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
      },
    },

    paddingRight: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
      },
    },

    paddingBottom: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
      },
    },

    paddingLeft: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
      },
    },

    margin: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
      },
    },

    marginTop: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
      },
    },

    marginRight: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
      },
    },

    marginBottom: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
      },
    },

    marginLeft: {
      control: {
        type: "range",
        min: 0,
        max: 12,
        step: 1,
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

        code: `<cds-spacer
	:paddingTop="0"
	:paddingRight="0"
	:paddingBottom="0"
	:paddingLeft="0"
	:marginTop="0"
	:marginRight="0"
	:marginBottom="0"
	:marginLeft="0"
>
	<div style="width: 100px; height: 100px; background-color: #2AC092; border-radius: 20px"/>
</cds-spacer>`,
      },
    },
  },
};

export const Spacer = {
  render: Template.bind({}),
  name: "Spacer",

  args: {
    padding: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    margin: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
};
