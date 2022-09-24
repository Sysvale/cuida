import { shallowMount, createLocalVue } from "@vue/test-utils";
import Table from "../../src/components/Table.vue";
import flushPromises from "flush-promises";

const localVue = createLocalVue();

const fields = ["field1", "field2", "field3"];

describe("Table", () => {
  test("component renders correctly", async () => {
    const wrapper = shallowMount(Table, {
      localVue,
      propsData: {
        fields,
        items: [
          {
            field1: "field 1 content",
            field2: "field 2 content",
            field3: "field 3 content",
          },
          {
            field1: "field 1 content",
            field2: "field 2 content",
            field3: "field 3 content",
          },
        ],
      },
    });

    await flushPromises();

    expect(wrapper).toMatchSnapshot();
  });

  test("fields are built correctly based on fields prop", async () => {
    const wrapper = shallowMount(Table, {
      localVue,
      propsData: {
        fields: [
          {
            key: "field1",
            label: "Field 1",
          },
          "field2",
          "Field3",
        ],
        items: [
          {
            field1: "field 1 content",
            field2: "field 2 content",
            Field3: "field 3 content",
          },
          {
            field1: "field 1 content",
            field2: "field 2 content",
            Field3: "field 3 content",
          },
        ],
      },
    });

    const fieldsToMatch = [
      {
        key: "field1",
        label: "Field 1",
      },
      {
        key: "field2",
        label: "Field 2",
      },
      {
        key: "Field3",
        label: "Field 3",
      },
    ];

    await flushPromises();

    expect(wrapper.vm.computedFields).toMatchObject(fieldsToMatch);
  });

  test("fields are built correctly based on items", async () => {
    const wrapper = shallowMount(Table, {
      localVue,
      propsData: {
        items: [
          {
            field1: "field 1 content",
            field2: "field 2 content",
            field3: "field 3 content",
          },
          {
            field1: "field 1 content",
            field2: "field 2 content",
            field3: "field 3 content",
            field4: "field 4 content",
          },
        ],
      },
    });

    const fieldsToMatch = [
      {
        key: "field1",
        label: "Field 1",
      },
      {
        key: "field2",
        label: "Field 2",
      },
      {
        key: "field3",
        label: "Field 3",
      },
    ];

    await flushPromises();

    expect(wrapper.vm.computedFields).toMatchObject(fieldsToMatch);
  });
});
