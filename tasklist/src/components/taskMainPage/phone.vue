<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import profile from './mainPageChild/userSettingChildComponents/profile.vue';
    import search from './mainPageChild/displayChildComponents/search.vue';
    import date from './mainPageChild/displayChildComponents/date.vue';
    import vueForm from './mainPageChild/vueForm.vue';
    import tasks from './mainPageChild/displayChildComponents/tasks.vue';
    import filterButtons from './mainPageChild/userSettingChildComponents/filterButtons.vue';
    import process from './mainPageChild/extraOptionChildComponents/process.vue';
    import pomodoro from './mainPageChild/extraOptionChildComponents/pomodoro.vue';

    const dropDownON = ref(false);
    const showDropDown = () => {
        dropDownON.value = true;
        myStoreOn.showDropDown = true;
    }
    const hideDropDown = () => {
        dropDownON.value = false;
        myStoreOn.showDropDown = false;
    }
</script>

<template>
      <profile></profile>
      <search></search>
      <date></date>
      <div id="phoneLabel" :class="{'hiddenElement': myStoreOn.phoneTasksSection}">
        <p>My tasks</p>
        <p>{{ myStoreOn.labelOfDisplayedTasks }}</p> 
      </div>
      <div id="phoneFilterDiv" :class="{'hiddenElement': myStoreOn.phoneTasksSection}">
        <button @click="showDropDown">Filter</button>
        <i class="fa-solid fa-caret-down" @click="showDropDown" v-if="!myStoreOn.showDropDown"></i>
        <i class="fa-solid fa-caret-up" @click="hideDropDown" v-if="myStoreOn.showDropDown"></i>
        <div id="dropDownContainer" v-if="myStoreOn.showDropDown">
          <filterButtons></filterButtons>
        </div>
      </div>
      <hr class="filterSeperator" :class="{'hiddenElement': dropDownON, 'hiddenElement': myStoreOn.phoneTasksSection}">
      <div id="phoneTasks" :class="{'opacityGray': myStoreOn.showDropDown , 'hiddenElement': myStoreOn.phoneTasksSection}">
        <p class="aboutTasks" v-if="myStoreOn.taskHistory.length == 0">-- no tasks  --</p>
        <tasks v-for="task in myStoreOn.taskHistory.filter(task => task.username == myStoreOn.userData[0].username).slice(myStoreOn.startIndex, myStoreOn.startIndex + 2)" :key="task" :single-task="task"></tasks>
      </div>
      <div id="phoneAddTaskDiv" :class="{'hiddenElement': myStoreOn.phoneTasksSection}">
        <div>
          <span class="hoverPageCounter" v-for="task in Math.ceil(myStoreOn.taskHistory.length/2)" @click="myStoreOn.otherPage(task , 2)">{{task}}</span>
        </div>
        <button id="addNewTask" class="backgroundYellow boldFont" @click="() => myStoreOn.showForm('form' , null , 'phone') ">+  new task</button>
      </div>
      <vueForm :class="{'hiddenElement': myStoreOn.formDisplay , 'opacityGray': myStoreOn.changeAvatarProcess}"></vueForm>
      <process></process>
      <pomodoro></pomodoro>
</template>