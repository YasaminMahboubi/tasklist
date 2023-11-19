<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const props = defineProps({
        singleTask: Object
    })
    
    const editTask = (task) => {
        myStoreOn.showForm('edit' , task , '');
    }

    const color = ref('');
    const border = ref('');

    if(myStoreOn.costumeCategory.length !== 0 ){
        let findCategory = myStoreOn.costumeCategory.find(category => category.name == props.singleTask.category);
        if(findCategory !== undefined){
            color.value = findCategory.color;
            border.value = findCategory.border;
        }
    }


</script>
<template>
     <div class="tasks">
        <div id="editAndCheckBox">
                <span id="checkBox" @click="myStoreOn.checkTheTask(singleTask)">
                    <i class="fa-solid fa-check" v-if="singleTask.checked"></i>
                </span>
                <div id="editAndDelete">
                    <i class="fa-solid fa-pen pen" @click="editTask(singleTask)"></i>
                    <i class="fa-solid fa-trash trash" @click="myStoreOn.deleteTask(singleTask.id)"></i>
                </div>
        </div>
        <div id="titleDiv">{{ singleTask.title }}</div>
        <div id="dateDiv">{{ singleTask.date }} </div>
        <div id="labelButtons">
            <button v-if="singleTask.category && ['work', 'shopping', 'studying'].includes(singleTask.category)" 
                id="categoryLabel" 
                :class="singleTask.category">
                {{ singleTask.category }}
            </button>

            <button v-else  :style="{'color': color, 'border': border}">{{ singleTask.category }}</button>

            <button id="importanceLabel" :class="singleTask.importance">{{singleTask.importance}}</button>
        </div>
    </div>
</template>

<style>
    .tasks{
        width: 100%;
        height: 100%;
        background-color: #1A1C1E;

        display: flex;
        flex-direction: column;
    }
    .tasks > div {
         display: flex;
         color: #fff;
         padding: .5rem;
    }
    #editAndCheckBox{
        justify-content: space-between;
    }
    #checkBoxAndDate {
        display: flex;
        gap: 1rem;
    }
    #editAndDelete{
        display: flex;
        gap: 1rem;
    }
    #checkBox{
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid #fff;
        padding-bottom: 5px;
        padding-left: 2px;
    }
    #checkBox > i {
        color: #06917A;
        margin: 1.rem;
    }
    #dateDiv{
        font-size: .8rem;
    }
    #labelButtons{
        height: 30%;
        display: flex;
        gap: .5rem;
    }
    #labelButtons > button{
        width: 45%;
        font-size: 1rem;
        border-radius: .5rem;
        border-width: 1px !important;
    }

    @media screen and (max-width: 500px) {
        .tasks{
            width: 80%;
            margin: 0 auto;
        }
    }
</style>