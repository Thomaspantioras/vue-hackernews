import { shallowMount } from "@vue/test-utils";
import ProgressBar from "../ProgressBar.vue";

describe("ProgressBar.vue", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Replaces the global timer functions with Jest implementations
  });

  test("is hidden on initial render", () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain("hidden"); // #A
  });

  test("initializes with 0% width", () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.element.style.width).toBe("0%"); // //Checks the wrapper element’s inline width property
  });

  // Testing component state
  it("should display the bar when start is called", () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain("hidden"); // Asserts that the hidden class exists
    wrapper.vm.start(); // Triggers the test input by calling the start method on the component instance
    expect(wrapper.classes()).not.toContain("hidden"); // Asserts that the hidden class was removed
  });

  test("hides the bar when finish is called", () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    wrapper.vm.finish();
    expect(wrapper.classes()).toContain("hidden");
  });

  it("should reset to 0% width when start is called ", () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.finish();
    wrapper.vm.start();
    expect(wrapper.element.style.width).toBe("0%");
  });

  // Moving the time forward with fake timers
  it("should increase width by 1% every 100ms after start call", () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    jest.runTimersToTime(100); // Moves the global time forward 100 ms, and fires any timer callback that is scheduled to run after 100 ms
    expect(wrapper.element.style.width).toBe("1%");
    jest.runTimersToTime(900); // Moves the time forward again by 900 ms; note that the total time now elapsed is 1,000 ms
    expect(wrapper.element.style.width).toBe("10%");
    jest.runTimersToTime(4000);
    expect(wrapper.element.style.width).toBe("50%");
  });

  // Using jest.spyOn to test clearInterval
  it("should clear timer when finish is called", () => {
    jest.spyOn(window, "clearInterval"); // Spies on the clearInterval function
    setInterval.mockReturnValue(123); // Configures setInterval to return 123

    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    wrapper.vm.finish();
    expect(window.clearInterval).toHaveBeenCalledWith(123); // Asserts that the clearInterval mock was called with the value returned from setInterval
  });
});
