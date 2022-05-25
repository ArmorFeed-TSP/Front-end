<template>
  <div class="card">
    <pv-data-table :value="transactions" row-group-mode="subheader" group-rows-by="transactionMonthYearDate"
                   sort-mode="single" sort-field="date" :sort-order="-1" responsive-layout="scroll"
                   :expandable-row-groups="true" v-model:expanded-row-groups="expandedRowGroups"
                   @rowgroup-expand="onRowGroupExpand" @rowgroup-collapse="onRowGroupCollapse">
      <pv-column field="transactionMonthYearDate" header="Date"></pv-column>
      <pv-column field="shipmentId" header="Code Shipping"></pv-column>
      <pv-column field="paymentDate" header="Payment Date"></pv-column>
<!--      <pv-column field="companyName" header="Business"></pv-column>-->
      <pv-column field="amount" header="amount">
        <template #body="slotProps">
          {{ formatCurrency(slotProps.data.amount) }}
        </template>
      </pv-column>
      <template #groupheader="slotProps">
        <span>{{ slotProps.data.transactionMonthYearDate }} </span>
        <span>  {{ calculateTransactionTotal(slotProps.data.transactionMonthYearDate) }} payments  </span>
        <span>  S/. {{ calculateTransactionTotalAmount(slotProps.data.transactionMonthYearDate) }}</span>

      </template>
    </pv-data-table>
  </div>


</template>

<script>
import { TransactionsApiService } from "../services/transactions-api.service";
// import { EnterpriseService } from "../../customers/services/enterprise.service";
// import { FilterMatchMode } from "primevue/api";

export default {
  name: "payments-list",
  data() {
    return {
      transactions: [],
      transaction: {},
      expandedRowGroups: null,
      filters: {},
      transactionsService: null,
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      enterprises: []
    };
  },
  created() {
    this.transactionsService = new TransactionsApiService();
    // this.enterprises = new EnterpriseService();
    this.transactionsService.getAll().then(
      (response) => {
        this.transactions = response.data;
        this.transactions.forEach(
          (transaction) => this.getDisplayableTransaction(transaction)
        );
      }
    );
  },
  methods: {
    // initFilters() {
    //   this.filters = {
    //     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    //   }
    // }
    getLongMonthName(date) {
      return this.monthNames[date.getMonth()] + "-" + date.getFullYear();
    },
    getDisplayableTransaction(transaction) {
      transaction.transactionMonthYearDate = this.getLongMonthName(new Date(transaction.paymentDate));

      transaction.date = transaction.paymentDate.substring(0, 7);
      return transaction;
    },
    onRowGroupExpand(event) {
      this.$toast.add({ severity: "info", summary: "Row Group Expanded", detail: "Value: " + event.data, life: 3000 });
    },
    onRowGroupCollapse(event) {
      this.$toast.add({
        severity: "success",
        summary: "Row Group Collapsed",
        detail: "Value: " + event.data,
        life: 3000
      });
    },
    calculateTransactionTotalAmount(date) {
      let total = 0;
      if (this.transactions) {
        for (let transaction of this.transactions) {
          if (transaction.transactionMonthYearDate === date) {
            total = total + transaction.amount;
          }
        }
      }
      return total;
    },
    calculateTransactionTotal(date) {
      let total = 0;
      if (this.transactions) {
        for (let transaction of this.transactions) {
          if (transaction.transactionMonthYearDate === date) {
            total++;
          }
        }
      }
      return total;
    },
    formatCurrency(value) {
      return "S/. " + value;
    }
  }

};
</script>

<style scoped>
groupheader {
  display: inline-block;
}
</style>