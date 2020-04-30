<template>
  <div>
    <div class="form-group">
      <div class="extra-pdf-information-data">
        <label for="pdfCustomerData">PDF customer data:</label>
        <textarea
          class="form-control"
          id="pdfCustomerData"
          v-model="updateCustomerData"
          rows="3"
        ></textarea>
      </div>
      <div class="extra-pdf-information-data">
        <label>Own data:</label>
        <input
          type="name"
          v-model="updateOwnEmail"
          class="form-control own-data-input"
          id="email"
          placeholder="E-Mail"
        />

        <input
          type="name"
          v-model="updateOwnWebpage"
          class="form-control own-data-input"
          id="webpage"
          placeholder="Webpage"
        />

        <input
          type="name"
          v-model="updateOwnHandyNumber"
          class="form-control own-data-input"
          id="phoneNumber"
          placeholder="Phone number"
        />

        <input
          type="name"
          v-model="updateOwnName"
          class="form-control own-data-input"
          id="name"
          placeholder="Name"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InsertMetaData",
  computed: {
    updateOwnName: {
      get() {
        return this.$store.state.pdfDataStore.pdfSettings.ownData.name;
      },
      set(value) {
        this.$store.dispatch("pdfDataStore/UPDATE_PDF_DATA", {
          name: value
        });
      }
    },
    updateOwnHandyNumber: {
      get() {
        return this.$store.state.pdfDataStore.pdfSettings.ownData.handyNumber;
      },
      set(value) {
        this.$store.dispatch("pdfDataStore/UPDATE_PDF_DATA", {
          handyNumber: value
        });
      }
    },
    updateOwnWebpage: {
      get() {
        return this.$store.state.pdfDataStore.pdfSettings.ownData.webpage;
      },
      set(value) {
        this.$store.dispatch("pdfDataStore/UPDATE_PDF_DATA", {
          webpage: value
        });
      }
    },
    updateOwnEmail: {
      get() {
        return this.$store.state.pdfDataStore.pdfSettings.ownData.email;
      },
      set(value) {
        this.$store.dispatch("pdfDataStore/UPDATE_PDF_DATA", {
          email: value
        });
      }
    },
    updateCustomerData: {
      get() {
        return this.$store.state.pdfDataStore.pdfSettings.customerData;
      },
      set(value) {
        this.$store.dispatch("pdfDataStore/UPDATE_CUSTOMER_DATA", {
          customerData: value
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.form-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.extra-pdf-information-data {
  padding: 15px;
}

.own-data-input {
  margin-bottom: 10px;
}
</style>
