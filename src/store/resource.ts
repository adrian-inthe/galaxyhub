import { defineStore } from "pinia";

import { SWAPIResourceName } from "../types/global";

export const useResourceStore = defineStore("resource", {
  state: () => ({
    resourceName: "" as SWAPIResourceName,
  }),

  actions: {
    setResourceName(resourceName: SWAPIResourceName) {
      const handledResourcesNames = ["people", "planets", "starships"];
      if (!handledResourcesNames.includes(resourceName)) {
        console.error("Cannot set an unhandled resource name", {
          resourceName,
          handledResourcesNames,
        });
        return;
      }
      this.resourceName = resourceName;
    },
  },
});
