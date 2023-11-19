<script setup>
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import filterButtons from './filterButtons.vue';
    import addCategory from '../globalChild/addCategory.vue';
    import logOut from './logOut.vue';

    const changeDisplaySmallCategory = () => {myStoreOn.showCategorySmall = false}


</script>
<template>
    <div id="taskOption">
                <button class="addNewTask backgroundYellow boldFont" @click="() => myStoreOn.showForm('form' , null , 'laptop') ">+  new task</button>
                <filterButtons></filterButtons>
                <addCategory :class="{'overflowSmall' : myStoreOn.showCategorySmall}" @close-div="changeDisplaySmallCategory"></addCategory>
                <logOut :class="{'displayNone': myStoreOn.showCategorySmall}"></logOut>
    </div>
</template>
<style>
     #taskOption{
        width: 90%;
        height: 84%;
        display: flex;
        gap: .5rem;
        padding: .5rem;
        padding-left: 10%;
        flex-direction: column;
        background-color: #1A1C1E;
    }
    #addNewTask:hover{
        color: antiquewhite;
        background-color: #eb9128;
    }
    .overflowSmall{
        width: 90% !important;
        height: 7rem;
        padding: .5rem;
        transition: 0.5s;
        display: grid !important;
        grid-template-rows: 1fr 1fr;
        grid-template-areas: 'input input input'
                            'closeBtn ghoast checkBtn';
    }
    .overflowSmall > input{
        height: auto;
    }
    .overflowSmall > button{
        width: 10px !important;
        height: 10px !important;
    }

</style>