<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import addCategory from './globalChild/addCategory.vue';
    import newCategory from './globalChild/newCategory.vue';

    const hiddenCategory = ref(true);

    const showAddCategory = () => { hiddenCategory.value = false };
    const changeDisplayCategory = () => {hiddenCategory.value  = true;}
    
</script>
<template>
    <section class="base" id="formSection">
        <main>
            <div>
                <span>
                    <i class="fa-regular fa-circle-left" id="backButton" @click="myStoreOn.hideForm()"></i>
                </span>
                <div>
                    <form id="tasksForm" method="" action="" @submit.prevent="showFormData">
                        <input type="text" placeholder="title" id="titleInp" name="title" v-model="myStoreOn.title">
                        <p>importance: </p>
                        <div id="importanceDiv">
                            <span id="high" :class="{'high' : myStoreOn.highButton}" @click="myStoreOn.importanceBtnActive('high')">
                                high
                            </span>
                            <span id="medium" :class="{'medium' : myStoreOn.mediumButton}" @click="myStoreOn.importanceBtnActive('medium')">
                                medium
                            </span>
                            <span id="low" :class="{'low' : myStoreOn.lowButton}" @click="myStoreOn.importanceBtnActive('low')">
                                low
                            </span>
                        </div>
                        <p>category: </p>
                        <div id="categoryAndAddCategory">
                            <div id="categoryDiv">
                                <span id="work" :class="{'work' : myStoreOn.workButton}" @click="myStoreOn.categoryBtnActive('work')">work</span>
                                <span id="shopping" :class="{'shopping' : myStoreOn.shopButton}" @click="myStoreOn.categoryBtnActive('shopping')">shopping</span>
                                <span id="studying" :class="{'studying' : myStoreOn.studyButton}" @click="myStoreOn.categoryBtnActive('studying')">studying</span>
                                <newCategory v-for="category in myStoreOn.costumeCategory.filter(task => task.username == myStoreOn.userData[0].username)" :key="category" :new-category="category"></newCategory>
                            </div>
                            <span id="addCategory" @click="showAddCategory"><b>+</b></span>
                        </div>
                        <p :class="{'displayNone' : hiddenCategory}" id="addCategoryTitle">Add Category: </p>
                        <addCategory :class="{'overflow' : !hiddenCategory}" @close-div="changeDisplayCategory"></addCategory>
                        <input type="button" value="add this Task" class="submit" :class="{'displayNone': myStoreOn.editTaskOn}" @click="myStoreOn.addNewTask">
                        <input type="button" value="save changes" class="submit" :class="{'displayNone': !myStoreOn.editTaskOn}" @click="myStoreOn.editTaskCheck">
                    </form> 
                </div>
                <div id="status" :class="{'displayNone': myStoreOn.notShowStatusDiv}">
                            <p :class="{'displayNone': myStoreOn.addTaskStatus}">task successfully added</p>
                            <p :class="{'displayNone': myStoreOn.editTaskStatus}">task successfully edited</p>
                </div>
            </div>
        </main>
    </section>
</template>

<style>
    #formSection > main > div{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: .5rem;
        position: relative;
    }


    main > div > span{
        height: 10%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 5%;
    }
    #backButton{
        font-size: 2rem;
        color: #2777DA;
    }

    #formSection > main > div > div{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    form{
       width: 80%;
       height: 85%;
       display: flex;
       flex-direction: column;
       gap: 1.2rem;
    }
    #titleInp {
        width: 60%;
        padding: .5rem;
        border-radius: 1rem;
        border: 1px solid antiquewhite;
        color: antiquewhite;
        font: 1.2rem;
        padding: .4rem;
    }
    form > p {
        color: #fff;
        font-size: 1.9rem;
    }
    #tasksForm > div {
        width: 70%;
        display: flex;
    }
    .addCategoryDiv{
        display: flex;
    }
    #categoryAndAddCategory{
        display: grid !important;
        grid-template-columns: 5fr 1fr !important;
        gap: .5rem;
    }
    #importanceDiv{
        display: flex;
        gap: .5rem;
    }
    #categoryDiv{
        display: grid !important;
        grid-template-columns: repeat(3,1fr);
        gap: .5rem;
        height: 100px !important;
        overflow-y: scroll;
       
    }
    #importanceDiv > span , #categoryDiv > span{
        width: 90%;
        height: 50px;
        padding: .5rem;
        border-radius: .8rem;
        padding: .5rem;
        background-color: #1a1c1e;
        border: 2px solid #494c4f;
        transition-duration: .7s;
    }
    #addCategory{
        width: 50% !important;
        height: 50px;
        border-radius: .3rem;
        display: flex !important;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
        background-color: #ffc37c !important;
        border: none !important;
    }
    #addCategory:hover{
        color: antiquewhite;
        background-color: #eb9128 !important;
    }
    #status {
        width: 20%;
        height: 40px !important;
        border: 1px solid rgb(77, 135, 65);
        color: rgb(77, 135, 65);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: .8rem;
        position: absolute;
        top: 50%;
        left: 70%;
    }
    /* --------------- importance ----------------- */
    #high{
        color: rgb(255, 0, 0);
    }
    #high:hover{
        border: 3px solid rgb(255, 0, 0);
    }
    #medium{
        color: rgb(252, 205, 33);
    }
    #medium:hover{
        border: 3px solid rgb(252, 205, 33);
    }
    #low{
       color: rgb(77, 135, 65);
    }
    #low:hover{
        border: 3px solid rgb(77, 135, 65);
    }
    .submit{
        color: #fff;
        width: 70%;
        height: 35px;
        border-radius: 1rem;
        background-color: #2777DA;
        transition-duration: 1s;
        font-size: 1rem;
        border: none;
    }
   

    /* -------------------- category ------------------------------ */
    #work{
        color: #06917A;
    }
    #work:hover{
        border: 3px solid #06917A;
    }
    #shopping{
        color: #774098;
    }
    #shopping:hover{
        border: 3px solid #774098;
    }
    #studying{
        color: #326377;
    }
    #studying:hover{
        border: 3px solid #326377;
    }
    /* ------------------- general classes -------------------- */
    .displayNone{
        display: none !important;
    }
    .overflow{
        height: 6rem;
        padding: .5rem;
        transition: 0.5s;
    }

    @media screen and (max-width: 500px) {
        #formSection > main > div {
            width: 90%;
            margin: 0 auto;
            padding-top: .5rem;
            gap: 1rem;
        }
        #backButton{
            font-size: 1.5rem;
        }
        form{
            height: 90%;
            gap: 1.5rem;
            align-items: center;
            padding-bottom: .5rem;
        }
        #titleInp{
            width: 100%;
            padding: .2rem;
        }
        form > p {
            font-size: 1.5rem;
        }
        #categoryAndAddCategory{
            display: flex !important;
            flex-direction: column;
            width: 100%;
            align-items: center;
            gap: 1rem;
        }
        #tasksForm > div {
            width: 100%;
        }
        #categoryDiv{
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3,1fr) Im !important;
        }
        #categoryAndAddCategory > span {
            width: 20%  !important;
            height: 10%;
        }

        #importanceDiv {
            width: 50% !important;
            flex-direction: column;
        }
        #categoryDiv{
            width: 50%;
            grid-template-columns: 1fr;
        }
        .overflow{
            height: 5rem;
        }
        #status{
            width: 30%;
            padding: 3rem;
            height: 100px;
        }
    }

    @media screen and (min-width: 791px) and (max-width: 1221px){
        #categoryDiv{
            height: 126px !important;
        }
        #categoryDiv > button{
            padding: .1rem;
        }
    }   
</style>