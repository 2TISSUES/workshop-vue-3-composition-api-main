import axios from "axios";

export const useFetchResource = () => {
  const fetchResource = (resource, loadingState, store) => {
    loadingState.value = "loading";
    axios.get(`${resource}`).then((response) => {
      setTimeout(() => {
        loadingState.value = "success";
        store.value = response.data.results;
      }, 1000);
    });
  };

  return { fetchResource };
};
