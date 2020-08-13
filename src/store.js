import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";
import _ from "lodash";

import { insertTimeSheetDataStoreModule } from "@/components/insert_timesheet_data/store";
import { pdfDataStoreModule } from "@/components/metadata/store";

Vue.use(Vuex);

export const state = {
  version: "2.2",
  insertedEntries: [],
  isEditMode: false,
  timesheetEntry: {
    id: 0,
    date: moment().toDate(),
    project: "",
    description: "",
    hours: 0,
    startTime: "",
    endTime: "",
    breakTime: "00:30"
  }
};

export const getters = {
  getIsEdited: state => {
    return state.isEditMode;
  },
  getCurrentEntry: state => {
    return state.timesheetEntry;
  },
  getInsertedEntries: state => {
    return state.insertedEntries;
  },
  getInsertedTimesheetDates: state => {
    let insertedDates = state.insertedEntries.map(
      insertedTimeEntry => insertedTimeEntry.date
    );
    return insertedDates;
  },
  getStoreVersion: state => {
    return state.version;
  },
  getOverallHours: state => {
    let allHoursArray = state.insertedEntries.map(
      insertedTimeEntry => insertedTimeEntry.hours
    );

    let overallHours = allHoursArray.reduce(
      (overallHours, hour) => overallHours + hour,
      0
    );
    return overallHours;
  }
};

export const mutations = {
  SET_CURRENT_TIME_ENTRY(state, value) {
    state.timesheetEntry = _.cloneDeep(value);
  },
  SET_EDIT_MODE(state, value) {
    state.isEditMode = value;
  },
  UPDATE_COMPLETE_STATE(state, value) {
    Object.assign(state, value);
  }
};

const store = new Vuex.Store({
  strict: true,
  modules: {
    insertTimeSheet: _.cloneDeep(insertTimeSheetDataStoreModule),
    pdfDataStore: _.cloneDeep(pdfDataStoreModule)
  },
  state: _.cloneDeep(state),
  getters: _.cloneDeep(getters),
  mutations: _.cloneDeep(mutations),
  actions: {}
});
export default store;
