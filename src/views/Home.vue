<template>
  <div>
    <navbar></navbar>
    <section>
      <insert-timesheet-data></insert-timesheet-data>
      <time-table></time-table>
      <insert-meta-data></insert-meta-data>
    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import InsertTimesheetData from "@/components/insert_timesheet_data/InsertTimesheetData.vue";
import InsertMetaData from "@/components/metadata/InsertMetaData.vue";
import TimeTable from "@/components/TimeTable.vue";

export default {
  name: "home",
  components: {
    InsertTimesheetData,
    TimeTable,
    InsertMetaData,
    Navbar
  }
};
</script>

<style scoped lang="scss">
section {
  padding-top: 50px;
  background-color: #fffdfd;
}
</style>
