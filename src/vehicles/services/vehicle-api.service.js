import http from "../../shared/services/http-common";

export class VehiclesApiService  {
  getAll() {
    return http.get("/vehicles");
  }
  create(data) {
    return http.post("/vehicles", data);
  }
  update(id, data) {
    return http.put(`/vehicles/${id}`, data);
  }
  delete(id) {
    return http.delete(`/vehicles/${id}`);
  }
}
