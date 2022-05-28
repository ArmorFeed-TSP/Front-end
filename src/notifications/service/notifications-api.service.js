import http from "../../core/services/http-common";

export class NotificationsApiService {
  getAll() {
    return http.get("/notifications");
  }
  create(data) {
    return http.post("/notifications", data);
  }
}
