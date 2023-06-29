import http from "src/shared/services/http-common.js";

export class DriverShipmentsApiService {
    findShipmentsByShipmentDriverId(shipmentDriverId) {
        return http.get(`/shipment-drivers/${shipmentDriverId}/shipments`);
    }
}