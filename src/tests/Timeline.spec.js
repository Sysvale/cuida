import { mount, createLocalVue } from "@vue/test-utils";
import Timeline from "../../src/components/Timeline.vue";

const localVue = createLocalVue();

const history = [
  {
    date: "22/09/2022",
    title: "Bloqueio nível 1",
    text: "Usuário: Uncle Bob",
    _dotStyle: "hollowed",
  },
  {
    date: "15/05/2022",
    title: "Bloqueio nível 2",
    text: "Usuário: Linus Torvalds",
    _dotStyle: "hollowed",
  },
  {
    date: "18/02/2022",
    title: "Bloqueio nível 1",
    text: "Usuário: Don Norman",
  },
  {
    date: "20/12/2021",
    title: "Bloqueio nível 3",
    text: "Usuário: Richard Stallman",
    _dotStyle: "filled",
  },
  {
    date: "04/11/2021",
    title: "Bloqueio nível 1",
    text: "Usuário: Dennis Ritchie",
  },
];

test("Component is mounted properly", () => {
  const wrapper = mount(Timeline, {
    localVue,
    propsData: {
      history,
    },
  });

  expect(wrapper).toMatchSnapshot();
});

test("If the number of rows are the same of the length of the array", () => {
  const wrapper = mount(Timeline, {
    localVue,
    propsData: {
      history,
    },
  });

  expect(wrapper.findAll(".event__row").length).toBe(history.length);
});

test("If the UI elements of the timeline are displayed properly", () => {
  const wrapper = mount(Timeline, {
    localVue,
    propsData: {
      history,
    },
  });

  let filledPins = 0;
  let hollowedPins = 0;

  history.forEach((obj) => {
    filledPins +=
      obj._dotStyle === "filled" || typeof obj._dotStyle === "undefined"
        ? 1
        : 0;

    hollowedPins += obj._dotStyle === "hollowed" ? 1 : 0;
  });

  expect(wrapper.findAll(".event__pin--filled").length).toBe(filledPins);
  expect(wrapper.findAll(".event__pin--hollowed").length).toBe(hollowedPins);
  expect(wrapper.findAll(".timeline").length).toBe(history.length - 1);
});
