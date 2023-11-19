<script setup>
    import { ref , computed } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import search from './displayChildComponents/search.vue';
    import date from './displayChildComponents/date.vue';
    import tasks from './displayChildComponents/tasks.vue';

    const todayDate = ref('');
    window.addEventListener('click' , () => {
        const currentDate = new Date();
        todayDate.value = currentDate.getDate() +'/'+ (1 + currentDate.getMonth())+'/'+currentDate.getFullYear();
    })
</script>

<template>
    <section id="display" class="base">
        <main>
            <search></search>
            <section id="bodyDisplay" :class="{'hiddenElement': addingNewTask}">
                <section class="labels">
                    <p>Showing {{ myStoreOn.labelOfDisplayedTasks }} Tasks</p>    
                    <date></date>
                </section>
                <section id="tasksBody">
                    <p class="aboutTasks" v-if="myStoreOn.taskHistory.length == 0">-- no tasks  --</p>
                    <tasks v-for="task in myStoreOn.taskHistory.filter(task => task.username == myStoreOn.userData[0].username).slice(myStoreOn.startIndex, myStoreOn.startIndex + 9)" :key="task" :single-task="task"></tasks>
                </section>
                <footer id="pageCounter">
                    <span v-for="task in Math.ceil(myStoreOn.taskHistory.length/9)" @click="myStoreOn.otherPage(task,9)">{{task}}</span>
                </footer>
            </section>
        </main>
    </section>
</template>
<style>
    main{
        border-radius: 0;
        padding-right: 1rem;
    }
    /* -------------------------- tasks body display -------------------------------------------------------- */
    #bodyDisplay{
        width: 100%;
        height: 95%;
        padding: .8rem;
        border-radius: .5rem;
        display: flex;
        flex-direction: column;
    }
    /* -------------------------- labels -------------------------------------------------------- */
    .labels{
        width: 100%;
        height: 10%;
        display: flex;
        color: antiquewhite;
        align-items: flex-start;
        justify-content: space-between;
    }
    /* -------------------------- tasks -------------------------------------------------------- */
    #tasksBody{
        gap: .5rem;
        width: 100%;
        height: 80%;
        display: grid;
        padding-top: .4rem;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: repeat(3,1fr);
    }
     /* -------------------------- footer -------------------------------------------------------- */
    footer{
        height: 10%;
        color: #fff;
        display: flex;
        align-items: center;
        font-size: 1.5rem;
        gap: 1rem;
    }
    /* -------------------------- general classes -------------------------------------------------------- */
    .pen:hover{
        color: #06917A;
    }
    .trash:hover{
        color: red;
    }
</style>