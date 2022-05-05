import http from "../../core/services/http-comoon"

export class VehiclesApiService {
    getAll() {
        return http.get("/vehicles");
    }
    update(id, data) {
        return http.put(`/vehicles/${id}`, data);
    }
    create(data) {
        return http.post("/vehicles", data);
    }
}