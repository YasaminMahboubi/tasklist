<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const todayDate = ref('Today');
    const currentDate = new Date();
    let today = currentDate.getDate() +'/'+ (1 + currentDate.getMonth())+'/'+currentDate.getFullYear();
    myStoreOn.todayDate = currentDate.getDate() +'/'+ (1 + currentDate.getMonth())+'/'+currentDate.getFullYear();
    myStoreOn.yesterDayDate = (currentDate.getDate() -1 ) +'/'+ (1 + currentDate.getMonth())+'/'+currentDate.getFullYear();

</script>

<template>
    <div id="process" >
        <p class="todayDate" v-if="myStoreOn.todayTitle == today">Today</p>
        <p class="todayDate" v-else>{{ myStoreOn.todayTitle }}</p>
        <div>
            <p>{{ myStoreOn.calcPercent(myStoreOn.todayDate) }} %</p>
        </div>

        <p>{{myStoreOn.completedTasks(myStoreOn.todayDate, myStoreOn.yesterDayDate)}} out of {{myStoreOn.allTasks(myStoreOn.todayDate)}} completed</p>

        <p class="yesterday" v-if="myStoreOn.todayTitle == today"> Yesterday: {{ myStoreOn.calcPercent(myStoreOn.yesterDayDate)  }} %</p>
        <p class="yesterday" v-else> {{ myStoreOn.yesterDayTitle }} : {{ myStoreOn.calcPercent(myStoreOn.yesterDayDate)  }} %</p>
    </div>
</template>

<style>
    #process  {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        position: relative;
    }
    #process > div {
        width: 70%;
        height: 50%;
        border-radius: 50%;
        border: 1px solid antiquewhite;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #process > div > p {
        font-size: 1.5rem;
        color: #eb9128;
    }
    #process > p {
        color: antiquewhite;
    }
    .yesterday{
        position: absolute;
        left: 5%;
        top: 90%;
        color: #777 !important;
    }
    .todayDate{
        position: absolute;
        top: 2%;
        left: 5%;
        color: #777 !important;
    }

    @media screen and (max-width: 500px) {
        #process{
            width: 80%;
            height: 300px;
            background-color: #1a1c1e;
        }
        #process > div {
            width: 50%;
            height: 60%;
            margin: .1rem;
        }
        #process  > p{
            font-size: 1rem;
        }
        .yesterday{
            top: 90%;
        }
    }
</style>