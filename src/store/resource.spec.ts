import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia } from "pinia";
import { useResourceStore } from "./resource.ts";
import { createApp } from "vue";

vi.spyOn(console, "error").mockImplementation(() => {});

describe("useResourceStore", () => {
  let pinia: any;
  let store: any;

  beforeEach(() => {
    pinia = createPinia();
    const app = createApp({});
    app.use(pinia);
    store = useResourceStore(pinia);
  });

  it("should initialize with an empty resourceName", () => {
    expect(store.resourceName).toBe("");
  });

  it("should set valid resource names", () => {
    store.setResourceName("people");
    expect(store.resourceName).toBe("people");

    store.setResourceName("planets");
    expect(store.resourceName).toBe("planets");

    store.setResourceName("starships");
    expect(store.resourceName).toBe("starships");
  });

  it("should log an error and not change resourceName for an invalid resource name", () => {
    store.setResourceName("invalidResourceName");
    expect(console.error).toHaveBeenCalledWith(
      "Cannot set an unhandled resource name",
      {
        resourceName: "invalidResourceName",
        handledResourcesNames: ["people", "planets", "starships"],
      },
    );
    expect(store.resourceName).toBe("");
  });
});
