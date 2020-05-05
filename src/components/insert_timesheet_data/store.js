import { sortCollectionByDate } from "@/helper/sortHelper";
import _ from "lodash";
import { getNextDayOfHighestDate } from "./InsertTimesheetDataHelper";

const mutations = {
  addTimeEntryObject(state, { payload, rootState }) {
    rootState.insertedEntries.push(payload);
    sortCollectionByDate(rootState.insertedEntries);
  },
  editTimeEntryObject(state, { payload, rootState, indexToEdit }) {
    let entry = rootState.insertedEntries[indexToEdit];
    Object.assign(entry, payload);
    rootState.isEditMode = false;
  },
  deleteTimeEntry(state, { timeEntry, rootState, rootGetters }) {
    rootState.insertedEntries = _.remove(rootState.insertedEntries, e => {
      return e.id !== timeEntry.id;
    });
    rootState.isEditMode = false;
    rootState.timesheetEntry.date = getNextDayOfHighestDate(
      rootGetters.getInsertedTimesheetDates
    );
  },
  updateTimesheetEntry(state, { timesheetEntry, rootState }) {
    _.extend(rootState.timesheetEntry, timesheetEntry);
  }
};

const actions = {
  ADD_TIME_ENTRY_OBJECT(context, { payload, timesheetEntry }) {
    context.commit("addTimeEntryObject", {
      payload,
      timesheetEntry,
      rootState: context.rootState
    });
  },
  EDIT_TIME_ENTRY_OBJECT(context, { payload, timesheetEntry }) {
    let rootState = context.rootState;
    let indexToEdit = _.findIndex(rootState.insertedEntries, [
      "id",
      payload.id
    ]);

    this.commit("insertTimeSheet/editTimeEntryObject", {
      payload,
      timesheetEntry,
      rootState: rootState,
      indexToEdit: indexToEdit
    });
  },
  DELETE_TIME_ENTRY(context, timeEntry) {
    this.commit("insertTimeSheet/deleteTimeEntry", {
      timeEntry,
      rootState: context.rootState,
      rootGetters: context.rootGetters
    });
  },
  UPDATE_TIMESHEET_ENTRY(context, timesheetEntry) {
    this.commit("insertTimeSheet/updateTimesheetEntry", {
      timesheetEntry,
      rootState: context.rootState
    });
  }
};

export const insertTimeSheetDataStoreModule = {
  namespaced: true,
  state: {},
  getters: {},
  mutations,
  actions
};
