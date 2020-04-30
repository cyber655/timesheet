import _ from "lodash";

const state = {
  pdfSettings: {
    customerData: "",
    ownData: {
      email: "",
      webpage: "",
      name: "",
      handyNumber: "",
      address: ""
    }
  }
};

const mutations = {
  updatePdfData(state, value) {
    _.extend(state.pdfSettings.ownData, value);
  },
  updateCustomerData(state, value) {
    _.extend(state.pdfSettings, value);
  }
};

const actions = {
  UPDATE_PDF_DATA(context, value) {
    this.commit("pdfDataStore/updatePdfData", value);
  },
  UPDATE_CUSTOMER_DATA(context, value) {
    this.commit("pdfDataStore/updateCustomerData", value);
  }
};

export const pdfDataStoreModule = {
  namespaced: true,
  state,
  getters: {},
  mutations,
  actions
};
