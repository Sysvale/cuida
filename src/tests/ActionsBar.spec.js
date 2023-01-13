// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import ActionBar from "../components/ActionBar.vue";
import { mount } from "@vue/test-utils";

const actions = ["Button1", "Button2", "Button3"];

describe("ActionBar", () => {
  it("renders correctly", async () => {
    const wrapper = mount(ActionBar, {
      show: true,
      actions,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
