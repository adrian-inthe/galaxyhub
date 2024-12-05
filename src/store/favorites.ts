import { defineStore } from "pinia";

import {
  People,
  Planet,
  ResourceInterface,
  Starship,
  SWAPIResourceName,
} from "../types/global";
import { get, set } from "../services/cache.ts";

const CACHE_KEY_FAVORITE_PEOPLE = "favorite:people";
const CACHE_KEY_FAVORITE_PLANETS = "favorite:planets";
const CACHE_KEY_FAVORITE_STARSHIPS = "favorite:starships";

export const useFavoritesStore = defineStore("store", {
  state: () => ({
    favoritePeople: (get(CACHE_KEY_FAVORITE_PEOPLE) || []) as People[],
    favoritePlanets: (get(CACHE_KEY_FAVORITE_PLANETS) || []) as Planet[],
    favoriteStarships: (get(CACHE_KEY_FAVORITE_STARSHIPS) || []) as Starship[],
  }),

  actions: {
    setFavorite(resourceName: SWAPIResourceName, data: ResourceInterface) {
      switch (resourceName) {
        case "people":
          this.favoritePeople.push(data as People);
          set(CACHE_KEY_FAVORITE_PEOPLE, this.favoritePeople);
          break;
        case "planets":
          this.favoritePlanets.push(data as Planet);
          set(CACHE_KEY_FAVORITE_PLANETS, this.favoritePlanets);
          break;
        case "starships":
          this.favoriteStarships.push(data as Starship);
          set(CACHE_KEY_FAVORITE_STARSHIPS, this.favoriteStarships);
          break;
        default:
          console.error("Unrecognized resource name", resourceName);
      }
    },

    findFavorite(resourceName: SWAPIResourceName, url: string): number {
      switch (resourceName) {
        case "people":
          return this.favoritePeople.findIndex(
            (favorite) => favorite.url === url,
          );
        case "planets":
          return this.favoritePlanets.findIndex(
            (favorite) => favorite.url === url,
          );
        case "starships":
          return this.favoriteStarships.findIndex(
            (favorite) => favorite.url === url,
          );
        default:
          console.error("Unrecognized resource name", resourceName);
      }
      return -1;
    },

    deleteFavorite(resourceName: SWAPIResourceName, url: string) {
      let index = this.findFavorite(resourceName, url);
      if (index === -1) {
        console.error(
          "Could not find favorite resource to delete",
          resourceName,
          url,
        );
        return;
      }
      switch (resourceName) {
        case "people":
          this.favoritePeople.splice(index, 1);
          set(CACHE_KEY_FAVORITE_PEOPLE, this.favoritePeople);
          break;
        case "planets":
          this.favoritePlanets.splice(index, 1);
          set(CACHE_KEY_FAVORITE_PLANETS, this.favoritePlanets);
          break;
        case "starships":
          this.favoriteStarships.splice(index, 1);
          set(CACHE_KEY_FAVORITE_STARSHIPS, this.favoriteStarships);
          break;
      }
    },
  },
});
