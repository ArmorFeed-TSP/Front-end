<template>
  <div class="profile-container">
    <h1>Profile</h1>
    <edit-profile-customer-component v-if="editFormDisplayed" @user-updated="updateData"/>
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
import EditProfileComponent from './edit-profile-customer.component.vue';
export default {
    name: "profile-component",
    components: { EditProfileComponent },
    data() { 
        return {
            userType: null,
            user: null,
            editFormDisplayed: false
        }
    },
    created() {
        this.userType = localStorage.getItem("type");
        this.user = JSON.parse(localStorage.getItem("auth"));
    },
    methods: {
        logOut() {
            this.$emit("logout");
        },
        updateData() {
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
</style>