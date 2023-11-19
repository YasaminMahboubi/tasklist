<script setup>
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import login from './login.vue';
    import signup from './signup.vue';
    import avatar from '../global/avatar.vue';

    window.addEventListener('load' , () => {
        if(localStorage.getItem('userData')){
            myStoreOn.registerMain = true;
            myStoreOn.tasksMain = false;
            myStoreOn.showChoosingAvatar = false;
        }
    })


</script>

<template>
    <section id="registerMainSec">
        <signup :class="{'hiddenElement': myStoreOn.displaySignup}"></signup>
        <login :class="{'hiddenElement': myStoreOn.displayLoginNone}"></login>
        <avatar :class="{'hiddenElement': myStoreOn.showChoosingAvatar}"></avatar>
    </section>
</template>

<style>
    #registerMainSec{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .formsDiv{
        width: 80%;
        height: 80%;
        background-color: #1a1c1e;
        border-radius: 1.5rem;
        display: flex;
    }

    .container{
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
    }
    .title{
        font-size: 2rem;
        margin-left: 7%;
        margin-top: 5%;
        color: aliceblue;
    }

    .container > form {
        width: 100%;
        padding: 40px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        padding-top: 2%;
    }

    .form-control {
        width: 100%;
        height: 10%;
        margin: 23px 0;
        display: flex;
        flex-direction: column;
    }

    .form-control > p{
        color: red;
        margin-left: 10%;
    }

    label {
        color: #ecf2ff;
        font-weight: bold;
        margin-bottom: 5px;
        display: inline-block;
        margin-left: 10%;
    }

    .form-control input:not([type='checkbox']) {
        width: 80%;
        margin: 0 auto;
        padding: 10px;
        color: #777;
        font-size: 14px;
        border-radius: 3px;
        font-family: inherit;
        border: 2px solid #ecf2ff;
        background-color: transparent;
    }

    hr{
        width: 2px;
        height: 100%;
        color: #333;
    }

    .submitDiv{
        margin-top: 2rem !important;
    }

    .submitDiv > input{
        background-color:  chocolate !important;
        border: 1px solid transparent !important;
        color: #ecf2ff !important; 
        font-size: 1.2rem !important;
    }
    .submitDiv > input:hover{
        border-color:  chocolate !important;
        background-color: transparent !important;
    }

    .container > .linkToAnotherForm {
        color: #fff;
        text-decoration: none;
        position: absolute;
        left: 30%;
        top: 85%;
    }

    .greenFont{
        color: rgb(77, 135, 65);
    }
    .greenFont:hover{
        color: #517b4f;
        cursor:grab;
    }

    .opacityZero{
    opacity: 0;
    }

    @media screen and (max-width:699px) {
        .container{
            width: 100%;
            height: 90%;
        }
        .submitDiv{
            margin-top: 5rem !important;
        }
        .container > .linkToAnotherForm {
            left: 20%;
            top: 100%;
        }
    }
    @media screen and (min-width:700px) and (max-width:1000px){
        .container > .linkToAnotherForm {
            left: 20%;
        }
    }
</style>