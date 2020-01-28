import { shallowMount } from "@vue/test-utils";
import ItemList from "../ItemList.vue";
import Item from "../../components/Item.vue";

describe("ItemList.vue", () => {
  // test("sanity test", () => {
  //   expect(true).toBe(true);
  // });
  test("should render an Item for each item in window.items", () => {
    window.items = [{}, {}, {}];
    const wrapper = shallowMount(ItemList);
    // findAll searches the rendered output for nodes that match a selector and returns an arraylike(wrapper array) object containing wrappers of matching nodes
    expect(wrapper.findAll(Item)).toHaveLength(window.items.length);
  });

  test("renders an Item with data for each item in window.items", () => {
    window.items = [{}, {}, {}];
    const wrapper = shallowMount(ItemList);
    const items = wrapper.findAll(Item); // Creates a WrapperArray of Item components
    // eslint-disable-next-line no-debugger
    debugger;
    expect(items).toHaveLength(window.items.length);
    items.wrappers.forEach((wrapper, i) => {
      // You can use the props method to assert that each Item component receives the correct item prop.
      expect(wrapper.props().item).toBe(window.items[i]); // Asserts that the Item at index i has a prop item with a value matching the item at index i
    });
  });

  // Stubbing a function with a Jest mock. Eg check if it's called when the component is mounted
  it("should call $bar start on load", () => {
    // Creates a fake $bar object
    const $bar = {
      start: jest.fn(), // Creates a jest mock using the jest.fn method
      finish: () => {}
    };
    shallowMount(ItemList, { mocks: { $bar } }); // Makes $bar available as this.$bar in ItemList
    expect($bar.start).toHaveBeenCalledTimes(1); // Uses the toHaveBeenCalledTimes matcher to check that $bar.start was called
  });
});
