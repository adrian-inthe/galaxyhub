import { ResourceNameInterfaceMap, SWAPIResourceName } from "../types/global";
import { PagedResponse } from "../types/api";
import { extractPageNumber } from "./utils/apiHelpers.ts";
import { get, set } from "./cache.ts";

export const SWAPI_BASE_URL = "https://swapi.dev/api";

export async function fetchAndCache(url: string): Promise<any> {
  if (!url) {
    console.error("URL cannot be empty");
    return;
  }
  const cached = get(url);
  if (cached) {
    return cached;
  }
  const response = await fetch(url, {
    headers: { accept: "application/json" },
  });
  const result = await response.json();
  set(url, result);
  return result;
}

export async function fetchResourceList<
  K extends keyof ResourceNameInterfaceMap,
>(
  resourceName: K,
  pageNumber: number | null,
): Promise<[ResourceNameInterfaceMap[K][], number, number | null]> {
  if (!isResourceNameValid(resourceName)) {
    throw new Error("Resource name unrecognized");
  }

  try {
    const {
      results,
      count,
      next: nextPageUrl,
    } = (await fetchAndCache(
      `${SWAPI_BASE_URL}/${resourceName}?page=${!pageNumber ? 1 : pageNumber}`,
    )) as PagedResponse<ResourceNameInterfaceMap[K]>;
    return [
      results,
      count,
      nextPageUrl ? extractPageNumber(nextPageUrl) : null,
    ];
  } catch (error) {
    console.error("Error while fetching resource list", error);
    throw new Error("Error while fetching resource list");
  }
}

export const SWAPI_RESOURCE_NAMES = [
  "films",
  "people",
  "planets",
  "species",
  "starships",
  "vehicles",
] as const;

export async function fetchResourceItem<
  K extends keyof ResourceNameInterfaceMap,
>(resourceName: K, resourceId: number): Promise<ResourceNameInterfaceMap[K]> {
  if (!isResourceNameValid(resourceName)) {
    throw new Error("Resource name unrecognized");
  }

  try {
    return (await fetchAndCache(
      `${SWAPI_BASE_URL}/${resourceName}/${resourceId}`,
    )) as ResourceNameInterfaceMap[K];
  } catch (error) {
    console.error("Error while fetching resource item", error);
    throw new Error("Error while fetching resource item");
  }
}

function isResourceNameValid(resourceName: SWAPIResourceName) {
  if (!SWAPI_RESOURCE_NAMES.includes(resourceName)) {
    console.error("Resource name unrecognized", {
      resourceName,
      SWAPIResourceNames: SWAPI_RESOURCE_NAMES,
    });
    return false;
  }
  return true;
}
