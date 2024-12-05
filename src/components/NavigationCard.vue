<template>
  <Card class="cursor-pointer hover:shadow-lg">
    <template #title>
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-center">
          <img
            :src="`/${iconSrc}`"
            alt="Resource icon"
            class="w-12 sm:w-16 lg:w-20 mb-4"
          />
          <h2
            class="text-2xl text-gray-700 dark:text-white font-semibold uppercase"
          >
            {{ title }}
          </h2>
        </div>
      </div>
    </template>
    <template #content>
      <p class="m-0 text-gray-500 text-center">{{ description }}</p>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import Card from "primevue/card";

defineProps({
  iconSrc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
