<template>
  <div class="card">
    <h1>Payments received</h1>
    <div class="card-container">
      <pv-data-table
        :value="transactions"
        row-group-mode="subheader"
        group-rows-by="transactionMonthYearDate"
        sort-mode="single"
        sort-field="date"
        :sort-order="-1"
        :expandable-row-groups="true"

        expanded-row-icon="pi-eye-slash"
        collapsed-row-icon="pi-eye"
        v-model:expanded-row-groups="expandedRowGroups"
        @rowgroup-expand="onRowGroupExpand"
        @rowgroup-collapse="onRowGroupCollapse"
      >
        <pv-column field="transactionMonthYearDate" header="Date"></pv-column>
        <pv-column field="shipmentId" header="Code Shipping"
                   class="bg-gray-200 border-primary hover:bg-gray-500"></pv-column>
        <pv-column field="paymentDate" header="Payment Date" class="bg-gray-200 border-primary"></pv-column>
        <pv-column field="companyName" header="Enterprise" class="bg-gray-200 border-primary"></pv-column>
        <pv-column field="amount" header="Amount" class="bg-gray-200 border-primary">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.amount) }}
          </template>
        </pv-column>
        <template #groupheader="slotProps">
          <div class="group-header">
            <div class="group-header-container">
              <td class="group-header-container-item"> {{ slotProps.data.transactionMonthYearDate }}</td>
              <td
                class="group-header-container-item">
                {{ calculateTransactionTotal(slotProps.data.transactionMonthYearDate)
                }} payments
              </td>
              <td
                class="group-header-container-item"> S/.
                {{ calculateTransactionTotalAmount(slotProps.data.transactionMonthYearDate)
                }}
              </td>
            </div>
          </div>
        </template>


      </pv-data-table>
    </div>
  </div>
</template>

<script>
import { TransactionsApiService } from "../services/transactions-api.service";


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
    getLongMonthName(date) {
      return this.monthNames[date.getMonth()] + "-" + date.getFullYear();
    },
    getDisplayableTransaction(transaction) {
      transaction.transactionMonthYearDate = this.getLongMonthName(new Date(transaction.paymentDate));
      this.transactionsService.getEnterpriseAsociatedById(transaction.id, transaction.enterpriseId).then(
        (response) => transaction.companyName = response.data.name
      );
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


.group-header-container-item {
  display: block;
}

.group-header-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;
  padding-left: 25%;
}

.group-header {
  display: inline-block;
  width: 85%;

}

.card-container {
  margin: 0 16% 0 16%;
  padding: 2% 0 10% 0;
}

@media (max-width: 500px) {
  .card-container {
    margin: 0 0 0 0;
  }
}

h1 {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  color: #5D5FEF;
  padding-top: 40px;
  letter-spacing: 0.03em;
}

.card {
  background-color: #EEEEEE;
}


</style>