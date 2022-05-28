<template>
  <div class="grid">
    <div class="col-12 lg:col-20">
      <div class="p-3 h-full">
        <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
          <div class="text-900 font-medium text-xl mb-2">Notifications</div>
          <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
          <div class="flex align-items-center">
            <span class="font-bold font-medium text-900">Ups S.A.C:</span>
            <span class="ml-2 font-medium text-600">Shipment 00002519 is finished</span>
            <span class="ml-1 font-light text-400">16:30</span>
          </div>
          <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
          <div class="flex align-items-center">
            <span class="font-bold font-medium text-900">Ups S.A.C:</span>
            <span class="ml-2 font-medium text-600">Shipment 00002519 in route</span>
            <span class="ml-1 font-light text-400">11:00</span>
          </div>
          <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
          <div class="flex align-items-center">
            <span class="font-bold font-medium text-900">DHL Express Peru S.A.C:</span>
            <span class="ml-2 font-medium text-600">Shipment 00002518 is finished</span>
            <span class="ml-1 font-light text-400">Yesterday</span>
          </div>
          <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
          <div class="flex align-items-center">
            <span class="font-bold font-medium text-900">DHL Express Peru S.A.C:</span>
            <span class="ml-2 font-medium text-600">Shipment 00002518 in route</span>
            <span class="ml-1 font-light text-400">2 days ago</span>
          </div>



        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NotificationsApiService } from "../service/notifications-api.service";

export default {
  name: "notifications-component",
  data() {
    return {

      notificationService: null,
      notification: [],
      columns: [
        {field: 'name', header: 'Name'},
        {field: 'content', header: 'Content'},
        {field: 'date', header: 'Date'},
      ],
      currentNotifications: [],
    }
  },
  created() {
    this.notificationService = new NotificationsApiService();
    this.notificationService.getAll().then((response) => {
      this.notification = response.data;
      this.currentNotifications = this.notification;
    });
  },

}
</script>