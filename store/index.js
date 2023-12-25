export const state = () => ({
  windowWidth: 0,
});

export const mutations = {
  SET_WINDOW_WIDTH(state, payload) {
    state.windowWidth = payload;
  },
};

export const actions = {
  async nuxtServerInit(context) {},
  async nuxtClientInit({ commit }) {
    await commit("SET_WINDOW_WIDTH", window.innerWidth);
  },
};

export const getters = {
  windowWidth: (state) => state.windowWidth,
  admin: (state) =>
    (state.auth?.user?.is_admin && state.auth?.user?.type === "admin") || false,
  owner: (state) => state.auth?.user?.type === "owner" || false,
  waiter: (state) => state.auth?.user?.type === "waiter" || false,
  chef: (state) => state.auth?.user?.type === "chef" || false,
  user: (state) => state.auth?.user?.type === "user" || false,
  restaurantSlug: (state) => state.auth?.user?.restaurant?.slug || "",
  scanDate(state) {
    if (state.auth?.user?.restaurant) {
      return new Date(state.auth?.user?.restaurant?.scanExp);
    } else {
      return new Date(new Date().setDate(new Date().getDate() - 1));
    }
  },
  activeScan: (state, getters) => {
    return getters.owner && getters.scanDate >= new Date();
  },
  analyticDate(state) {
    if (state.auth?.user?.restaurant) {
      return new Date(state.auth?.user?.restaurant?.analyticExp);
    } else {
      return new Date(new Date().setDate(new Date().getDate() - 1));
    }
  },
  activeAnalytic: (state, getters) => {
    return getters.owner && getters.analyticDate >= new Date();
  },
};
