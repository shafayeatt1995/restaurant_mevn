export const state = () => ({
  orderLoading: false,
  loadTable: false,
  orderDetails: null,
  tables: [],
});

export const mutations = {
  SET_ORDER_LOADING(state, isLoading) {
    state.orderLoading = isLoading;
  },
  SET_ORDER_DETAILS(state, order) {
    state.orderDetails = order;
  },
  SET_TABLE(state, tables) {
    state.loadTable = true;
    state.tables = tables;
  },
  REMOVE_ORDER_ITEMS(state, index) {
    state.orderDetails.orderItems.splice(index, 1);
  },
  REMOVE_ADDITIONAL_CHARGE(state, index) {
    state.orderDetails.additionalCharges.splice(index, 1);
  },
};

export const actions = {
  async fetchTable({ commit, state }) {
    if(!state.loadTable){
    try {
        const { tables } = await this.$mowApi.fetchTable();
        commit("SET_TABLE", tables);
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_ORDER_LOADING", false);
      }
    }
  },
  async fetchOrder({ commit }, orderID) {
    try {
      commit("SET_ORDER_LOADING", true);
      const { order } = await this.$mowApi.fetchOrderDetails({ orderID });
      commit("SET_ORDER_DETAILS", order);
    } catch (error) {
      console.error(error);
    } finally {
      commit("SET_ORDER_LOADING", false);
    }
  },
  async refetchOrder({ getters, dispatch }) {
    try {
      if (getters.orderDetails !== null) {
        await dispatch("fetchOrder", getters.orderDetails._id);
      }
    } catch (error) {}
  },
  async resetOrder({ commit }) {
    commit("SET_ORDER_DETAILS", null);
  },
  removeOrderItem({ commit }, index) {
    commit("REMOVE_ORDER_ITEMS", index);
  },
  removeAdditionalCharges({ commit }, index) {
    commit("REMOVE_ADDITIONAL_CHARGE", index);
  },
};

export const getters = {
  orderDetails: ({ orderDetails }) => orderDetails,
  orderLoading: ({ orderLoading }) => orderLoading,
  orderModal: ({ orderDetails }) => orderDetails !== null,
  tables: ({ tables }) => tables,
};
