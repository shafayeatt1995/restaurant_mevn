export const state = () => ({
  photos: [],
  perPage: 50,
  isLoading: true,
  click: true,
});

export const mutations = {
  SET_PHOTOS(state, { data }) {
    state.photos = [...state.photos, ...data];
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_CLICK(state, payload) {
    state.click = payload;
  },
  RESET(state) {
    state.photos = [];
    state.perPage = 13;
    state.isLoading = true;
    state.click = true;
  },
};

export const actions = {
  async getImages({ state, commit }) {
    commit;
    const { perPage, photos, click } = state;
    if (click) {
      try {
        commit("SET_CLICK", false);
        commit("SET_LOADING", true);
        const { data } = await this.$axios.post("user/photos", {
          perPage,
          page: photos.length / perPage + 1,
        });
        commit("SET_PHOTOS", data.photos);
      } catch (error) {
        console.log(error);
      } finally {
        commit("SET_LOADING", false);
        commit("SET_CLICK", true);
      }
    }
  },
  reset({ commit }) {
    commit("RESET");
  },
};

export const getters = {
  photos: ({ photos }) => photos,
  isLoading: ({ isLoading }) => isLoading,
};
