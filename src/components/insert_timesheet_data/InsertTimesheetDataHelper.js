import moment from "moment";
import _ from "lodash";

let getNextDayOfHighestDate = dateArray => {
  if (_.isEmpty(dateArray)) {
    return moment().toDate();
  }
  let highestInsertedDateMoment = moment(_.max(dateArray));
  return highestInsertedDateMoment.add(1, "day").toDate();
};

let generateHighestID = insertedProjectEntries => {
  let projectEntryID = 0;
  if (_.size(insertedProjectEntries) > 0) {
    projectEntryID = _.maxBy(insertedProjectEntries, "id").id;
    return ++projectEntryID;
  }
  return projectEntryID;
};

export { getNextDayOfHighestDate, generateHighestID };
