export class DataTransferService {
  constructor() {
    this._customerShipmentsIds = [];
    this._enterpriseShipmentsIds = [];
  }

  get customerShipmentsIds() {
    return this._customerShipmentsIds;
  }
  addCustomerShipmentId(customerShipmentId) {
    this._customerShipmentsIds.push(customerShipmentId);
  }

  get enterpriseShipmentsIds() {
    return this._enterpriseShipmentsIds;
  }
  addEnterpriseShipmentId(customerShipmentId) {
    this._enterpriseShipmentsIds.push(customerShipmentId);
  }

}

const $dataTransfer = new DataTransferService();

export default $dataTransfer;