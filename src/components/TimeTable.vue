<template>
  <div class="center">
    <b-table
      id="time-entry-table"
      v-show="this.getInsertedEntries.length > 0"
      responsive
      :fields="fields"
      :items="this.getInsertedEntries"
      :hover="true"
      :striped="true"
      :bordered="true"
      :fixed="true"
      class="mt-3 insert-time"
      thead-class="thead-light"
      outlined
      @row-clicked="onRowClicked"
    ></b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TimeTable",
  data() {
    return {
      fields: [
        {
          key: "project",
          label: "Project",
          thClass: "table-same-with",
          tdClass: "table-same-with"
        },
        {
          key: "dateString",
          label: "Date",
          thClass: "table-same-with",
          tdClass: "table-same-with"
        },
        {
          key: "description",
          label: "Description",
          thClass: "table-same-with",
          tdClass: "table-same-with"
        },
        {
          key: "hours",
          label: "Hours",
          thClass: "table-same-with",
          tdClass: "table-same-with"
        },
        {
          key: "hours",
          label: "Hours",
          thClass: "table-same-with",
          tdClass: "table-same-with"
        }
      ]
    };
  },
  methods: {
    onRowClicked(item) {
      this.$store.commit("SET_CURRENT_TIME_ENTRY", item);
      this.$store.commit("SET_EDIT_MODE", true);

      // For Safari
      document.body.scrollTop = 0;
      // For Chrome, Firefox, IE and Opera
      document.documentElement.scrollTop = 0;
    }
  },
  computed: {
    ...mapGetters(["getInsertedEntries"])
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

.insert-time {
  max-width: 1200px;
  margin-left: 15px;
  margin-right: 15px;
}

/deep/ tr:hover,
/deep/ tr:focus {
  background-color: $secondary !important;
  font-weight: 700;
  color: white !important;
}
</style>
