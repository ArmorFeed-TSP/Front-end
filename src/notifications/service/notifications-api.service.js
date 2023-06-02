import http from "../../shared/services/http-common.js";

export class NotificationsApiService {
  create(data) {
    return http.post("/notifications", data);
  }
  getShipmentById(id) {
    return http.get(`/shipments/${id}`);
  }
  getNotificationsByEnterpriseId(enterpriseId) {
    return http.get(`/notifications/enterprises/${enterpriseId}`);
  }
  getNotificationsByCustomerId(customerId) {
    return http.get(`/notifications/customers/${customerId}`)
  }
}
