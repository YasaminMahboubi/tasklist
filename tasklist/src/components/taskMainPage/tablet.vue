<script setup>
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import profile from './mainPageChild/userSettingChildComponents/profile.vue';
    import filterButtons from './mainPageChild/userSettingChildComponents/filterButtons.vue';
    import addCategory from './mainPageChild/globalChild/addCategory.vue';
    import logOut from './mainPageChild/userSettingChildComponents/logOut.vue';
    import search from './mainPageChild/displayChildComponents/search.vue';
    import date from './mainPageChild/displayChildComponents/date.vue';
    import tasks from './mainPageChild/displayChildComponents/tasks.vue';
    import process from './mainPageChild/extraOptionChildComponents/process.vue';
    import pomodoro from './mainPageChild/extraOptionChildComponents/pomodoro.vue';
    import avatar from '../global/avatar.vue';
    import vueForm from './mainPageChild/vueForm.vue';

    const changeDisplaySmallCategory = () => {myStoreOn.showCategorySmall = false}

</script>
<template>
    <div id="tabletUserSetting" :class="{'opacityGray': myStoreOn.changeAvatarProcess}">
        <profile></profile>
        <div>
            <button class="addNewTask backgroundYellow boldFont" @click="() => myStoreOn.showForm('form' , null , 'tablet') ">+  new task</button>
            <filterButtons></filterButtons>
            <addCategory :class="{'overflowSmall' : myStoreOn.showCategorySmall}" @close-div="changeDisplaySmallCategory"></addCategory>
            <logOut :class="{'displayNone': myStoreOn.showCategorySmall}"></logOut>
        </div>
    </div>
    <div id="rightSection" :class="{'opacityGray': myStoreOn.changeAvatarProcess , 'hiddenElement': myStoreOn.mainTablet}">
        <search></search>
        <div class="labels" id="tabletLabel">
            <p>{{ myStoreOn.labelOfDisplayedTasks }}</p>    
            <date></date>
        </div>
        <div id="tabletTasks">
            <p class="aboutTasks" v-if="myStoreOn.taskHistory.length == 0">-- no tasks  --</p>
            <tasks v-for="task in myStoreOn.taskHistory.filter(task => task.username == myStoreOn.userData[0].username).slice(myStoreOn.startIndex, myStoreOn.startIndex + 4)" :key="task" :single-task="task"></tasks>
        </div>
        <div id="pageFooter">
          <span class="hoverPageCounter" v-for="task in Math.ceil(myStoreOn.taskHistory.length/4)" @click="myStoreOn.otherPage(task , 4)">{{task}}</span>
        </div>
        <div id="tabletExtraOPtion">
            <process></process>
            <pomodoro></pomodoro>
        </div>
    </div>
    <vueForm :class="{'opacityGray': myStoreOn.changeAvatarProcess , 'hiddenElement': myStoreOn.formDisplay }"></vueForm>
    <avatar></avatar>
</template>