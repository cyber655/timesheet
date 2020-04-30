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
  }
};

const store = new Vuex.Store({
  modules: {
    insertTimeSheet: insertTimeSheetDataStoreModule,
    pdfDataStore: pdfDataStoreModule
  },
  strict: true,
  state,
  getters,
  mutations,
  actions: {}
});
export default store;
