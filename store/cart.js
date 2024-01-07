export const state = () => ({
  cartItems: [],
  table: {},
  restaurantID: "",
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
    setCartData(state.cartItems);
  },
  REMOVE_ITEMS(state, payload) {
    const key = state.cartItems.findIndex(({ _id, choice, addon }) => {
      return (
        _id === payload._id &&
        choice._id === payload.choice._id &&
        compareArrays(payload.addon, addon)
      );
    });
    if (key !== -1) {
      state.cartItems[key].qty > 1
        ? state.cartItems[key].qty--
        : state.cartItems.splice(key, 1);
    }
    setCartData(state.cartItems);
  },
  SET_INITIAL_ITEMS(state) {
    const cartItems = window.localStorage.getItem("cartItems");
    const getTime = parseInt(window.localStorage.getItem("cartItemsSetTime"));

    if (getTime && cartItems) {
      const currentTime = new Date().getTime();
      const timeDifference = (currentTime - getTime) / (1000 * 60 * 60);

      if (timeDifference <= 2) {
        state.cartItems = JSON.parse(cartItems);
      } else {
        clearCartData();
      }
    } else {
      clearCartData();
    }
  },
  RESET(state) {
    state.cartItems = [];
  },
  ADD_CART_ITEMS(state, payload) {
    state.cartItems[payload].qty++;
    setCartData(state.cartItems);
  },
  REMOVE_CART_ITEMS(state, payload) {
    state.cartItems[payload].qty > 1
      ? state.cartItems[payload].qty--
      : state.cartItems.splice(payload, 1);

    setCartData(state.cartItems);
  },
  SET_INITIAL_DATA(state, payload) {
    const { restaurant, table } = payload;
    state.table = { _id: table._id + "", name: table.name + "" };
    state.restaurantID = restaurant._id + "";
  },
  CLEAR_CART(state) {
    state.cartItems = [];
    clearCartData();
  },
};

export const actions = {
  addCartItems({ commit }, payload) {
    commit("SET_ITEMS", payload);
  },
  removeCartItems({ commit }, payload) {
    commit("REMOVE_ITEMS", payload);
  },
  setCartItems({ commit }) {
    commit("SET_INITIAL_ITEMS");
  },
  increaseCartItems({ commit }, payload) {
    commit("ADD_CART_ITEMS", payload);
  },
  decreaseCartItems({ commit }, payload) {
    commit("REMOVE_CART_ITEMS", payload);
  },
  setInitialData({ commit }, payload) {
    commit("SET_INITIAL_DATA", payload);
  },
  clearCart({ commit }) {
    commit("CLEAR_CART");
  },
};

export const getters = {
  cartItems: ({ cartItems }) => cartItems,
  table: ({ table }) => table,
  restaurantID: ({ restaurantID }) => restaurantID,
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

const clearCartData = () => {
  window.localStorage.removeItem("cartItems");
  window.localStorage.removeItem("cartItemsSetTime");
};

const setCartData = (cartItems) => {
  window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.localStorage.setItem("cartItemsSetTime", new Date().getTime());
};
