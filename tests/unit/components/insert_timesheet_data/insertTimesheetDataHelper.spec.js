import moment from "moment";
import _ from "lodash";

import {
  getNextDayOfHighestDate,
  generateHighestID
} from "@/components/insert_timesheet_data/InsertTimesheetDataHelper";

describe("test store getters", () => {
  it("should get current date when date array is empty", () => {
    // init
    let currentDay = moment().toDate();

    // call method
    let highest = getNextDayOfHighestDate();

    // expect
    expect(highest.toString()).toBe(currentDay.toString());
  });

  it("should getNextDayOfHighestDate when multible dates are given", () => {
    // init
    let firstLowerDate = moment().toDate();
    let dayAfterTomorrowMoment = moment().add(2, "days");
    let tomorrow = moment()
      .add(1, "day")
      .toDate();
    let dates = [firstLowerDate, dayAfterTomorrowMoment.toDate(), tomorrow];

    // call method
    let tomorrowDateFromHighestDate = getNextDayOfHighestDate(dates);

    // expect
    expect(
      dayAfterTomorrowMoment
        .add(1, "day")
        .toDate()
        .toString()
    ).toBe(tomorrowDateFromHighestDate.toString());
  });

  it("should generateHighestID from insertedProjectEntries", () => {
    // init
    let timeEntries = [
      {
        id: 0
      },
      {
        id: 2
      },
      {
        id: 1
      }
    ];

    // call method
    let highestIDWithEmptyValues = generateHighestID();
    let highestID = generateHighestID(timeEntries);

    // expect
    expect(highestID).toBe(3);
    expect(highestIDWithEmptyValues).toBe(0);
  });
});
