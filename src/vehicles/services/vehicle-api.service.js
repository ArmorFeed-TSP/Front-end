import http from "../../shared/services/http-common";

export class VehiclesApiService {
  getAll() {
    return http.get("/vehicles");
  }
  create(data) {
    return http.post("/vehicles", data);
  }
}
