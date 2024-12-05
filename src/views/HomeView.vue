<template>
  <div class="flex justify-center">
    <img alt="logo" class="w-20" src="/logo.png" />
  </div>
  <h1
    class="text-gray-900 dark:text-white font-sf text-6xl font-extrabold text-center mt-10 mb-7 drop-shadow-lg"
  >
    Galaxy Hub
  </h1>
  <p class="text-gray-500 text-s tracking-wide mb-20 text-center">
    <span class="uppercase">Everything about the </span>
    <span class="font-sf">Star Wars</span>
    <span class="uppercase"> universe!</span>
  </p>
  <nav class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
    <NavigationCard
      :class="{
        '!shadow-lg': resourceName === 'people',
      }"
      description="Meet the heroes, villains, and all the legends in between."
      iconSrc="boba-fett.png"
      title="Characters"
      @click="setResourceName('people')"
    />
    <NavigationCard
      :class="{
        '!shadow-lg': resourceName === 'planets',
      }"
      description="Explore iconic worlds from Tatooine to Coruscant!"
      iconSrc="planet.png"
      title="Planets"
      @click="setResourceName('planets')"
    />
    <NavigationCard
      :class="{
        '!shadow-lg': resourceName === 'starships',
      }"
      description="Zoom through the galaxy in the fastest ships known to the Force."
      iconSrc="x-wing.png"
      title="Starships"
      @click="setResourceName('starships')"
    />
  </nav>
</template>

<script async lang="ts" setup>
import { computed } from "vue";
import NavigationCard from "../components/NavigationCard.vue";
import { useResourceStore } from "../store/resource.ts";
import { SWAPIResourceName } from "../types/global";

const resourceStore = useResourceStore();

const resourceName = computed({
  get: (): string | null => resourceStore.resourceName,
  set: (value: SWAPIResourceName) => {
    resourceStore.setResourceName(value);
  },
});

async function setResourceName(name: SWAPIResourceName) {
  resourceName.value = name;
}
</script>
