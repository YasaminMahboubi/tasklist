<script setup>
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import userSetting from './mainPageChild/userSetting.vue';
    import display from './mainPageChild/display.vue';
    import vueForm from './mainPageChild/vueForm.vue'
    import extraOPtion from './mainPageChild/extraOPtion.vue';
    import avatar from '../global/avatar.vue';
</script>
<template>
        <userSetting :class="{'hiddenElement': myStoreOn.userSettingDisplay , 'opacityGray': myStoreOn.changeAvatarProcess}"></userSetting>
        <display :class="{'hiddenElement': myStoreOn.displayDisplay , 'opacityGray': myStoreOn.changeAvatarProcess} "></display>
        <vueForm :class="{'hiddenElement': myStoreOn.formDisplay , 'opacityGray': myStoreOn.changeAvatarProcess} "></vueForm>
        <extraOPtion :class="{'hiddenElement': myStoreOn.extraOptionDisplay , 'opacityGray': myStoreOn.changeAvatarProcess}  "></extraOPtion>
        <avatar></avatar>
</template>