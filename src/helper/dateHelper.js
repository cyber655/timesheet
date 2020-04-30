import moment from "moment";

let convertDateToYYYYmmDDString = date => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

let calculateWorkedHours = (
  selectedDateString,
  startTime,
  endTime,
  breakTime
) => {
  let startTimeMomentWithBreak = moment(`${selectedDateString} ${startTime}`)
    .add(parseInt(breakTime.substring(0, 2)), "hours")
    .add(parseInt(breakTime.substring(3, 5)), "minutes");

  let endTimeMoment = moment(`${selectedDateString} ${endTime}`);

  //TODO: Throw excpetion here of startimewithbreak is greater than endTime
  let duration = moment.duration(endTimeMoment.diff(startTimeMomentWithBreak));

  return parseFloat(duration.asHours().toFixed(2));
};

export { convertDateToYYYYmmDDString, calculateWorkedHours };
