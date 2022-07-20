<script setup>
import { ref, computed } from "vue";
import orderBy from "lodash/orderby";
import { useFetchResource } from "./../composables/useFetchResource.js";

const { fetchResource } = useFetchResource();

const locations = ref([]);
const characters = ref([]);
const loadingLocations = ref(null);
const loadingCharacters = ref(null);
const locationsUrl = "https://rickandmortyapi.com/api/location";
const charactersUrl = "https://rickandmortyapi.com/api/character";

const orderKeyCharacters = ref("id");
const orderKeyLocations = ref("id");

const setOrderKeyChars = (key) => (orderKeyCharacters.value = key);
const setOrderKeyLoc = (key) => (orderKeyLocations.value = key);

const charactersOrdered = computed(() =>
  orderBy(characters.value, orderKeyCharacters.value)
);
const locationsOrdered = computed(() =>
  orderBy(locations.value, orderKeyLocations.value)
);

fetchResource(locationsUrl, loadingLocations, locations);
fetchResource(charactersUrl, loadingCharacters, characters);
</script>

<template>
  <div>
    <div class="border-b-2 pb-4 border-gray-300 text-center">
      Order Characters by
      <button class="btn bg-blue-500 mr-4" @click="setOrderKeyChars('name')">
        Name
      </button>
      <button class="btn bg-orange-500" @click="setOrderKeyChars('id')">
        Id
      </button>
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

    <div class="border-b-2 pb-4 border-gray-300 text-center">
      Order Locations by
      <button class="btn bg-blue-500 mr-4" @click="setOrderKeyLoc('name')">
        Name
      </button>
      <button class="btn bg-orange-500" @click="setOrderKeyLoc('id')">
        Id
      </button>
    </div>
    <div class="m-auto container flex flex-wrap mt-10">
      <div
        v-for="location in locationsOrdered"
        :key="location.id"
        class="xl:w-1/5 lg:w-1/4 md:w-1/3 w-1/2 card"
      >
        <div class="card-inner">
          <div class="content text-center mt-5">
            <span class="header text-xl">{{ location.name }}</span>
            <div class="text-center text-gray-500 text-sm">
              <div class="">Status: {{ location.type }}</div>
              <div>{{ location.dimension }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="loadingCharacters && loadingLocations === 'loading'"
      class="loading"
    >
      <span class="text-gray-500">Loading resource...</span>
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
