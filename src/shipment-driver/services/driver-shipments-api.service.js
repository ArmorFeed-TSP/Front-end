import http from '../http-common';

export class DriverShipmentsApiService {
    findShipmentsByShipmentDriverId(shipmentDriverId) {
        return http.get(`/shipment-drivers/${shipmentDriverId}/shipments`);
    }
}