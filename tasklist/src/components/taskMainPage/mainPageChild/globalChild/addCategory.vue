<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();
    
    const costumeCategory = ref('');
    const randomColorIcon = ref();

    const addCostumeCategory = () => {
        let dataCategory = JSON.parse(localStorage.getItem('costumeCategory'));
        if(costumeCategory.value !== ""){
            let color = randomColor();
            randomColorIcon.value = color;

            let newCategory = {
            username: myStoreOn.userData[0].username,
            name: costumeCategory.value,
            color: color,
            border: '1px solid '+ color,
            borderNone: '' , 
            clicked: 0
        };  

        dataCategory.costumeCategory.push(newCategory)
        localStorage.setItem('costumeCategory', JSON.stringify(dataCategory));
        myStoreOn.costumeCategory.push(newCategory);

        myStoreOn.category = costumeCategory.value;

        setTimeout(() => {
            costumeCategory.value = '';
            randomColorIcon.value = '#494c4f';
        }, 1000);
        }
    }

    const randomColor = () => {
        let randomNum = [];
        let random = Math.floor(Math.random() * 255);
        for(let i=0;i<3;i++){
            let random = Math.floor(Math.random() * 255);
            randomNum.push(random);
        }
        return `rgb(${randomNum[0]},${randomNum[1]},${randomNum[2]})`;
    }

</script>
<template>
    <div class="addCategoryDiv">
        <i class="fa-solid fa-ghost" :style="{'color': randomColorIcon}"></i>
        <input type="text" placeholder="add new category" v-model="costumeCategory">
        <button id="closeBtn" class="closeBtn" @click="$emit('closeDiv')"><b><i class="fa-solid fa-xmark"></i></b></button>
        <button id="checkBtn" @click="addCostumeCategory"><b><i class="fa-solid fa-check"></i></b></button>
    </div>
</template>
<style>
    .addCategoryDiv{
        width: 70%;
        height: 0;
        overflow: hidden ;
        position: relative;
        gap: 1rem;
        align-items: center;
        transition: 0.5s;
    }
    .addCategoryDiv > i {
        grid-area: ghoast;
        font-size: 1.5rem;
        color: #494c4f;
    }
    .addCategoryDiv > input{
        grid-area: input;
        width: 100%;
        border: 1px solid #fff;
        color: #fff;
        height: 60%;
        border-radius: 1rem;
        padding: .3rem;
    }
    .addCategoryDiv > button{
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        border: 1px solid white;
        color: #fff;
        padding: 1rem;
        border-radius: .5rem;
        font-size: 1.2rem;
    }
    .addCategoryDiv > button:hover{
        border-color: #06917A;
        color: #06917A;
    }
    .categoryAdded{
        border-color: #06917A;
        color: #06917A;
    }
    #checkBtn{
        grid-area: checkBtn;
    }
    #closeBtn{
        grid-area: closeBtn;
    }

    @media screen and (max-width:500px) {
        .addCategoryDiv{
            width: 100%;
            gap: .6rem;
        }
        .addCategoryDiv > i{
            font-size: 1.2rem;
        }
        .addCategoryDiv > input{
            height: 50%;
        }
        .addCategoryDiv > button{
            width: 10px;
            height: 10px;
            padding: .8rem;
            font-size: 1rem;
        }
    } 
</style>
