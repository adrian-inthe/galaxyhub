<template>
  <div id="app">
    <div class="container mx-auto my-8 px-4">
      <main>
        <Suspense>
          <router-view />
        </Suspense>
      </main>
    </div>
  </div>
</template>
