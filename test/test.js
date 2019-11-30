import { mount } from "@vue/test-utils";
import { JSWindow } from "../dist/";

describe("ExampleComponent", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(JSWindow,{x:0,y:0});
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("ExampleComponent", () => {
  it("param x", () => {
    const wrapper = mount(JSWindow);
    const update = wrapper.emitted("onUpdate");
    expect(update.realX).toBe(100);
  });
});
