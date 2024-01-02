export const state = () => ({
  images: [],
  perPage: 50,
  isLoading: true,
  click: true,
});

export const mutations = {
  SET_IMAGES(state, payload) {
    state.images = [...state.images, ...payload];
  },
  SET_LOADING(state, payload) {
    state.isLoading = payload;
  },
  SET_CLICK(state, payload) {
    state.click = payload;
  },
  RESET(state) {
    state.images = [];
    state.perPage = 13;
    state.isLoading = true;
    state.click = true;
  },
};

export const actions = {
  async getImages({ state, commit }) {
    const { perPage, images, click } = state;
    if (click) {
      try {
        commit("SET_CLICK", false);
        commit("SET_LOADING", true);
        const page = images.length / perPage + 1;
        if (Number.isInteger(page)) {
          const data = await this.$userApi.fetchImage({ perPage, page });
          commit("SET_IMAGES", data.images);
        }
      } catch (error) {
        console.error(error);
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
  images: ({ images }) => images,
  isLoading: ({ isLoading }) => isLoading,
};
