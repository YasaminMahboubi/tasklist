<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import newCategoryButton from '../globalChild/newCategoryButton.vue'

    const showTheCategory = () => { myStoreOn.showCategorySmall = true;}
</script>
<template>
       <div id="filterBtn" class="optionBtns">
                <button @click="myStoreOn.filterTask('high' , 'importance')">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span>important</span>
                </button>
                <button @click="myStoreOn.filterTask('completed' , 'completed')">
                    <i class="fa-solid fa-check-double"></i>
                    <span>completed</span>
                </button>
                <button @click="myStoreOn.filterTask('All' , 'All')">
                    <i class="fa-solid fa-list-check"></i>
                    <span>All</span>
                </button>
                </div>
                <p v-if="myStoreOn.addCaregoryFilterBtn">Category</p>
                <div id="category" class="optionBtns" >
                    <button @click="myStoreOn.filterTask('work' , 'category')">
                        <i class="fa-solid fa-briefcase work"></i>
                        <span>work</span>
                    </button>
                    <button @click="myStoreOn.filterTask('shopping' , 'category')">
                        <i class="fa-solid fa-cart-shopping shop"></i>
                        <span>shopping</span>
                    </button>
                    <button @click="myStoreOn.filterTask('studying' , 'category')">
                        <i class="fa-solid fa-book book"></i>
                        <span>studying</span>
                    </button>
                    <newCategoryButton v-for="category in myStoreOn.costumeCategory.filter(task => task.username == myStoreOn.userData[0].username)" :key="category" :new-categorybutton="category"></newCategoryButton>
                </div>
                <button id="addCategoryButton" v-if="myStoreOn.addCaregoryFilterBtn">
                        <i class="fa-solid fa-plus plus"></i>
                        <span @click="showTheCategory">add category</span>
                </button>
</template>
<style scoped>
    .optionBtns{
        width: 90%;
        gap: 1rem;
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        padding-left: 1.7rem;
    }
    .optionBtns > button , #addCategoryButton{
        width: 100%;
        gap: 1rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 1.3rem;
        color: antiquewhite;
        transition-duration: .5s;
    }

    #taskOption > p {
        color: antiquewhite;
        margin-bottom: 1rem;
    }
    #category{ 
        width: 100%;
        font-size: 1rem;
        overflow-x: hidden;
        overflow-y: scroll;
        height: 200px;
    }
    .work{
        color: #06917A;
    }
    .work ~ span:hover {
        color: #06917A;
    }
    .shop{
        color: #774098;
    }
    .shop ~ span:hover{
        color: #774098;
    }
    .book{
        color: #326377;
    }
    .book ~ span:hover{
        color: #326377;
    }
    .plus ~ span:hover , .plus{
        color: #FFC37C;
    }
    #filterBtn >  button:hover{
        color: #CDB995;
    }

    input , button{
    outline: none;
    border: none;
    background-color: transparent;
    }

    button > span {
        text-wrap: wrap;
    }

    @media screen and (max-width: 500px) {
      #filterBtn{
        padding-bottom: 1rem;
      }
      .optionBtns{
        width: 100% !important;
        margin-bottom: 0;
        background-color: #1a1c1e;
        display: grid;
        grid-template-columns: repeat(3,1fr);
        margin-left:  5%;
      }
      .optionBtns > button{
        font-size: 1rem;
      }
      #category{
        gap: 1rem;
        height: 100px;
        position: absolute;
      }
    }
</style>