// store.spec.js
import moment from "moment";
import { getters } from "../../src/store";

describe("test store getters", () => {
  it("should getOverallHours", () => {
    // init
    const state = {
      insertedEntries: [
        {
          hours: 4
        },
        { hours: 6 },
        { hours: 7.5 }
      ]
    };

    // call method
    let overallHours = getters.getOverallHours(state);

    // expect
    expect(overallHours).toBe(17.5);
  });
  it("should getInsertedTimesheetDates", () => {
    // init

    let firstDate = moment().toDate();
    let secondDate = moment()
      .add(1, "week")
      .toDate();
    let thirdDate = moment()
      .add(2, "days")
      .toDate();

    const state = {
      insertedEntries: [
        {
          date: firstDate
        },
        {
          date: secondDate
        },
        {
          date: thirdDate
        }
      ]
    };

    // call method
    let insertedTimesheetDates = getters.getInsertedTimesheetDates(state);

    // expect
    expect(insertedTimesheetDates[0]).toBe(firstDate);
    expect(insertedTimesheetDates[1]).toBe(secondDate);
    expect(insertedTimesheetDates[2]).toBe(thirdDate);
  });
});
