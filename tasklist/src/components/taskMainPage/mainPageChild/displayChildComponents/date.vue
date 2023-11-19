<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const today = ref(true);
    const day = ref('');
    const date = ref('');

    const thisYearDate = new Date;
    const year = thisYearDate.getFullYear();
    
    const todayCompleteDate = ref('');

    const toChangeDay = ref({'day':0,'dayOfMonth': 0,'month':0});

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const toChangeDayFunction = (dayOfWeek,dayOfMonth,month) => {
            toChangeDay.value.day = dayOfWeek;
            toChangeDay.value.dayOfMonth = dayOfMonth;
            toChangeDay.value .month= month;
    }

    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    day.value = days[dayOfWeek];

    const month = currentDate.getMonth();
    const dayOfMonth = currentDate.getDate();
    date.value = dayOfMonth + " " + months[month];
    todayCompleteDate.value = dayOfMonth+'/'+(month+1)+'/'+year;
    toChangeDayFunction(dayOfWeek, dayOfMonth, month);

    const oneDayAgo = () => {
            let dayOfWeek =  toChangeDay.value.day - 1;
            let dayOfMonth = toChangeDay.value.dayOfMonth -1;
            let month = toChangeDay.value.month;

            if(dayOfMonth == 0){
                month--;
                switch (month) {
                    case 0:
                    case 2:
                    case 4:
                    case 6:
                    case 7:
                    case 9:
                    case 11:
                        dayOfMonth = 31;
                        break;
                    case 1:
                        dayOfMonth = 28;
                        break;
                    case 3:
                    case 5:
                    case 8:
                    case 10:
                        dayOfMonth = 30;
                        break;
                }
            }
            if(dayOfWeek == -1){
                dayOfWeek = 6;
            }

            let dateForServer = dayOfMonth+'/'+(month+1)+'/'+year;
            today.value = dateForServer == todayCompleteDate.value ? true : false;
            day.value = days[dayOfWeek];
            date.value = dayOfMonth + " " + months[month];

            toChangeDayFunction(dayOfWeek, dayOfMonth, month);

            myStoreOn.todayDate = dateForServer;
            myStoreOn.yesterDayDate = (dayOfMonth - 1)+'/'+(month+1)+'/'+year;

            myStoreOn.filterTaskHistoryDisplay(dateForServer);

    }

    const nextDay = () => {

            let middleMonths = [3,5,8,10];

            let dayOfWeek =  toChangeDay.value.day + 1;
            let dayOfMonth = toChangeDay.value.dayOfMonth + 1;
            let month = toChangeDay.value.month;

            if(dayOfMonth == 29 && month == 2){
                dayOfMonth = 1;
                month++;
            }
            else if(dayOfMonth == 31){
                let index = middleMonths.indexOf(month);
                if(index !== -1){
                    dayOfMonth = 1;
                    month++;
                }
            }
            else if(dayOfMonth == 32 && month<11){
                dayOfMonth = 1;
                month++;
            }
            else if(dayOfMonth == 32 && month == 11){
                dayOfMonth = 1;
                month = 0;
            }


            if(dayOfWeek > 6){
                dayOfWeek = 0;
            }

            let dateForServer = dayOfMonth+'/'+(month + 1)+'/'+year;

            today.value =  dateForServer == todayCompleteDate.value ? true : false;

            day.value = days[dayOfWeek];
            date.value = dayOfMonth + " " + months[month];

            toChangeDayFunction(dayOfWeek, dayOfMonth, month);

            myStoreOn.todayDate = dateForServer;
            myStoreOn.yesterDate = (dayOfMonth - 1)+'/'+(month+1)+'/'+year;
            myStoreOn.filterTaskHistoryDisplay(dateForServer);

    }

</script>
<template>
    <div id="dateSection">
        <div id="nextLastDay">
            <i class="fa-solid fa-chevron-left" @click="oneDayAgo"></i>
            <div id="date">
                <div id="day">
                    <p v-if="today">today,&nbsp;</p>
                    <p>{{ day }}</p>
                </div>
                <p>{{ date }}</p>
            </div>
            <i class="fa-solid fa-chevron-right" @click="nextDay"></i>
        </div>
    </div>
</template>

<style>
    #nextLastDay{
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        color: antiquewhite;
    }
    #nextLastDay > i:hover{
        color: #FFC37C;
    }
    #date{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100px;
    }
    #day{
        display: flex;
    }
</style>