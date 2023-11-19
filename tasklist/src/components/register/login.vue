<script setup>
    import slogans from './slogans.vue';
    import { ref } from 'vue';

    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const userEmail = ref('');
    const errorUserEmail = ref(false);

    const password = ref('');
    const errorPass = ref(false);
    
    const checkUserEmail = () => {
        let userEmailInp = userEmail.value.trim();
        errorUserEmail.value = /^[A-Za-z]+$/.test(userEmailInp) ? false :  /^[A-Za-z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(userEmailInp) ? false  : true;
    }

    const chcekPassLogin = () => {
        let passInp = password.value.trimEnd();
        errorPass.value = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[a-zA-Z0-9@#$%^&*!-_+]{6,}$/.test(passInp) ? false : true;
    }

    const loginUser = () => {
        if(userEmail.value !== '' && password.value !== ''){
            if(!errorUserEmail.value && !errorPass.value){
                let allUsers = JSON.parse(localStorage.getItem('allUsers'));
                let checkUser = allUsers.find(user => (user.username == userEmail.value || user.email == userEmail.value) && user.password == btoa(password.value));
    
                if(checkUser){
                    const data = {
                        'username': checkUser.username,
                        'profile':  checkUser.profile,
                    }

                    localStorage.setItem('userData',JSON.stringify(data));
                    myStoreOn.userData[0].username = checkUser.username;
                    myStoreOn.userData[0].profile = checkUser.profile;

                    myStoreOn.showChoosingAvatar = true;
                    myStoreOn.displaySignup = true;
                    myStoreOn.displayLoginNone = true;
                    myStoreOn.changeAvatarProcess = false;
                    myStoreOn.showChoosingAvatar = false;
                    myStoreOn.registerMain = true;
                    myStoreOn.tasksMain = false;

                    myStoreOn.buildPage();
                }
            }
        }
    }    

    const currentWidthRegister = () => {
        if(window.innerWidth <= 699){
            return 'sloganOff';
        }
    }
</script>

<template>
    <div id="login" class="formsDiv">
        <div class="container">
            <p class="title">Login</p>
            <form action="" @submit.prevent="loginUser">
                <div class="form-control">
                    <label for="username">Username or Email</label>
                    <input type="text" id="username" placeholder="Enter your username or your Email address" v-model="userEmail" @focusout="checkUserEmail">
                    <p :class="{'opacityZero' : !errorUserEmail}"> Invalid Username or Email</p>
                </div>

                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" v-model="password" @focusout="chcekPassLogin">
                    <p :class="{'opacityZero' : !errorPass}">Invalid password</p>
                </div>

                <div class="form-control submitDiv">
                    <input type="submit" value="sign up">
                </div>
            </form>
            <p class="linkToAnotherForm">Don't have an account?<span class="greenFont" @click="() => {myStoreOn.displayLoginNone = true;myStoreOn.displaySignup = false;}"> click here</span></p>

        </div>
        <hr v-if="currentWidthRegister() !== 'sloganOff'">
        <slogans :less-gap="true" v-if="currentWidthRegister() !== 'sloganOff'"></slogans>

    </div>
</template>