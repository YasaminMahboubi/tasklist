<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const borderColor = ref('1px solid rgb(79, 85, 91)');

    const props = defineProps({
        newCategory: Object
    })

    const borderOn = () => {
        if(props.newCategory.border == '1px solid rgb(79, 85, 91)'){
            props.newCategory.border = props.newCategory.borderOff;
        }
        borderColor.value = props.newCategory.border;
    }

    const borderOff = () => {
        if(props.newCategory.clicked == 0){
            borderColor.value = '1px solid rgb(79, 85, 91)';
        }
    }

    const handleClick = () => {
        myStoreOn.categoryBtnActive(props.newCategory.name);
        saveBorder();
    }

    const saveBorder = () => {
        props.newCategory.clicked++;
        borderColor.value = '3px solid ' + props.newCategory.color;
    }

    borderOff();
</script>

<template>
    <span class="extraCategories" @mouseleave="borderOff" @click="handleClick" :style="{'color': newCategory.color , 'border': borderColor}" 
    @mouseover="borderOn">
        {{ newCategory.name }}
    </span>
</template>
