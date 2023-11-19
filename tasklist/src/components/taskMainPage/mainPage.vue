<script setup>
    import { myStore} from '@/stores/myStore';
    const myStoreOn = myStore();
    
    import {ref } from 'vue';

    import laptop from './laptop.vue'
    import tablet from './tablet.vue';
    import phone from './phone.vue';

  window.addEventListener('load' , myStoreOn.buildPage);
  
  const display = ref(myStoreOn.currentWidth());
  window.addEventListener("resize", () => {
    display.value = myStoreOn.currentWidth();
  });

</script>

<template>
    <section id="appSection" :class="{'focusSessionOnStyle': myStoreOn.focusSessionOn , 'hiddenSection': registerPage ,}" v-if="display == 'laptop' && !myStoreOn.tasksMain">
      <laptop></laptop>
    </section>

    <section id="phoneAppSection" v-if="display == 'phone' && !myStoreOn.tasksMain">
      <phone></phone>
    </section>

    <section id="tabletSection" v-if="display == 'tablet'  && !myStoreOn.tasksMain">
        <tablet></tablet>
    </section>
</template>


