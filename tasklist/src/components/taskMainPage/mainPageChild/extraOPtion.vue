<script setup>
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    import pomodoro from './extraOptionChildComponents/pomodoro.vue';
    import process from './extraOptionChildComponents/process.vue';

</script>
<template>
    <section id="extraOption" class="base" :class="{'focusSessionOnStylePomodoro': myStoreOn.focusSessionOn}">
        <main>
            <pomodoro></pomodoro>
            <process></process>
        </main>
    </section>
</template>
<style>
    main{
        gap: 1rem;
    }
    main > div{
        width: 100%;
        height: 100%;
        background-color: #1A1C1E;
        border-radius: .5rem;
    }
</style>