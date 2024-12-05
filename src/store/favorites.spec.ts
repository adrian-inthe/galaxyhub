import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia } from "pinia";
import { useFavoritesStore } from "./favorites.ts";
import { set } from "../services/cache.ts";
import { createApp } from "vue";

vi.mock("../services/cache.ts", () => ({
  get: vi.fn(),
  set: vi.fn(),
}));

describe("useFavoritesStore", () => {
  let pinia: any;
  let store: any;

  beforeEach(() => {
    pinia = createPinia();
    const app = createApp({});
    app.use(pinia);
    store = useFavoritesStore(pinia);
  });

  it("should add a favorite resource", () => {
    const newPeople = { somefield: "somevalue", url: "https://people.url" };
    store.setFavorite("people", newPeople);
    expect(store.favoritePeople.includes(newPeople)).toBe(true);
    expect(set).toHaveBeenCalledWith("favorite:people", store.favoritePeople);

    const newPlanet = { somefield: "somevalue", url: "https://planet.url" };
    store.setFavorite("planets", newPlanet);
    expect(store.favoritePlanets.includes(newPlanet)).toBe(true);
    expect(set).toHaveBeenCalledWith("favorite:planets", store.favoritePlanets);

    const newStarship = { somefield: "somevalue", url: "https://starship.url" };
    store.setFavorite("starships", newStarship);
    expect(store.favoriteStarships.includes(newStarship)).toBe(true);
    expect(set).toHaveBeenCalledWith(
      "favorite:starships",
      store.favoriteStarships,
    );
  });

  it("should find an existing favorite resource", () => {
    store.favoritePeople = [
      { somefield: "somevalue", url: "https://people.url" },
    ];
    let index = store.findFavorite("people", "https://people.url");
    expect(index).toBe(0);

    store.favoritePlanets = [
      { somefield: "somevalue", url: "https://planet.url" },
    ];
    index = store.findFavorite("planets", "https://planet.url");
    expect(index).toBe(0);

    store.favoriteStarships = [
      { somefield: "somevalue", url: "https://starship.url" },
    ];
    index = store.findFavorite("starships", "https://starship.url");
    expect(index).toBe(0);
  });

  it("should return -1 if favorite is not found", () => {
    const index = store.findFavorite("people", "https://non-existing.url");
    expect(index).toBe(-1);
  });

  it("should delete a favorite resource", () => {
    store.favoritePeople = [
      { somefield: "somevalue", url: "https://people.url" },
    ];
    store.deleteFavorite("people", "https://people.url");
    expect(store.favoritePeople).not.toContain({
      somefield: "somevalue",
      url: "https://people.url",
    });
    expect(set).toHaveBeenCalledWith("favorite:people", store.favoritePeople);

    store.favoritePlanets = [
      { somefield: "somevalue", url: "https://planet.url" },
    ];
    store.deleteFavorite("planets", "https://planet.url");
    expect(store.favoritePlanets).not.toContain({
      somefield: "somevalue",
      url: "https://planet.url",
    });
    expect(set).toHaveBeenCalledWith("favorite:planets", store.favoritePlanets);

    store.favoriteStarships = [
      { somefield: "somevalue", url: "https://starship.url" },
    ];
    store.deleteFavorite("starships", "https://starship.url");
    expect(store.favoriteStarships).not.toContain({
      somefield: "somevalue",
      url: "https://starship.url",
    });
    expect(set).toHaveBeenCalledWith(
      "favorite:starships",
      store.favoriteStarships,
    );
  });

  it("should log an error if the resource name is unrecognized", () => {
    const spy = vi.spyOn(console, "error");
    store.setFavorite("notExistingResourceName", {
      url: "https://non-existing.url",
    });
    expect(spy).toHaveBeenCalledWith(
      "Unrecognized resource name",
      "notExistingResourceName",
    );
  });
});
