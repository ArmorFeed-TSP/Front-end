import http from "../../shared/services/http-common";

export class ShipmentsApiService {
    endPoint = '/shipments';
    getAll(){
        return http.get("/shipments");
    }
    create(data){
        return http.post("/shipments",data);
    }
    update(id, updateShipmentStatus) {
        return http.put(`${this.endPoint}/${id}`, updateShipmentStatus);
    }
}
export default new ShipmentsApiService();
