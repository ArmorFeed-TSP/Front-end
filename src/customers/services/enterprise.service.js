import http from "../../shared/services/http-common.js";

class EnterpriseService {
  endPoint = "/enterprise";

  getAll() {
    return http.get(this.endPoint);
  }
  getById(id) {
    return http.get(`${this.endPoint}/${id}`);
  }
}

export default new EnterpriseService();
