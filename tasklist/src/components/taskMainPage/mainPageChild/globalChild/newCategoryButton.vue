<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();
    
     const props = defineProps({
        newCategorybutton: Object
    })

    const color = ref('antiquewhite');
    const borderOn = (category) => {
        color.value = category.color;
    }
    const borderOff = () => {
        color.value = 'antiquewhite';
    }
</script>
<template>
    <button @click="myStoreOn.filterTask( newCategorybutton.name , 'category')" @mouseover="borderOn(newCategorybutton)" :style="{'color': color}" @mouseout="borderOff">
        <i class="fa-solid fa-ghost" :style="{'color': newCategorybutton.color}"></i>
        <span>{{ newCategorybutton.name }}</span>
    </button>
</template>