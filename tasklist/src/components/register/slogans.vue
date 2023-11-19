<script setup>
      const props = defineProps({
            lessGap: Boolean
      })
</script>

<template>
     <div class="features" :class="{'lesssGap': lessGap}">
            <div class="feature">
                <i class="fa-solid fa-list-check"></i>
                <h3>Task list</h3>
                <p>manage your daily tasks</p>
            </div>
            <div class="feature">
                <i class="fa-solid fa-clock"></i>
                <h3>Focus session</h3>
                <p>increase your concentration with the Pomodoro technique</p>
            </div>
            <div class="feature">
                <i class="fa-solid fa-trophy"></i>
                <h3>Accomplishments</h3>
                <p>keep tracking your process and your accomplishments</p>
            </div>
        </div>
</template>
<style>
     .features {
        width: 50%;
        display: flex;
        flex-direction: column;
        margin-top: 5%;
        padding: 40px;
    }
    .feature {
        padding: 0 0 0 30px;
        position: relative;
        margin: 40px 0;
    }
    .feature h3 {
        margin-left: 1rem;
        font-size: 1.5rem;
        color: #ecf2ff;
    }

    .feature p {
        color: #ecf2ff;
        font-size: .9rem;
        line-height: 1.8;
        margin-left: 1rem;
        margin-top: 5px;
    }

    .feature i {
        font-size: 1.5rem;
        color: chocolate;
        position: absolute;
        top: 5px;
        left: 0;
    }

    .lessGap{
        gap: 1rem !important;
    }
</style>
