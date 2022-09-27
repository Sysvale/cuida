import { mount, createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import lodash from "lodash";
import NavBar from "../../src/components/NavBar.vue";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const mockedData = [
  { label: "Dummy label 1", path: "dummy/path/1" },
  { label: "Dummy label 2", path: "dummy/path/2" },
  { label: "Dummy label 3", path: "dummy/path/3" },
  {
    label: "Dummy option with subitems 1",
    items: [
      {
        label: "Dummy item 1",
        path: "/dummy/sub/item/1",
      },
      {
        label: "Dummy item 2",
        path: "/dummy/sub/item/2",
      },
      {
        label: "Dummy item 3",
        path: "/dummy/sub/item/3",
      },
    ],
  },
  {
    label: "Dummy option with subitems 2",
    items: [
      {
        label: "Dummy item 4",
        route: {
          path: "/dummy/sub/item/4",
          name: "dummy-item-4",
        },
      },
      {
        label: "Dummy item 5",
        route: {
          path: "/dummy/sub/item/5",
          name: "dummy-item-5",
        },
      },
      {
        label: "Dummy item 6",
        route: {
          path: "/dummy/sub/item/5",
          name: "dummy-item-5",
        },
      },
    ],
  },
];

test("Component is mounted properly", () => {
  window._ = lodash;
  const wrapper = mount(NavBar, {
    localVue,
    propsData: {
      items: mockedData,
      activeItem: mockedData[0],
    },
  });
  expect(wrapper).toMatchSnapshot();
});

describe('"items" prop is validated', () => {
  const validator = NavBar.props.items.validator;

  test('passes when "items" has route and label', () => {
    expect(validator(mockedData[4].items)).toBe(true);
  });

  test('passes when "items" has path and label', () => {
    expect(validator(mockedData[3].items)).toBe(true);
  });

  test('throws exception when some element of "items" has not label', () => {
    expect(validator([{ path: "dummy/path/0" }, ...mockedData])).toBe(false);
  });

  test('throws exception when some element of "items" has not path, route or items', () => {
    expect(validator([{ label: "Dummy label 0" }, ...mockedData])).toBe(false);
  });
});

describe('"activeColor" prop is validated', () => {
  const validator = NavBar.props.activeColor.validator;

  test('passes when "activeColor" is an hexadecimal color', () => {
    expect(validator("#FFF")).toBe(true);
  });

  test('passes when "activeColor" is a predefined color', () => {
    expect(validator("turquoise")).toBe(true);
  });

  test('throws exception when "activeColor" is not a predefined or hexadecimal color', () => {
    expect(validator("dummy")).toBe(false);
  });
});

describe("Items styles test", () => {
  test("if has one item set as active", () => {
    window._ = lodash;
    const wrapper = mount(NavBar, {
      localVue,
      propsData: {
        items: mockedData,
        activeItem: mockedData[0],
      },
    });
    expect(wrapper.findAll(".active").length).toBe(1);
  });

  test("if has one subitem set as active", () => {
    window._ = lodash;
    const wrapper = mount(NavBar, {
      localVue,
      propsData: {
        items: mockedData,
        activeItem: mockedData[3].items[0],
      },
    });
    expect(wrapper.findAll(".active").length).toBe(1);
  });

  test("if the dropdown parent is set as active", () => {
    window._ = lodash;
    const wrapper = mount(NavBar, {
      localVue,
      propsData: {
        items: mockedData,
        activeItem: mockedData[3].items[0],
      },
    });
    expect(wrapper.findAll(".active-parent").length).toBe(1);
  });

  test("if light mode is set properly", () => {
    window._ = lodash;
    const wrapper = mount(NavBar, {
      localVue,
      propsData: {
        items: mockedData,
        isLightThemed: true,
        activeItem: mockedData[0],
      },
    });

    expect(wrapper.findAll(".cds-nav-bar--light").length).toBe(1);
    expect(wrapper.findAll(".cds-nav-bar__item--light").length).toBe(
      mockedData.length
    );
  });
});

describe("Change active item event tests", () => {
  test("if a event is emitted when the item is clicked", () => {
    window._ = lodash;
    const wrapper = mount(NavBar, {
      localVue,
      propsData: {
        items: mockedData,
        activeItem: mockedData[0],
      },
    });

    const elementIndex = 1;

    wrapper
      .find(
        `#${wrapper.vm.getElementKey(mockedData[elementIndex], elementIndex)} a`
      )
      .trigger("click");

    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click).toEqual([[mockedData[elementIndex]]]);
  });

  test("if a event is emitted when the subitem is clicked", () => {
    window._ = lodash;
    const wrapper = mount(NavBar, {
      localVue,
      propsData: {
        items: mockedData,
        activeItem: mockedData[0],
      },
    });

    wrapper
      .find(`#${wrapper.vm.getElementKey(mockedData[3].items[0], 0, true)}`)
      .trigger("click");

    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click).toEqual([[mockedData[3].items[0]]]);
  });
});
