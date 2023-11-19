<script setup>
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import profile from './userSettingChildComponents/profile.vue';
    import buttonSection from './userSettingChildComponents/buttonSection.vue';

    window.addEventListener('load' , () => {
        if(localStorage.getItem('userAvatar')){
            myStoreOn.userProfile = localStorage.getItem('userAvatar');
        }
    })
</script>


<template>
    <section id="userSetting" class="base">
        <main id="mainUserSetting">
            <profile></profile>
            <buttonSection></buttonSection>
        </main>
    </section>
</template>


<style>
    #mainUserSetting{
        align-items: center;
    }
    button{
        border: none;
    }
</style>