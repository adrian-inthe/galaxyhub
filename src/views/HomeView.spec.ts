import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "./HomeView.vue";

describe("GalaxyHub.vue", () => {
  it("displays the logo, the title, and tagline", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.find('img[alt="logo"]').exists()).toBe(true);
    expect(wrapper.find("h1").text()).toBe("Galaxy Hub");
    expect(wrapper.find("p").text()).toBe(
      "Everything about the Star Wars universe!",
    );
  });
});
