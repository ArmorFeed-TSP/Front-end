import http from "../../../shared/services/http-common.js";

export class CustomerShipmentsApiService {
  findByCustomerId(id) {
    return http.get(`/customers/${id}/shipments`);
  }
  getEnterpriseById(id) {
    return http.get(`/enterprises/${id}`);
  }
  getShipmentById(id) {
    return http.get(`/shipments/${id}`);
  }
  getCustomerById(customerId) {
    return http.get(`/customers/${customerId}`);
  }
  deleteShipmentById(customerId) { 
    http.delete(`/shipments/${id}`);
  }
}
