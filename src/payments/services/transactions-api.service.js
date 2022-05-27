import http from "../../shared/services/http-common";

export class TransactionsApiService {
  getAll() {
    return http.get("/transactions");
  }

  getById(id) {
    return http.get(`/transactions/${id}`);
  }

  getEnterpriseAsociatedById(transactionId, enterpriseId) {
    return http.get(`/transactions/${transactionId}/enterprise/${enterpriseId}`);
  }

}
