import http from "./http-common";

export class ProfileApiService {
    updateCustomerById(id, customer) {
        return http.put(`/customers/${id}`, customer);
    }
    updateEnterpriseById(id, enterprise) {
        return http.put(`/enterprises/${id}`, enterprise);
    }
    getCustomerById(id) {
        return http.get(`/customers/${id}`);
    }
    getEnterpriseById(id) {
        return http.get(`/customers/${id}`);
    }
}