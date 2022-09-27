import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import ExpansionCard from "../../src/components/ExpansionCard.vue";
import flushPromises from "flush-promises";

const localVue = createLocalVue();

localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);

test("Component is mounted properly", () => {
  const wrapper = mount(ExpansionCard, {
    localVue,
    propsData: {
      icon: "house-fill",
      mainValue: 32,
      legend: "UBSs com dados atualizados",
      variant: "blue",
    },
  });

  expect(wrapper).toMatchSnapshot();
});

describe("Hover tests", () => {
  test("if hover style is applied when the card is hovered and is expansible", async () => {
    expect.assertions(4);

    const wrapper = shallowMount(ExpansionCard, {
      localVue,
      propsData: {
        expansible: true,
      },
    });

    wrapper.trigger("mouseover");
    await flushPromises();

    expect(wrapper.find(".expansion-card--hover-gray").exists()).toBe(true);
    expect(wrapper.find(".expansion-card__expand-icon").exists()).toBe(true);

    wrapper.trigger("mouseleave");
    await flushPromises();

    expect(wrapper.find(".expansion-card--hover-gray").exists()).toBe(false);
    expect(wrapper.find(".expansion-card__expand-icon").exists()).toBe(false);
  });

  test("if hover style is not applied when the card is hovered and is not expansible", async () => {
    expect.assertions(4);

    const wrapper = shallowMount(ExpansionCard, {
      localVue,
      propsData: {
        expansible: false,
      },
    });

    wrapper.trigger("mouseover");
    await flushPromises();

    expect(wrapper.find(".expansion-card--hover-gray").exists()).toBe(false);
    expect(wrapper.find(".expansion-card__expand-icon").exists()).toBe(false);

    wrapper.trigger("mouseleave");
    await flushPromises();

    expect(wrapper.find(".expansion-card--hover-gray").exists()).toBe(false);
    expect(wrapper.find(".expansion-card__expand-icon").exists()).toBe(false);
  });
});

describe("Click tests", () => {
  test("if the card is expanded and an event is emitted when the card is clicked", async () => {
    const wrapper = shallowMount(ExpansionCard, {
      localVue,
    });

    expect(wrapper.find(".expansion-card").exists()).toBe(true);

    wrapper.trigger("mouseover");
    wrapper.trigger("click");
    await flushPromises();

    expect(wrapper.find(".expansion-card--expanded").exists()).toBe(true);
    expect(wrapper.find(".expansion-card__contract-icon").exists()).toBe(true);

    expect(wrapper.emitted().expanded).toBeTruthy();
    expect(wrapper.emitted().expanded).toEqual([[true]]);
  });

  test("if the card is contracted and an event is emitted when the expand icon is clicked", async () => {
    const wrapper = shallowMount(ExpansionCard, {
      localVue,
    });

    expect(wrapper.find(".expansion-card").exists()).toBe(true);
    wrapper.trigger("mouseover");
    await flushPromises();

    wrapper.find(".expansion-card__expand-icon").trigger("click");
    await flushPromises();

    expect(wrapper.find(".expansion-card--expanded").exists()).toBe(true);
    expect(wrapper.find(".expansion-card__contract-icon").exists()).toBe(true);

    expect(wrapper.emitted().expanded).toBeTruthy();
    expect(wrapper.emitted().expanded).toEqual([[true]]);
  });

  test("if the card is contracted and an event is emitted when the contract icon is clicked", async () => {
    const wrapper = shallowMount(ExpansionCard, {
      localVue,
    });

    expect(wrapper.find(".expansion-card").exists()).toBe(true);
    wrapper.trigger("mouseover");
    wrapper.trigger("click");
    await flushPromises();

    wrapper.find(".expansion-card__contract-icon").trigger("click");
    await flushPromises();

    expect(wrapper.find(".expansion-card--expanded").exists()).toBe(false);
    expect(wrapper.find(".expansion-card__contract-icon").exists()).toBe(false);

    expect(wrapper.emitted().expanded).toBeTruthy();
    expect(wrapper.emitted().expanded).toEqual([[true], [false]]);
  });
});

describe('Prop "variant" tests', () => {
  const variantStyles = {
    turquoise: "expansion-card--turquoise",
    green: "expansion-card--green",
    blue: "expansion-card--blue",
    purple: "expansion-card--purple",
    pink: "expansion-card--pink",
    red: "expansion-card--red",
    orange: "expansion-card--orange",
    yellow: "expansion-card--yellow",
    gray: "expansion-card--gray",
  };
  const variants = Object.keys(variantStyles);

  variants.forEach((variant) => {
    const expectedStyle = variantStyles[variant];

    test(`if the computed property changes when the prop variant is set to '${variant}'`, () => {
      const wrapper = mount(ExpansionCard, {
        localVue,
        propsData: {
          variant,
        },
      });

      expect(wrapper.find(".expansion-card").exists()).toBe(true);

      expect(wrapper.vm.variantStyle).toBe(expectedStyle);
    });
  });
});
