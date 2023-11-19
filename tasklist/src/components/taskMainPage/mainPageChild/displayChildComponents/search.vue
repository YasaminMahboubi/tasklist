<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const toFindTask = ref('');

    const findTasksByTitle = () => {
        if(myStoreOn.localStorageData.length !== 0){
        let foundTitle = myStoreOn.localStorageData.filter(task => task.username == myStoreOn.userData[0].username && task.title.includes(toFindTask.value));
            myStoreOn.taskHistory = foundTitle;
            myStoreOn.labelOfDisplayedTasks = `search for ${toFindTask.value}`;

        if(toFindTask.value == ''){
            myStoreOn.taskHistory = myStoreOn.localStorageData.filter(task => task.username == myStoreOn.userData[0].username);
            myStoreOn.labelOfDisplayedTasks = 'All';
        }
        }
    }
</script>
<template>
    <header>
            <input type="text" name="searchFor" id="searchInput" placeholder="Search here..." v-model="toFindTask" @keyup="findTasksByTitle">
            <i class="fa-solid fa-magnifying-glass"></i>
    </header>
</template>

<style>
    header{
        width: 100%;
        height: 5%;
        display: flex;
        padding: .3rem;
        position: relative;
    }
    header > input{
        width: 60%;
        height: 35px;
        padding: .5rem; 
        border-radius: 1rem;
        color: antiquewhite;
        background-color: #1A1C1E;
        border: none;
    }
    header > i {
        position: absolute;
        left: 57%;
        top: 12px;
        color: #2777DA;
    }

    @media screen and (max-width: 500px) {
        header > input{
            width: 92%;
            margin: 0 auto;
        }
        header > i{
            left: 89%;
        }
        
    }
</style>
