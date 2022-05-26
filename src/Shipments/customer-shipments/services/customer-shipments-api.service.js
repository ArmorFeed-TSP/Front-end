import http from "../../../core/services/http-common";

export class CustomerShipmentsApiService {
    findByCustomerId(id) {
        return http.get(`/shipments?customerId=${id}`);
    }
    getEnterpriseById(id){
        return http.get(`/enterprises/${id}`);
    }
    getShipmentById(id){
        return http.get(`/shipments/${id}`);
    }
}