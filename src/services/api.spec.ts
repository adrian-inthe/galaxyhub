import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchAndCache, fetchResourceList, SWAPI_BASE_URL } from "./api";
import { get, set } from "./cache";
import { SWAPIResourceName } from "../types/global";

vi.mock("./cache", () => ({
  get: vi.fn(),
  set: vi.fn(),
}));
globalThis.fetch = vi.fn();

describe("api.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchAndCache", () => {
    it("should return cached data if available", async () => {
      const url = `${SWAPI_BASE_URL}/people`;
      const dataInCache = { somefield: "somevalue" };
      (get as any).mockReturnValueOnce(dataInCache);

      const result = await fetchAndCache(url);

      expect(get).toHaveBeenCalledWith(url);
      expect(result).toEqual(dataInCache);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should fetch data from API and cache it if not in cache", async () => {
      const url = `${SWAPI_BASE_URL}/people`;
      const apiResponse = { somefield: "somevalue" };
      (get as any).mockReturnValueOnce(null);
      (set as any).mockImplementationOnce(() => {});
      (fetch as any).mockResolvedValueOnce({
        json: () => apiResponse,
      });

      const result = await fetchAndCache(url);

      expect(get).toHaveBeenCalledWith(url);
      expect(fetch).toHaveBeenCalledWith(url, {
        headers: { accept: "application/json" },
      });
      expect(set).toHaveBeenCalledWith(url, apiResponse);
      expect(result).toEqual(apiResponse);
    });

    it("should handle errors and return undefined if URL is empty", async () => {
      const spy = vi.spyOn(console, "error");
      const result = await fetchAndCache("");
      expect(result).toBeUndefined();
      expect(spy).toHaveBeenCalledWith("URL cannot be empty");
    });
  });

  describe("fetchResourceList", () => {
    it("should return the list of resources, count, and next page number", async () => {
      const mockApiResponse = {
        results: [{ somefield: "somevalue" }],
        count: 100,
        next: `${SWAPI_BASE_URL}/people?page=2`,
      };
      globalThis.fetch = vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockApiResponse),
      });

      const [results, count, nextPage] = await fetchResourceList("people", 1);

      expect(results).toEqual(mockApiResponse.results);
      expect(count).toBe(mockApiResponse.count);
      expect(nextPage).toBe(2);
    });

    it("should throw an error if the resource name is invalid", async () => {
      await expect(
        fetchResourceList("invalidResourceName" as SWAPIResourceName, 1),
      ).rejects.toThrowError("Resource name unrecognized");
    });
  });
});
