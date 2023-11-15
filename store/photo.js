export const state = () => ({
  photos: [],
  fetchPhoto: true,
  fetchPhotoLoading: false,
});

export const mutations = {
  SET_PHOTOS(state, { data, per_page }) {
    state.photos = data;
    state.fetchPhoto = data.length === per_page;
  },
};

export const actions = {
  async getImages({ state, commit }) {
    if (state.fetchPhoto) {
      const { data } = await this.$axios.get("user/photos");
      commit("SET_PHOTOS", data.photos);
    }
  },
};

export const getters = {
  photos: (state) => state.photos,
};
