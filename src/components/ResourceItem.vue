<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="`Details for ${'name' in dialogDetails ? dialogDetails.name : dialogDetails.title}`"
    class="w-11/12"
    modal
  >
    <div v-if="areDetailsLoading" class="flex justify-center items-center">
      <ProgressSpinner />
    </div>
    <div v-else class="flex flex-wrap gap-4 mb-2">
      <div
        v-for="[key, value] in Object.entries(dialogDetails)"
        :key="key"
        class="flex-1 min-w-[200px] p-4 bg-white dark:bg-black rounded-lg"
      >
        <h2
          class="text-2xl text-gray-700 dark:text-white font-semibold uppercase text-center mb-3"
        >
          {{ key.replaceAll("_", " ") }}
        </h2>
        <p class="text-s text-gray-500 text-center mb-5">
          {{ Array.isArray(value) ? value.join(", ") : value }}
        </p>
      </div>
    </div>
    <div class="flex justify-end">
      <Button
        label="Close"
        type="button"
        @click="dialogVisible = false"
      ></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import { onMounted, PropType, ref, Ref, watch } from "vue";
import { ResourceInterface, SWAPIResourceName } from "../types/global";
import {
  fetchResourceItem,
  SWAPI_BASE_URL,
  SWAPI_RESOURCE_NAMES,
} from "../services/api.ts";

const emit = defineEmits(["dialogClosed"]);

const props = defineProps({
  data: {
    type: Object as PropType<ResourceInterface>,
    required: true,
  },
});

const dialogVisible = ref(true);
const areDetailsLoading = ref(true);
const dialogDetails: Ref<Record<string, string | string[]>> = ref({});

watch(dialogVisible, (newValue) => {
  if (!newValue) {
    emit("dialogClosed");
  }
});

onMounted(showMore);

async function showMore() {
  areDetailsLoading.value = true;
  dialogVisible.value = true;

  const allPromises = [];
  for (const [resourcePropertyName, resourcePropertyValue] of Object.entries(
    props.data,
  )) {
    if (["url", "created", "edited"].includes(resourcePropertyName)) continue;

    if (isAListOfResourcesUrls(resourcePropertyValue)) {
      allPromises.push(
        Promise.allSettled(
          resourcePropertyValue.map(fetchResourceDataName),
        ).then((promises) => {
          dialogDetails.value[resourcePropertyName] = promises
            .filter((promise) => promise.status === "fulfilled")
            .map((promise) => promise.value);
        }),
      );
    } else if (isAResourceUrl(resourcePropertyValue)) {
      allPromises.push(
        fetchResourceDataName(resourcePropertyValue).then(
          (name) => (dialogDetails.value[resourcePropertyName] = name),
        ),
      );
    } else if (isAResourceName(resourcePropertyValue)) {
      dialogDetails.value[resourcePropertyName] = resourcePropertyValue;
    }
  }

  await Promise.allSettled(allPromises);
  areDetailsLoading.value = false;
}

async function fetchResourceDataName(url: string) {
  const match = url.match(/https:\/\/swapi\.dev\/api\/([^\/]+)\/(\d+)\//);
  if (match && SWAPI_RESOURCE_NAMES.includes(match[1] as SWAPIResourceName)) {
    try {
      let resourceName = match[1] as SWAPIResourceName;
      const resourceId = parseInt(match[2]);
      const resourceData = await fetchResourceItem(resourceName, resourceId);
      return "name" in resourceData ? resourceData.name : resourceData.title;
    } catch {
      return "";
    }
  } else {
    return "";
  }
}

function isAListOfResourcesUrls(resourcePropertyValue: any) {
  return (
    Array.isArray(resourcePropertyValue) &&
    resourcePropertyValue.length &&
    resourcePropertyValue[0].includes(SWAPI_BASE_URL)
  );
}

function isAResourceUrl(resourcePropertyValue: any) {
  return (
    typeof resourcePropertyValue === "string" &&
    resourcePropertyValue.includes(SWAPI_BASE_URL)
  );
}

function isAResourceName(resourcePropertyValue: any) {
  return typeof resourcePropertyValue === "string";
}
</script>
