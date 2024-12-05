import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "./HomeView.vue";
import { useResourceStore } from "../store/resource";
import { useFavoritesStore } from "../store/favorites";
import NavigationCard from "../components/NavigationCard.vue";
import ResourceList from "../components/ResourceList.vue";

vi.mock("../store/resource", () => ({
  useResourceStore: vi.fn(),
}));

vi.mock("../store/favorites", () => ({
  useFavoritesStore: vi.fn(),
}));

describe("GalaxyHub.vue", () => {
  let resourceStoreMock: any;
  let favoritesStoreMock: any;

  beforeEach(() => {
    resourceStoreMock = {
      resourceName: null,
      setResourceName: vi.fn(),
    };

    favoritesStoreMock = {
      favoritePeople: [],
      favoritePlanets: [],
      favoriteStarships: [],
      findFavorite: vi.fn(),
    };

    (useResourceStore as any).mockReturnValue(resourceStoreMock);
    (useFavoritesStore as any).mockReturnValue(favoritesStoreMock);
  });

  it("displays the logo, the title, and tagline", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.find('img[alt="logo"]').exists()).toBe(true);
    expect(wrapper.find("h1").text()).toBe("Galaxy Hub");
    expect(wrapper.find("p").text()).toBe(
      "Everything about the Star Wars universe!",
    );
  });

  it("displays the three resource cards", () => {
    const cards = mount(HomeView).findAllComponents(NavigationCard);
    expect(cards).toHaveLength(3);
    expect(cards.at(0)?.props()).toMatchObject({
      title: "Characters",
      description: "Meet the heroes, villains, and all the legends in between.",
    });
    expect(cards.at(1)?.props()).toMatchObject({
      title: "Planets",
      description: "Explore iconic worlds from Tatooine to Coruscant!",
    });
    expect(cards.at(2)?.props()).toMatchObject({
      title: "Starships",
      description:
        "Zoom through the galaxy in the fastest ships known to the Force.",
    });
  });

  it("displays favorite resource lists if favorites are set", () => {
    favoritesStoreMock.favoritePeople = [{ name: "Luke Skywalker" }];
    favoritesStoreMock.favoritePlanets = [{ name: "Tatooine" }];
    favoritesStoreMock.favoriteStarships = [{ name: "X-Wing" }];

    const wrapper = mount(HomeView);

    const favoritePeopleList = wrapper
      .findAllComponents(ResourceList)
      .filter((component) => component.props("resourceName") === "people");
    const favoritePlanetsList = wrapper
      .findAllComponents(ResourceList)
      .filter((component) => component.props("resourceName") === "planets");
    const favoriteStarshipsList = wrapper
      .findAllComponents(ResourceList)
      .filter((component) => component.props("resourceName") === "starships");

    expect(favoritePeopleList).toHaveLength(1);
    expect(favoritePlanetsList).toHaveLength(1);
    expect(favoriteStarshipsList).toHaveLength(1);
  });
});
