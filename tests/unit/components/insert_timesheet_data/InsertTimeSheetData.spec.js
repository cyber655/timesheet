import "../../matchmedia.mock";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import InsertTimesheetData from "@/components/insert_timesheet_data/InsertTimesheetData.vue";
import {
  state as rootState,
  getters as rootGetters,
  actions as rootActions,
  mutations as rootMutations
} from "@/store";
import {
  state,
  actions,
  mutations
} from "@/components/insert_timesheet_data/store";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("Testing Component Methods", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      strict: false,
      modules: {
        insertTimeSheet: {
          namespaced: true,
          state,
          actions,
          mutations
        }
      },
      state: rootState,
      getters: rootGetters,
      actions: rootActions,
      mutations: rootMutations
    });
    wrapper = shallowMount(InsertTimesheetData, { store, localVue });
  });

  it("should show an error, because start date is undefined", () => {
    wrapper.vm.saveEntry();
    expect(wrapper.vm.$store.state.insertTimeSheet.error).toBe(
      "Start time is empty or has wrong format."
    );
  });
});
