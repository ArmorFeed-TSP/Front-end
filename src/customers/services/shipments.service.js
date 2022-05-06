import http from "../../core/http-common.js";

class ShipmentsService {
    endPoint = "/shipments";

    create(createShipmentDto) {
        return http.post(this.endPoint, createShipmentDto);
    }
}

export default new ShipmentsService();
