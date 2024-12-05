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
      description="Meet the heroes, villains, and all the legends in between."
      iconSrc="boba-fett.png"
      title="Characters"
    />
    <NavigationCard
      description="Explore iconic worlds from Tatooine to Coruscant!"
      iconSrc="planet.png"
      title="Planets"
    />
    <NavigationCard
      description="Zoom through the galaxy in the fastest ships known to the Force."
      iconSrc="x-wing.png"
      title="Starships"
    />
  </nav>
</template>

<script async lang="ts" setup>
import NavigationCard from "../components/NavigationCard.vue";
</script>
