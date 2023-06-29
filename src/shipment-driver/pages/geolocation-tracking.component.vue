<template>
    <p class="geolocation-title">Driver Current Location</p>
    <GMapMap
        :center="position"
        :zoom="18"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
    >
      <GMapCluster>
        <GMapMarker
            :position="position"
            :clickable="true"
            :draggable="false"
        />
      </GMapCluster>
    </GMapMap>
  </template>
  <script>
  import { CustomerShipmentsApiService } from '../../shipments/customer-shipments/services/customer-shipments-api.service';
  export default {
      name: "geolocation-tracking",
      props: {
          shipmentId: Number,
          shipmentDriverId: Number
      },
      data() {
          return {
              position: {
                  lat: 51.093048, lng: 6.842120
              },
              trackingOptions: Object.freeze({
                  HIGH_ACCURACY : true
              }),
              customerId: null,
              enterpriseId: null
          }
      },
      mounted() {
          const shipmentApiService = new CustomerShipmentsApiService();
  
          shipmentApiService.getShipmentById(this.shipmentId)
              .then( response => {
                  this.customerId = response.data.customerId;
                  this.enterpriseId = response.data.enterpriseId;
              }).catch( error => console.error(error) );
      },
      methods: {
          updateLocation(e) {
              console.log("Success ", e);
              this.position.lat = e.coords.latitude;
              this.position.lng = e.coords.longitude;
              this.sendMessageToClient();
          },
          errorInLocation(err) {
              console.log("Error ", err);
          }
      },
  }
  </script>
  
  <style scoped>
  .geolocation-title {
      font-size: 2rem;
      text-align: center;
  }
  </style>