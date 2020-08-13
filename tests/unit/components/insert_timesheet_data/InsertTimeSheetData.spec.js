import "../../matchmedia.mock";
import _ from "lodash";
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
          state: _.cloneDeep(state),
          actions: _.cloneDeep(actions),
          mutations: _.cloneDeep(mutations)
        }
      },
      state: _.cloneDeep(rootState),
      getters: _.cloneDeep(rootGetters),
      actions: _.cloneDeep(rootActions),
      mutations: _.cloneDeep(rootMutations)
    });
    wrapper = shallowMount(InsertTimesheetData, { store, localVue });
  });

  let checkStartTimeIsEmptyOrHasWrongFormat = () => {
    expect(wrapper.vm.$store.state.insertTimeSheet.error).toBe(
      "Start time is empty or has wrong format."
    );
  };

  it("should show an error, because start date is undefined", () => {
    wrapper.vm.saveEntry();
    checkStartTimeIsEmptyOrHasWrongFormat();
  });

  it("should test regexp, for start date", () => {
    Object.defineProperty(wrapper.vm, "startTime", {
      get: jest.fn(() => "24:00"),
      set: jest.fn(),
      configurable: true
    });

    wrapper.vm.saveEntry();
    checkStartTimeIsEmptyOrHasWrongFormat();

    delete wrapper.vm.startTime;

    Object.defineProperty(wrapper.vm, "startTime", {
      get: jest.fn(() => "24:0"),
      set: jest.fn(),
      configurable: true
    });

    wrapper.vm.saveEntry();
    checkStartTimeIsEmptyOrHasWrongFormat();

    Object.defineProperty(wrapper.vm, "startTime", {
      get: jest.fn(() => "2:00"),
      set: jest.fn(),
      configurable: true
    });

    wrapper.vm.saveEntry();
    checkStartTimeIsEmptyOrHasWrongFormat();

    Object.defineProperty(wrapper.vm, "startTime", {
      get: jest.fn(() => "2400"),
      set: jest.fn(),
      configurable: true
    });

    wrapper.vm.saveEntry();
    checkStartTimeIsEmptyOrHasWrongFormat();
  });

  it("should show an error, because end time undefined", () => {
    Object.defineProperty(wrapper.vm, "startTime", {
      get: jest.fn(() => "10:00"),
      set: jest.fn()
    });

    wrapper.vm.saveEntry();
    expect(wrapper.vm.$store.state.insertTimeSheet.error).toBe(
      "End time is empty or has wrong format."
    );
  });
});
