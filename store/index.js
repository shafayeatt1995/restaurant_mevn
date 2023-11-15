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
  nuxtClientInit({ commit }) {
    commit("SET_WINDOW_WIDTH", window.innerWidth);
  },
};

export const getters = {
  windowWidth: (state) => state.windowWidth,
  admin: (state) =>
    (state.auth?.user?.is_admin && state.auth?.user?.type === "admin") || false,
  owner: (state) => state.auth?.user?.type === "owner" || false,
  waiter: (state) => state.auth?.user?.type === "waiter" || false,
  user: (state) => state.auth?.user?.type === "user" || false,
};
