import http from "../../shared/services/http-common.js";

export class NotificationsApiService {
  create(data) {
    return http.post("/notifications", data);
  }
  getNotificationsByEnterpriseId(enterpriseId) {
    return http.get(`/notifications/enterprises/${enterpriseId}`);
  }
  getNotificationsByCustomerId(customerId) {
    return http.get(`/notifications/customers/${customerId}`)
  }
}
