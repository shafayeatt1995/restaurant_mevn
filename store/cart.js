export const state = () => ({
  cartItems: [],
});

export const mutations = {
  SET_ITEMS(state, payload) {
    const key = state.cartItems.findIndex(({ _id, choice, addon }) => {
      return (
        _id === payload._id &&
        choice._id === payload.choice._id &&
        compareArrays(payload.addon, addon)
      );
    });
    if (key === -1) {
      state.cartItems.push(payload);
    } else {
      state.cartItems[key].qty++;
    }
    window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  },
  SET_INITIAL_ITEMS(state) {
    const cartItems = window.localStorage.getItem("cartItems");
    if (cartItems) {
      state.cartItems = JSON.parse(cartItems);
    }
  },
  RESET(state) {
    state.cartItems = [];
  },
};

export const actions = {
  addCartItems({ commit }, payload) {
    commit("SET_ITEMS", payload);
  },
  setCartItems({ commit }) {
    commit("SET_INITIAL_ITEMS");
  },
};

export const getters = {
  cartItems: ({ cartItems }) => cartItems,
};

const compareArrays = (array1, array2) => {
  return (
    array1.length === array2.length &&
    array1
      .map((obj) => obj._id)
      .sort()
      .join() ===
      array2
        .map((obj) => obj._id)
        .sort()
        .join()
  );
};
