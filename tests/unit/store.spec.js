// mutations.spec.js
// destructure assign `mutations`
import { mutations } from '../../src/store';
import Vuex from 'vuex';

describe('testing mutations...', () => {
  it('should RECALCULATE_HOURS', () => {
    let insertedEntry = {
      hours: 4
    };

    let insertedEntry2 = {
      hours: 4.25
    };

    let insertedEntry3 = {
      hours: 4.3
    };
    let insertedEntries = [];
    insertedEntries.push(insertedEntry);
    insertedEntries.push(insertedEntry2);
    insertedEntries.push(insertedEntry3);

    const state = { insertedEntries, overallHours: 0 };
    state.insertedEntries = insertedEntries;
    mutations.RECALCULATE_HOURS(state);
    expect(state.overallHours).toBe(12.55);
  });
  it('should add ADD_TIME_ENTRY_OBJECT into store', () => {
    let payload = {
      id: 0,
      date: new Date(),
      dateString: '2020-02-01',
      project: 'Dermalog_A002',
      description: 'Added store test',
      hours: parseFloat('15'),
      startTime: '10:00',
      endTime: '15:00',
      breakTime: '00:30'
    };

    let state = {
      isEditMode: false,
      insertedTimeEntries: [],
      insertedEntries: [],
      overallHours: 0.0,
      currentTimeEntry: {
        id: 0,
        date: new Date(),
        project: '',
        description: '',
        hours: 0,
        startTime: '',
        endTime: '',
        breakTime: '00:30'
      },
      pdfSettings: {
        customerData: '',
        ownData: {
          email: '',
          webpage: '',
          name: '',
          handyNumber: '',
          address: ''
        }
      }
    };

    let currentTimeEntryMock = (mutations.SET_CURRENT_TIME_ENTRY = jest.fn());
    let recalcHoursEntryMock = (mutations.RECALCULATE_HOURS = jest.fn());

    const store = new Vuex.Store({
      state,
      mutations
    });

    store.commit('ADD_TIME_ENTRY_OBJECT', state, payload);
    store.commit('ADD_TIME_ENTRY_OBJECT', state, payload);

    expect(state.insertedEntries.length).toEqual(2);
    expect(currentTimeEntryMock).toBeCalledTimes(2);
    expect(recalcHoursEntryMock).toBeCalledTimes(2);
  });
});
