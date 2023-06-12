<template>
  <div class="profile-container">
    <h1>Profile</h1>
    <user-data-component v-if="editFormDisplayed === false"/>
    <div v-if="userType === 'customer'">
        <edit-profile-customer-component v-if="editFormDisplayed" @user-updated="updateData" @cancel-changes="cancelChanges"/>
    </div>
    <div v-else>
        <edit-profile-enterprise-component v-if="editFormDisplayed" @user-updated="updateData"/>
    </div>
    <pv-divider/>
    <pv-button
      v-if="editFormDisplayed === false"
      @click="editFormDisplayed = true"
      class="pi pi-pencil profile-button"
      label="Edit"
    />
    <pv-button
        @click="logOut"
        icon="pi pi-power-off"
        class="p-button-text p-button-danger profile-button"
        label="Log Out"
    ></pv-button>
  </div>
</template>

<script>
import EditProfileCustomerComponent from './edit-profile-customer.component.vue';
import EditProfileEnterpriseComponent from './edit-profile-enterprise.component.vue';
import UserDataComponent from './user-data.component.vue';
export default {
    name: "profile-component",
    components: { 
        EditProfileCustomerComponent, 
        EditProfileEnterpriseComponent, 
        UserDataComponent 
    },
    data() { 
        return {
            userType: null,
            user: null,
            editFormDisplayed: false,
            displayUserData: true
        }
    },
    created() {
        this.userType = localStorage.getItem("type");
        this.user = JSON.parse(localStorage.getItem("auth"));
        console.log(Object.keys(this.user));
    },
    methods: {
        logOut() {
            this.$emit("logout");
        },
        updateData() {
            this.editFormDisplayed = false
            this.user = JSON.parse(localStorage.getItem("auth"));
            console.log("Data updated");
            this.$forceUpdate();
        },
        cancelChanges() {
            this.editFormDisplayed = false
        }
    }
}
</script>

<style scoped>
.profile-button {
    margin-left: 50%;
    transform: translateX(-50%);
}
.profile-container {
    padding: 0 5rem;
}
.profile-data-card {
    
}
.profile-image {
    display: block;
    max-width: 200px;
    max-height: 300px;
}
</style>