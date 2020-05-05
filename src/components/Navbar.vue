<template>
  <nav class="align-middle">
    <ul>
      <li>
        <label for="file-import" class="btn btn-info navbar-button"
          >Restore state</label
        >
        <input type="file" id="file-import" v-on:change="restoreState" />
      </li>
      <li @click="downloadState">
        <b-button variant="info" class="navbar-button">Download state</b-button>
      </li>
      <li @click="createPDF">
        <div class="navbar-main-navigation">Create PDF</div>
      </li>
    </ul>
  </nav>
</template>

<script>
import moment from "moment";
import { saveAs } from "file-saver";
import { mapGetters } from "vuex";
import serialijse from "serialijse";
import { PDFHelper } from "@/helper/pdfHelper";

export default {
  name: "Navbar",
  methods: {
    createPDF: function() {
      let pdfHelper = new PDFHelper(
        this.$store.state.pdfDataStore.pdfSettings,
        this.getOverallHours,
        this.getInsertedTimesheetDates.length === 0
          ? moment().toDate()
          : this.getInsertedTimesheetDates[0]
      );
      pdfHelper.createPDF();
    },
    downloadState: function() {
      let serialized = serialijse.serialize(this.$store.state);
      let blob = new Blob([serialized], {
        type: "text/plain;charset=utf-8"
      });

      let todaysDate = moment();
      let year = todaysDate.format("YYYY");
      let month = todaysDate.format("MM");
      saveAs(
        blob,
        `time-sheet_date-${year}_${month}_version-${this.getStoreVersion}.txt`
      );
    },
    restoreState: function(e) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }

      let context = this;
      var reader = new FileReader();

      reader.onload = e => {
        let content = serialijse.deserialize(e.target.result);
        context.$store.commit("UPDATE_COMPLETE_STATE", content);
      };
      reader.readAsText(file);
    }
  },
  computed: {
    ...mapGetters([
      "getInsertedTimesheetDates",
      "getStoreVersion",
      "getOverallHours",
      "getAllPDFData"
    ])
  }
};
</script>

<style scoped lang="scss">
nav {
  @extend .center;
  box-shadow: 4px 4px 5px 0px rgb(224, 224, 224);
  background-color: #6c5b7c;
  color: $info;
  font-weight: 700;
}

.navbar-button {
  color: $navbar-text;
  font-weight: 700;
}

ul {
  @extend .center;
  list-style-type: none;
  padding: 10px 0 10px 0;
  margin: 0;

  li {
    padding: 10px;

    label {
      margin: 0;
      cursor: pointer;
    }
  }
}

input[type="file"] {
  display: none;
}

ul > li {
  cursor: pointer;
}
</style>
