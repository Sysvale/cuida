import Button from "../../components/Button.vue";
import isDeviceTypeMethod from "../../utils/methods/isDeviceType";

const Template = (args) => ({
  components: { CdsButton: Button },
  setup() {
    return { args };
  },
  data() {
    return {
      methodResponse: "",
    };
  },
  template: /*html*/ `
    <div :style="{ 'display': 'flex', 'grid-gap': '10px', 'margin-top': '20px' }">
      <cds-button
        v-bind="args"
              @button-click="event => logButtonClick(event, 'smartphone')"
      >
      Smartphone
      </cds-button>
      <cds-button
        v-bind="args"
              @button-click="event => logButtonClick(event, 'tablet')"
      >
      Tablet
      </cds-button>
      <cds-button
        v-bind="args"
              @button-click="event => logButtonClick(event, 'hd-screen')"
      >
      HD Screen
      </cds-button>
      <cds-button
        v-bind="args"
              @button-click="event => logButtonClick(event, 'fhd-screen')"
      >
      Full HD Screen
      </cds-button>
      <cds-button
        v-bind="args"
              @button-click="event => logButtonClick(event, 'uhd-screen')"
      >
      Ultra HD Screen
      </cds-button>
    </div>
    <div :style="{ 'margin-top': '12px', 'font-size': '14.2px' }">
      isDeviceType response: {{ methodResponse }}
    </div>
    `,
  methods: {
    logButtonClick(event, device) {
      this.methodResponse = isDeviceTypeMethod(device);
    },
  },
});

export default {
  title: "Utils/Métodos/IsDeviceType()",
};

export const IsDeviceType = {
  name: "IsDeviceType",
};

export const Button2 = {
  render: Template.bind({}),
  name: "Button2",

  args: {
    variant: "green",
    size: "md",
    text: "Button",
    block: false,
  },
};
