<script setup>
import { ref, computed } from "vue";
import orderBy from "lodash/orderby";
import { useFetchResource } from "./../composables/useFetchResource.js";
import { useGlobalEvent } from "./../composables/useGlobalEvent.js";

const orderKey = ref("id");

const setOrderKey = (key) => (orderKey.value = key);

const {
  data: characters,
  loadingState,
  fetchResource: fetchAllCharacters,
} = useFetchResource("https://rickandmortyapi.com/api/character");
fetchAllCharacters();

const {
  data: locations,
  loadingState: loadingLocations,
  fetchResource: fetchLocations,
} = useFetchResource("https://rickandmortyapi.com/api/location");
fetchLocations();

const charactersOrdered = computed(() =>
  orderBy(characters.value, orderKey.value)
);

useGlobalEvent("keypress", () => characters.value.pop());
</script>

<template>
  <div>
    <div class="border-b-2 pb-4 border-gray-300 text-center">
      Order Characters by
      <button class="btn bg-blue-500 mr-4" @click="setOrderKey('name')">
        Name
      </button>
      <button class="btn bg-orange-500" @click="setOrderKey('id')">Id</button>
    </div>
    <div class="m-auto container flex flex-wrap mt-10">
      <div
        v-for="character in charactersOrdered"
        :key="character.id"
        class="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2 card"
      >
        <div class="card-inner">
          <div class="image">
            <img
              :src="character.image"
              class="bg-gray-200"
              height="300"
              width="300"
            />
          </div>
          <div class="content text-center mt-5">
            <span class="header text-xl">{{ character.name }}</span>
            <div class="text-center text-gray-500 text-sm">
              <div class="">Status: {{ character.status }}</div>
              <div>{{ character.species }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h1 class="text-2xl">Locations</h1>
      <table class="table-fixed w-full text-left">
        <thead class="bg-gray-500">
          <tr>
            <th class="font-bold p-2">Name</th>
            <th class="font-bold">Type</th>
            <th class="font-bold">Dimension</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="location in locations" :key="location.id">
            <td>{{ location.name }}</td>
            <td>{{ location.type }}</td>
            <td>{{ location.dimension }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="loadingState === 'loading' || loadingLocations === 'loading'"
      class="loading"
    >
      <span class="text-gray-500">Loading resources...</span>
      <img src="/spinner.svg" alt="loading" />
    </div>
  </div>
</template>

<style scoped>
.btn {
  @apply px-6 py-1 text-white rounded;
}
.card-inner {
  @apply p-4 shadow-md rounded m-2;
}
.card-inner img {
  @apply rounded;
  max-width: auto;
  display: block;
}
.loading {
  @apply fixed top-0 left-0 right-0 bottom-0 bg-white flex justify-center items-center;
}
</style>
