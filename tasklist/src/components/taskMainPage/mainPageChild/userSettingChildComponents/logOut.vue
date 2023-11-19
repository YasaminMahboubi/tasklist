<script setup>
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const killUser = () => {
        localStorage.removeItem('userData');
        myStoreOn.userData = [{username: '', profile: '', userTaskId: 1}];
        myStoreOn.registerMain = false;
        myStoreOn.tasksMain = true;
    } 
</script>

<template>
    <div id="logOutDiv" @click="killUser">
        <i class="fa-solid fa-door-open"></i>
        <p>log out</p>
    </div>
</template>

<style>
    #logOutDiv{
        width: 100%;
        margin-top: 5.3rem;
        color: aliceblue;
        display: flex;
        gap: .5rem;
        padding-left: 1.7rem;
    }
    #logOutDiv:hover{
        color: #eb9128;
    }
    #logOutDiv:hover  i {
        color: #eb9128;
    }

</style>