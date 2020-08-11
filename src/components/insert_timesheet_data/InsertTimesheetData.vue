<template>
  <div>
    <div class="row justify-content-center">
      <div class="insert-data">
        <div class="col-xs-6 p-4">
          <date-picker
            ref="vueDatePicker"
            v-model="date"
            :attributes="attributes"
            color="orange"
            is-inline
          ></date-picker>
        </div>
        <div class="col-xs-6 p-4">
          <div class="time-input-side-by-side">
            <div class="form-group">
              <label for="project">Project:</label>
              <input
                id="project"
                v-model="project"
                class="form-control padding-start-end-time"
                type="text"
                placeholder="DERMALOG A2019-5807"
                data-cy="project-title"
              />
            </div>
            <div class="form-group">
              <label for="startTime">Start time:</label>
              <input
                id="startTime"
                v-model="startTime"
                class="form-control padding-start-end-time"
                type="text"
                placeholder="10:00"
                data-cy="start-time"
              />
            </div>
            <div class="form-group">
              <label for="endTime">End time:</label>
              <input
                id="endTime"
                v-model="endTime"
                class="form-control padding-start-end-time"
                type="text"
                placeholder="18:30"
                data-cy="end-time"
              />
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <input
                id="description"
                v-model="description"
                class="form-control padding-start-end-time"
                type="text"
                placeholder="Enhance performance"
                data-cy="description"
              />
            </div>
            <div class="form-group">
              <label for="breakTime">Break time:</label>
              <input
                id="breakTime"
                v-model="breakTime"
                class="form-control padding-start-end-time"
                type="text"
                placeholder="00:30"
              />
            </div>

            <div
              class="alert alert-danger error"
              v-show="this.$store.state.insertTimeSheet.error"
              role="alert"
            >
              <span>{{ this.$store.state.insertTimeSheet.error }}</span>
            </div>

            <b-button
              variant="primary"
              @click="saveEntry"
              data-cy="add-or-edit-entry"
            >
              {{ isEditMode ? "Edit" : "Add" }}
            </b-button>

            <b-button
              variant="danger"
              class="delete-button"
              v-show="isEditMode"
              @click="deleteEntry"
            >
              Delete
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";
import {
  convertDateToYYYYmmDDString,
  calculateWorkedHours
} from "@/helper/dateHelper";
import {
  getNextDayOfHighestDate,
  generateHighestID
} from "./InsertTimesheetDataHelper";
import DatePicker from "@/libs/v-calendar/src/components/DatePicker.vue";
import moment from "moment";

export default {
  name: "InsertTime",
  components: {
    DatePicker
  },
  data() {
    return {
      attributes: [
        {
          key: "today",
          dot: {
            color: "blue"
          },
          dates: []
        }
      ]
    };
  },
  methods: {
    saveEntry: function() {
      this.dispatchError();

      let date = this.date;
      let startTime = this.startTime;
      let endTime = this.endTime;
      let breakTime = this.breakTime;
      let description = this.description;
      let project = this.project;

      var checkTimeFormat = new RegExp("^([01][0-9]|2[0-3]):([0-5][0-9])$");

      if (_.isEmpty(startTime) || !startTime.match(checkTimeFormat)) {
        this.dispatchError("Start time is empty or has wrong format.");
        return;
      }

      if (_.isEmpty(endTime) || !endTime.match(checkTimeFormat)) {
        this.dispatchError("End time is empty or has wrong format.");
        return;
      }

      if (_.isEmpty(breakTime) || !breakTime.match(checkTimeFormat)) {
        this.dispatchError("Break time is empty or has wrong format.");
        return;
      }

      if (_.isEmpty(description)) {
        this.dispatchError("Description can not be empty.");
        return;
      }

      if (_.isEmpty(this.project)) {
        this.dispatchError("Project can not be empty.");
        return;
      }

      let selectedDateString = convertDateToYYYYmmDDString(date);
      let workedHours = calculateWorkedHours(
        selectedDateString,
        startTime,
        endTime,
        breakTime
      );

      let addOrEditTimeEntryObject;
      let projectEntryID;

      if (this.getIsEdited) {
        addOrEditTimeEntryObject = "insertTimeSheet/EDIT_TIME_ENTRY_OBJECT";
        projectEntryID = this.getCurrentEntry.id;
      } else {
        addOrEditTimeEntryObject = "insertTimeSheet/ADD_TIME_ENTRY_OBJECT";
        projectEntryID = generateHighestID(this.getInsertedEntries);
      }

      this.$store.dispatch(addOrEditTimeEntryObject, {
        payload: {
          id: projectEntryID,
          date: date,
          dateString: selectedDateString,
          project: project,
          description: description,
          hours: workedHours,
          startTime: startTime,
          endTime: endTime,
          breakTime: breakTime
        }
      });

      let insertedTimesheetDates = this.getInsertedTimesheetDates;
      this.date = getNextDayOfHighestDate(insertedTimesheetDates);
      this.attributes[0].dates = insertedTimesheetDates;
    },
    dispatchError: function(error = "") {
      this.$store.dispatch("insertTimeSheet/SET_ERROR", { payload: error });
    },
    deleteEntry: function() {
      this.$store.dispatch(
        "insertTimeSheet/DELETE_TIME_ENTRY",
        this.getCurrentEntry
      );

      this.attributes[0].dates = this.getInsertedTimesheetDates;

      //Let's be honest: this is a workaround for the library v-calendar
      _.forEach(
        this.$refs.vueDatePicker.$children[0].$children[0].$children[0]
          .$children[0].$children[2].$children,
        value => {
          let currentComponentDate = value.day.date;
          let selectedDateWithoutTime = moment(this.date)
            .startOf("day")
            .toDate();

          if (
            selectedDateWithoutTime.valueOf() !== currentComponentDate.valueOf()
          ) {
            return;
          }
          value.day.refresh = true;

          value.isDeleteMode = true;
          value.refresh();
          value.isDeleteMode = false;
          //Workaround end
        }
      );
    }
  },
  computed: {
    ...mapGetters([
      "getInsertedEntries",
      "getIsEdited",
      "getCurrentEntry",
      "getInsertedTimesheetDates",
      "getInsertTimesheetEntryError"
    ]),
    ...mapActions("insertTimeSheet", [
      "ADD_TIME_ENTRY_OBJECT",
      "DELETE_TIME_ENTRY",
      "UPDATE_TIMESHEET_ENTRY"
    ]),
    isErrorEmpty() {
      return _.isEmpty(this.error);
    },
    isEditMode() {
      return this.getIsEdited;
    },
    date: {
      get() {
        return this.$store.state.timesheetEntry.date;
      },
      set(value) {
        this.$store.dispatch("insertTimeSheet/UPDATE_TIMESHEET_ENTRY", {
          date: value
        });
      }
    },
    project: {
      get() {
        return this.$store.state.timesheetEntry.project;
      },
      set(value) {
        this.$store.dispatch("insertTimeSheet/UPDATE_TIMESHEET_ENTRY", {
          project: value
        });
      }
    },
    startTime: {
      get() {
        return this.$store.state.timesheetEntry.startTime;
      },
      set(value) {
        this.$store.dispatch("insertTimeSheet/UPDATE_TIMESHEET_ENTRY", {
          startTime: value
        });
      }
    },
    endTime: {
      get() {
        return this.$store.state.timesheetEntry.endTime;
      },
      set(value) {
        this.$store.dispatch("insertTimeSheet/UPDATE_TIMESHEET_ENTRY", {
          endTime: value
        });
      }
    },
    description: {
      get() {
        return this.$store.state.timesheetEntry.description;
      },
      set(value) {
        this.$store.dispatch("insertTimeSheet/UPDATE_TIMESHEET_ENTRY", {
          description: value
        });
      }
    },
    breakTime: {
      get() {
        return this.$store.state.timesheetEntry.breakTime;
      },
      set(value) {
        this.$store.dispatch("insertTimeSheet/UPDATE_TIMESHEET_ENTRY", {
          breakTime: value
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
label {
  float: left;
  font-weight: bold;
}

.padding-start-end-time {
  margin-bottom: 10px;
}

.error {
  margin-top: 10px;
}

/deep/ .vc-bg-blue-600 {
  background-color: $primary;
}

/deep/ .vc-bg-orange-600 {
  background-color: $primary;
}

.delete-button {
  margin-left: 15px;
}

.insert-data {
  @extend .center;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
  flex-wrap: wrap;
  margin-bottom: 50px;
  background-color: #fbfbfb;
}

label {
  color: $secondary;
}

.vc-container {
  --day-min-height: 42px;
}
</style>
