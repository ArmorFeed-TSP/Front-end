<template>
  <div class="grid">
    <div class="col-12 lg:col-20">
      <div class="p-3 h-full">
        <div class="p-3 h-full flex flex-column" style="border-radius: 6px">
          <div class="text-900 font-medium text-xl mb-2">Notifications</div>
          <hr class="my-3 mx-0 border-top-1 border-none surface-border" />
          <div v-for="(notification, index) in notification" v-bind:key="index">
            <div class="flex align-items-center">
              <span class="font-bold font-medium text-900">{{notification.title}}</span>
              <span class="ml-2 font-medium text-600">{{notification.description}}</span>
            </div>
            <pv-divider></pv-divider>
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
      currentNotifications: []
    }
  },
  created() {
    this.notificationService = new NotificationsApiService();
    const user = JSON.parse(localStorage.getItem("auth"));
    if(localStorage.getItem("type") === "customer") {
      this.getNotificationsByCustomerId(user.id);
      return;
    }
    this.getNotificationsByEnterpriseId(user.id);
  },
  methods: {
    getNotificationsByCustomerId(customerId) {
      this.notificationService.getNotificationsByCustomerId(customerId)
        .then( response => {
          this.notification = response.data;
          console.log(response.data);
        });
    },
    getNotificationsByEnterpriseId(enterpriseId) {
      this.notificationService.getNotificationsByEnterpriseId(enterpriseId)
        .then( response => {
          this.notification = response.data;
          console.log(response.data);
        })
    }
  }
}
</script>
