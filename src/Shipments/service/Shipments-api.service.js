import http from "../../core/services/http-common";

export class ShipmentsApiService {
    getAll(){
        return http.get("/shipments");
    }
}