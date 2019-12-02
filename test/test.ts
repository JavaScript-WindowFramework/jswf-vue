import { mount } from "@vue/test-utils";
import { JSWindow, WindowInfo, SplitView } from "../dist";

describe("Component JSWindow", () => {
  const wrapper = mount(JSWindow);
  it("Create", () => {

    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it("param x", () => {
    const update = wrapper.emitted("onUpdate") as WindowInfo[][];
    expect(update && update.length).toBe(1)
    expect(update[0][0].x).toBe(192);
  });

});

describe("Component SplitView", () => {
  it("Create", () => {
    const wrapper = mount(SplitView);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
