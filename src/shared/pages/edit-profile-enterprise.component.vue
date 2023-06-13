<template>
    <h3 class="edit-profile-title">Edit profile</h3>
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="edit-form">
        <div class="flex flex-column gap-2">
            <label for="name" class="font-bold block mb-2">Name</label>
            <pv-input-text id="name" v-model="name"/>
            <span v-if="v$.name.$error" class="invalid">
                {{ v$.name.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="description" class="font-bold block mb-2">Description</label>
            <pv-input-text id="description" type="text" v-model="description"/>
            <span v-if="v$.description.$error" class="invalid">
                {{ v$.description.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="withoutgrouping" class="font-bold block mb-2">Ruc</label>
            <pv-input-number v-model="ruc" inputId="withoutgrouping" :useGrouping="false"/>
            <span v-if="v$.ruc.$error" class="invalid">
                {{ v$.ruc.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="withoutgrouping" class="font-bold block mb-2">Phone Number</label>
            <pv-input-number v-model="phoneNumber" inputId="withoutgrouping" :useGrouping="false"/>
            <span v-if="v$.phoneNumber.$error" class="invalid">
                {{ v$.phoneNumber.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="email" class="font-bold block mb-2">Email</label>
            <pv-input-text id="email" type="text" v-model="email"/>
            <span v-if="v$.email.$error" class="invalid">
                {{ v$.email.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex flex-column gap-2">
            <label for="image" class="font-bold block mb-2">Image</label>
            <pv-file-upload
            mode="basic"
            name="demo[]"
            url="/api/upload"
            accept="image/*"
            customUpload
            @uploader="uploadImage"
            />
        </div>
        <pv-divider/>
        <div class="flex-auto">
            <label for="minmaxfraction" class="font-bold block mb-2">Price Base</label>
            <pv-input-number v-model="priceBase" inputId="minmaxfraction" :minFractionDigits="2" :maxFractionDigits="5"></pv-input-number>
            <span v-if="v$.priceBase.$error" class="invalid">
                {{ v$.priceBase.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex-auto">
            <label for="integeronly" class="font-bold block mb-2">Shipping Time</label>
            <pv-input-number v-model="shippingTime" inputId="integeronly"></pv-input-number>
            <span v-if="v$.shippingTime.$error" class="invalid">
                {{ v$.shippingTime.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <div class="flex-auto">
            <label for="integeronly" class="font-bold block mb-2">Score</label>
            <pv-input-number v-model="score" inputId="integeronly"></pv-input-number>
            <span v-if="v$.score.$error" class="invalid">
                {{ v$.score.$errors[0].$message }}
            </span>
        </div>
        <pv-divider/>
        <pv-button type="submit" label="Save changes"></pv-button>
        <pv-divider/>
        <pv-button type="button" label="Cancel changes" @click="cancelChanges"></pv-button>
    </form>
    <pv-toast/>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength, minValue, maxValue, helpers } from '@vuelidate/validators';
import { Base64Manager } from '../services/base64-uploader.service';
import { ProfileApiService } from '../services/profile-api.service';
export default {
    name: "edit-profile-enterprise-component",
    data() {
        return  {
            v$: useVuelidate(),
            userType: null,
            name: null,
            photo: null,
            ruc: null,
            phoneNumber: null,
            description: null,
            email: null,
            priceBase: null,
            factorWeight: null,
            shippingTime: null,
            score: null,
            imageConverter: new Base64Manager(),
            imageDataHandler: { data: null },
            userType: null,
            user: null,
            profileApiService: new ProfileApiService()
        }
    },
    created() {
        this.userType = localStorage.getItem("type");
        const res = JSON.parse(localStorage.getItem("auth"));
        if(res.data) this.user = res.data;
        else this.user = res;
        this.name = this.user.name;
        this.ruc = this.user.ruc;
        this.phoneNumber = parseInt(this.user.phoneNumber);
        this.description = this.user.description;
        this.email = this.user.email;
        this.priceBase = this.user.priceBase;
        this.factorWeight = this.user.factorWeight;
        this.shippingTime = this.user.shippingTime;
        this.score = this.score;
    },
    methods: {
        validateEmail(email) {
            const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            return regex.test(email);
        },
        validatePhoneNumber(phoneNumber) {
            const regex = /^9\d{8}$/;
            return regex.test(phoneNumber);
        },
        getUserDto() {
            return {
                name: this.name,
                photo: this.imageDataHandler.data,
                ruc: this.ruc.toString(),
                phoneNumber: this.phoneNumber.toString(),
                description: this.description,
                email: this.email,
                password: null,
                priceBase: this.priceBase,
                factorWeight: this.factorWeight,
                shippingTime: this.shippingTime,
                score: this.score
            }
        },
        async handleSubmit(valid) {
            const actuallyValid = await this.v$.$validate();
            if(!this.imageDataHandler.data) {
                this.$toast.add({ severity: 'info', summary: 'Submit invalid', detail: 'You must upload an image' , life: 3000});
                return;
            }
            if(!actuallyValid){
                this.$toast.add({ severity: 'info', summary: 'Submit invalid', detail: 'There exists one or more fields which have invalida values' , life: 3000});
                return;
            }
            console.log(this.user);
            console.log(this.user.id);
            this.profileApiService.updateEnterpriseById(this.user.id, this.getUserDto())
                .then( response => {
                        this.$toast.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Enterprises Successfully updated",
                            life: 3000,
                        })
                        this.profileApiService.getEnterpriseById(this.user.id)
                            .then( response => {
                                localStorage.setItem("auth", JSON.stringify(response));
                                this.$emit("user-updated");
                            });
                    },
                    reason => {
                        this.$toast.add({
                            severity: "error",
                            summary: "Service Error",
                            detail: "And Error occured while trying to update the user",
                            life: 3000,
                        });
                    }
                )
                .catch( error => {
                    this.$toast.add({
                        severity: "error",
                        summary: "Service Error",
                        detail: "And Error occured while trying to update the user",
                        life: 3000,
                    });
                    console.error(error);
                });
        },
        async uploadImage(event) {
            await this.imageConverter.upload(event, this.imageDataHandler);
        },
        logOut() {
            this.$emit("logout");
        },
        cancelChanges() {
            this.$emit("cancel-changes");
        }
    },
    validations() {
        return {
            name: { required },
            ruc: { 
                required, 
                minLength: minLength(11),
                maxLength: maxLength(11)
            },
            email: { 
                required,
                validateEmail: helpers.withMessage('Email is not valid', this.validateEmail)
            },
            phoneNumber: {
                required,
                validatePhoneNumber: helpers.withMessage('Phone Number must start with 9 and have 9 digits', this.validatePhoneNumber)
            },
            description: { required },
            priceBase: { required },
            factorWeight: { required },
            shippingTime: { required },
            score: {
                required,
                minValue: minValue(1),
                maxValue: maxValue(5)
            }
        }
    }
}
</script>

<style scoped>
.edit-form {
    text-align: center;
}
.edit-profile-title {
    text-align: center;
}
.invalid {
    color: rgb(255, 0, 0);
    margin-top: 1rem;
}
</style>