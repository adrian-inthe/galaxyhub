<template>
  <DataTable
    :first="firstItemToShowIndex"
    :lazy="!props.favorites"
    :loading="isLoading"
    :paginator="!props.favorites"
    :rows="!props.favorites ? itemsPerPage : undefined"
    :totalRecords="totalItems"
    :value="props.favorites || currentPageItems"
    @page="setCurrentPageItems"
  >
    <template #loading>
      <div class="flex justify-center items-center">
        <ProgressSpinner />
      </div>
    </template>
    <template v-if="resourceName === 'people'">
      <Column class="w-1/6 capitalize" field="name" header="Name" />
      <Column class="w-1/6 capitalize" field="gender" header="Gender" />
      <Column class="w-1/6 capitalize" field="eye_color" header="Eye Color" />
      <Column class="w-1/6 capitalize" field="hair_color" header="Hair Color" />
      <Column class="w-1/6 capitalize" field="birth_year" header="Birth Year" />
    </template>
    <template v-else-if="resourceName === 'planets'">
      <Column class="w-1/6 capitalize" field="name" header="Name" />
      <Column class="w-1/6 capitalize" field="climate" header="Climate" />
      <Column class="w-1/6 capitalize" field="terrain" header="Terrain" />
      <Column class="w-1/6 capitalize" field="diameter" header="Diameter" />
      <Column class="w-1/6 capitalize" field="population" header="Population" />
    </template>
    <template v-if="resourceName === 'starships'">
      <Column class="w-1/6 capitalize" field="name" header="Name" />
      <Column class="w-1/6 capitalize" field="starship_class" header="Class" />
      <Column
        class="w-1/6 capitalize"
        field="hyperdrive_rating"
        header="Hyperdrive"
      />
      <Column class="w-1/6 capitalize" field="crew" header="Crew" />
      <Column class="w-1/6 capitalize" field="passengers" header="Passengers" />
    </template>
    <Column class="w-1/6">
      <template #body="slotProps">
        <Button
          class="mr-2"
          icon="pi pi-search"
          label="More"
          severity="info"
          size="small"
          @click="dataForDialog = slotProps.data"
        />
        <template v-if="isInFavorites(slotProps.data.url)">
          <Button
            icon="pi pi-star-fill"
            size="small"
            @click="removeFromFavorites(slotProps.data.url)"
          />
        </template>
        <template v-else>
          <Button
            icon="pi pi-star"
            size="small"
            @click="addToFavorites(slotProps.data)"
          />
        </template>
      </template>
    </Column>
  </DataTable>
  <ResourceItem
    v-if="dataForDialog"
    :data="dataForDialog"
    @dialogClosed="onDialogClosed"
  />
</template>

<script async lang="ts" setup>
import { computed, onMounted, PropType, Ref, ref } from "vue";
import DataTable, { DataTablePageEvent } from "primevue/datatable";
import ProgressSpinner from "primevue/progressspinner";
import { useResourceStore } from "../store/resource.ts";

import { fetchResourceList } from "../services/api.ts";
import { ResourceInterface, SWAPIResourceName } from "../types/global";
import Column from "primevue/column";
import Button from "primevue/button";
import ResourceItem from "./ResourceItem.vue";
import { useFavoritesStore } from "../store/favorites.ts";

const resourceStore = useResourceStore();
const favoritesStore = useFavoritesStore();

const props = defineProps({
  favorites: {
    type: Object as PropType<ResourceInterface[]>,
    required: false,
  },
  resourceName: {
    type: String as PropType<SWAPIResourceName>,
    require: false,
  },
});

const allFetchedItems: Ref<ResourceInterface[]> = ref([]);
const totalItems = ref(0);
const itemsPerPage = 10;
const isLoading = ref(false);
const firstItemToShowIndex = ref(0);
const dataForDialog: Ref<ResourceInterface | null> = ref(null);

const resourceName = computed(
  () => props.resourceName || resourceStore.resourceName,
);
const currentPageItems = computed(() => {
  const startIndex = firstItemToShowIndex.value;
  const endIndex = startIndex + itemsPerPage;
  return allFetchedItems.value.slice(startIndex, endIndex);
});

onMounted(() => {
  if (!props.favorites) {
    fetchData(0);
  }
});

async function setCurrentPageItems(event: DataTablePageEvent) {
  firstItemToShowIndex.value = event.first;
  const startIndex = event.page * itemsPerPage;
  if (
    !allFetchedItems.value.slice(startIndex, startIndex + itemsPerPage).length
  ) {
    await fetchData(event.page);
  }
}

async function fetchData(datatablePageNumber: number) {
  isLoading.value = true;

  try {
    const [fetchedItems, total] = await fetchResourceList(
      resourceName.value,
      datatablePageNumber + 1,
    );

    const startIndex = datatablePageNumber * itemsPerPage;
    fetchedItems.forEach((item, index) => {
      allFetchedItems.value[startIndex + index] = item;
    });
    totalItems.value = total;
  } finally {
    isLoading.value = false;
  }
}

function onDialogClosed() {
  dataForDialog.value = null;
}

function addToFavorites(data: ResourceInterface) {
  favoritesStore.setFavorite(resourceName.value, data);
}

function isInFavorites(url: string): boolean {
  return favoritesStore.findFavorite(resourceName.value, url) !== -1;
}

function removeFromFavorites(url: string) {
  favoritesStore.deleteFavorite(resourceName.value, url);
}
</script>
