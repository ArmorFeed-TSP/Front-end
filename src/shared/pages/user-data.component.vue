<template>
    <div v-for="prop in Object.keys(user)" :key="prop" class="profile-data-card">
        <div v-if="prop !== 'token' && prop !== 'userType' && prop !== 'id'">
            <p class="font-bold block mb-2">{{ prop }}:</p>
            <img v-if="prop === 'photo'" :src="user[prop]" alt="user image" class="profile-image">
            <p v-else>{{ user[prop] }}</p>
            <pv-divider/>
        </div>
    </div>
</template>

<script>
export default {
    name: "user-data-component",
    data() {
        return {
            user: null
        }
    },
    created() {
        const res = JSON.parse(localStorage.getItem("auth"));
        if(res.data) this.user = res.data;
        else this.user = res;
        console.log("User data component created", this.user);
    }

}
</script>

<style scoped>
.profile-image {
    display: block;
    max-width: 200px;
    max-height: 300px;
}
</style>