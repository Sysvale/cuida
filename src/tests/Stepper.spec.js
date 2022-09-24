import { mount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import Stepper from "../../src/components/Stepper.vue";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test("Component is mounted properly", () => {
  let mocked_data = [
    {
      label: "Dummy label 1",
      completed: true,
      inProcessing: false,
      error: false,
    },
    {
      label: "Dummy label 3",
      completed: false,
      inProcessing: true,
      error: false,
    },
    {
      label: "Dummy label 2",
      completed: false,
      inProcessing: false,
      error: true,
    },
    {
      label: "Dummy label X",
      completed: false,
      inProcessing: false,
      error: false,
    },
  ];

  const wrapper = mount(Stepper, {
    localVue,
    propsData: {
      value: 4,
      steps: mocked_data,
    },
  });
  expect(wrapper).toMatchSnapshot();
});

describe("Divider styles test", () => {
  test("if all the stepper dividers are rendered as default dividers", () => {
    let mocked_data = [
      {
        label: "Dummy label 1",
        completed: false,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 2",
        completed: false,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 3",
        completed: false,
        inProcessing: false,
        error: false,
      },
    ];

    const wrapper = mount(Stepper, {
      localVue,
      propsData: {
        value: 1,
        steps: mocked_data,
      },
    });
    const numberOfEdges = 3;
    expect(wrapper.findAll(".stepper__divider--default").length).toBe(
      2 + numberOfEdges
    );
  });

  test("if one of the stepper divider is rendered as an in_progress divider and others are rendered as default dividers", () => {
    let mocked_data = [
      {
        label: "Dummy label 1",
        completed: true,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 2",
        completed: false,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 3",
        completed: false,
        inProcessing: false,
        error: false,
      },
    ];

    const wrapper = mount(Stepper, {
      localVue,
      propsData: {
        value: 2,
        steps: mocked_data,
      },
    });
    expect(wrapper.findAll(".stepper__divider--in-progress").length).toBe(1);
    const numberOfEdges = 3;
    expect(wrapper.findAll(".stepper__divider--default").length).toBe(
      1 + numberOfEdges
    );
  });

  test("if one of the stepper divider is rendered as a completed divider and the other is rendered as an in_progress divider", () => {
    let mocked_data = [
      {
        label: "Dummy label 1",
        completed: true,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 2",
        completed: true,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 3",
        completed: false,
        inProcessing: false,
        error: false,
      },
    ];

    const wrapper = mount(Stepper, {
      localVue,
      propsData: {
        value: 3,
        steps: mocked_data,
      },
    });
    expect(wrapper.findAll(".stepper__divider--completed").length).toBe(1);
    expect(wrapper.findAll(".stepper__divider--in-progress").length).toBe(1);
  });
});

describe("Change step event tests", () => {
  test("if a event is emited when the stepper is clicked", async () => {
    let mocked_data = [
      {
        label: "Dummy label 1",
        completed: false,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 2",
        completed: false,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 3",
        completed: false,
        inProcessing: false,
        error: false,
      },
    ];

    const wrapper = mount(Stepper, {
      localVue,
      propsData: {
        value: 1,
        steps: mocked_data,
      },
    });

    wrapper.find("#step-2").trigger("click");

    await flushPromises();

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([[2]]);
  });
});

describe("Component is mounted properly when is vertical", () => {
  test("if dividers are shown as vertical", () => {
    let mocked_data = [
      {
        label: "Dummy label 1",
        completed: false,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 2",
        completed: false,
        inProcessing: false,
        error: false,
      },
      {
        label: "Dummy label 3",
        completed: false,
        inProcessing: false,
        error: false,
      },
    ];

    const wrapper = mount(Stepper, {
      localVue,
      propsData: {
        value: 1,
        steps: mocked_data,
        vertical: true,
      },
    });

    const numberOfEdges = 2;
    expect(wrapper.findAll(".stepper__vertical-divider--default").length).toBe(
      2 + numberOfEdges
    );
  });
});
