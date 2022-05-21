import http from "../../core/http-common.js";

class SignUpService {
    endPoint = "/signup";
    create(createDto) {
        return http.post(this.endPoint, createDto);
    }
}

export default new SignUpService();
