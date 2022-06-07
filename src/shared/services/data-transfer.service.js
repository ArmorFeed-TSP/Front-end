class DataTransferService {
  constructor() {
    this._userId = null;
  }
  get userId(){
    return this._userId;
  }
  set userId(userId) {
    this._userId = userId;
  }
}

export default new DataTransferService();