<script setup>
    import { ref } from 'vue';
    import slogans from './slogans.vue';

    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const userSignUp = ref('');
    const errorUser = ref(false);

    const emailSignUp = ref('');
    const errorEmail = ref(false);

    const passSignUp = ref('');
    const errorPass = ref(false);

    const currentWidthRegister = () => {
        if(window.innerWidth <= 699){
            return 'sloganOff';
        }
    }


    const addUser = () => {
        if(userSignUp.value !== '' && emailSignUp.value !== '' && passSignUp.value !== ''){
            if(!errorEmail.value && !errorPass.value && !errorUser.value){

                myStoreOn.showChoosingAvatar = false;
                myStoreOn.displaySignup = true;
                myStoreOn.displayLoginNone = true;
                myStoreOn.changeAvatarProcess = true;
                myStoreOn.showChoosingAvatar = true;
                
                const data = {
                    'username': userSignUp.value,
                    'profile': '',
                    'userTaskId': 1
                }
               
                const dataOfUser = {
                    'id': myStoreOn.usersId,
                    'username': userSignUp.value,
                    'email': emailSignUp.value,
                    'password': btoa(passSignUp.value)
                }
                
                myStoreOn.usersId++;

                localStorage.setItem('userData', JSON.stringify(data));

                let allUsersData = JSON.parse(localStorage.getItem('allUsers'));
                allUsersData.push(dataOfUser);
                localStorage.setItem('allUsers',JSON.stringify(allUsersData));
               
                myStoreOn.userData[0].username = userSignUp.value;
            }
        }
    }


    const checkUsername = () => {
        let userName = userSignUp.value.trim();
        errorUser.value = /^[A-Za-z]+$/.test(userName) ? false : true;
    }

    const checkEmail = () => {
        let email = emailSignUp.value.trim();
        errorEmail.value = /^[A-Za-z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email) ? false : true;
    }

    const checkPass = () => {
        let pass = passSignUp.value.trim();
        errorPass.value = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])[a-zA-Z0-9@#$%^&*!-_+]{6,}$/.test(pass) ? false : true;
    
    }

</script>

<template>
    <div id="signup" class="formsDiv">
        <div class="container">
            <p class="title">sign up</p>
            <form action="" @submit.prevent="addUser">
                <div class="form-control">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="Enter your username" v-model="userSignUp" @focusout="checkUsername">
                    <p :class="{'opacityZero' : !errorUser}">Username can only contain letters</p>
                </div>

                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" v-model="emailSignUp" @focusout="checkEmail">
                    <p :class="{'opacityZero' : !errorEmail}">Invalid Email</p>
                </div>

                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" v-model="passSignUp" @focusout="checkPass">
                    <p :class="{'opacityZero' : !errorPass}">Password should have at least 1 uppercase, 1 lowercase letter, 1 digit and it should be at least 6 characters</p>
                </div>

                <div class="form-control submitDiv">
                    <input type="submit" value="sign up" >
                </div>
            </form>
            <p class="linkToAnotherForm">Already have an account?<span class="greenFont" @click="() => {myStoreOn.displayLoginNone = false;myStoreOn.displaySignup = true;}"> click here</span></p>
        </div>
        <hr v-if="currentWidthRegister() !== 'sloganOff'">
        <slogans v-if="currentWidthRegister() !== 'sloganOff'"></slogans>
    </div>
</template>