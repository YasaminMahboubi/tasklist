<script setup>
  import { myStore } from './stores/myStore';
  const myStoreOn = myStore();

  import register from './components/register/register.vue';
  import mainPage from './components/taskMainPage/mainPage.vue';

  if(!localStorage.getItem('allUsers')){
      localStorage.setItem('allUsers' ,  '[]');
  }
  if(!localStorage.getItem('costumeCategory')){
      localStorage.setItem('costumeCategory' , JSON.stringify({costumeCategory: []}));
  }
</script>

<template>
  <register :class="{'displayNone': myStoreOn.registerMain}"></register>
  <mainPage :class="{'displayNone': myStoreOn.tasksMain}"></mainPage>
</template>

