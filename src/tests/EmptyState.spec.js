import { mount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import EmptyState from "../../src/components/EmptyState.vue";
import Button from "../../src/components/Button.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

test("Component is mounted properly", () => {
  const wrapper = mount(EmptyState, {
    localVue,
    propsData: {
      title: "EmptyState title",
      text: "EmptyState text",
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test("if the event is emitted correctly when the button is clicked", async () => {
  const wrapper = mount(EmptyState, {
    localVue,
    propsData: {
      title: "EmptyState title",
      text: "EmptyState text",
    },
  });

  await wrapper.findComponent(Button).vm.$emit("click");

  expect(wrapper.emitted()["action-button-click"]).toBeTruthy();
  expect(wrapper.emitted()["action-button-click"]).toEqual([[true]]);
});

test("if the button is shown", () => {
  const wrapper = mount(EmptyState, {
    localVue,
    propsData: {
      title: "EmptyState title",
      text: "EmptyState text",
    },
  });

  expect(wrapper.findAll(".empty-state__button").length).toBe(1);
});

test("if the button is not shown", () => {
  const wrapper = mount(EmptyState, {
    localVue,
    propsData: {
      hideActionButton: true,
      title: "EmptyState title",
      text: "EmptyState text",
    },
  });

  expect(wrapper.findAll(".empty-state__button").length).toBe(0);
});
