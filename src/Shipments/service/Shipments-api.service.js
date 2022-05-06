import http from "../../core/services/http-common";

export class ShipmentsApiService {
    getAll(){
        return http.get("/shipments");
    }
    create(data){
        return http.post("/shipments",data);
    }
}