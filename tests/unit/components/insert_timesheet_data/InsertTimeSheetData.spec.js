import "../../matchmedia.mock";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import InsertTimesheetData from "@/components/insert_timesheet_data/InsertTimesheetData.vue";
import { state, getters } from "@/store";
import BootstrapVue from "bootstrap-vue";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(BootstrapVue);

describe("Testing Component Methods", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters
    });
    wrapper = shallowMount(InsertTimesheetData, { store, localVue });
  });

  it("should show an error, because start date is undefined", () => {
    wrapper.vm.saveEntry();
    expect(wrapper.vm.error).toBeTruthy();
  });
});
