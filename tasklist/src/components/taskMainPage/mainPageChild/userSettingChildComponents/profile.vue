<script setup>
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();
</script>

<template>
     <div id="showUser">
        <div id="showProfile">
            <i id="editProfile" class="fa-solid fa-pen" @click="() => myStoreOn.changeAvatar()"></i>
            <img :src="myStoreOn.userData[0].profile" alt="user profile">
        </div>
        <div id="welcomeUser">
            <p class="pSize whiteFont">welcome</p>
            <p class="boldFont yellowFont">{{ myStoreOn.userData[0].username }}</p>
        </div>
    </div>
</template>

<style>
    #showUser{
        width: 90%;
        height: 16%;
        display: flex;
        padding: .3rem;
        background-color: #1A1C1E;
    }
    #showUser > div{
        width: 100%;
        height: 100%;
    }
    #showProfile{
        position: relative;
        padding: .3rem;
    }
    #showProfile > img{
        width: 75%;
        height: 75%;
        border-radius: 50%;
    }
    #showProfile > i {
        color: #fff;
        position: absolute;
        top: 62%;
        left: 55%;
    }
    #showProfile > i:hover{
        color: #06917A;
    }
    #welcomeUser{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: .5rem;
    }

    @media screen and (max-width: 500px) {
        #welcomeUser{
            padding-top: 10%;
        }
    }
    @media screen  and (min-width: 1134px) and (max-width: 1159px) {
        #welcomeUser{
            padding-top: 10%;
        }
        #showProfile > img{
            width: 60%;
            height: 65%;
        }
    }
</style>