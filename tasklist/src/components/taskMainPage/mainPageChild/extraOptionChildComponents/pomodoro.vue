<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const min = ref(1);
    const sec = ref("00");
    const title = ref("start your focus session");
    const tomatoJump = ref(false);

    const classFinish = ref(false);

    const displayValueStart = ref(false);
    const displayValuePause = ref(true);
    const displayValueContinue = ref(true);
    const displayValueRestart = ref(true);
    const displayValueStartBreak = ref(true);

    const displayButtonsArray = [displayValueStart,displayValuePause,displayValueContinue,displayValueRestart,displayValueStartBreak];

    const intervalId = ref(null);
    const wCounter = ref(0);
    const rCounter= ref(0);
    const workArray=  ref([25 , 35 , 45]);
    const restArray = ref([5 , 10 , 15]);
    const work = ref(1);
    const rest = ref(5);

    const complete = ref(0);
    const from =  ref('')

    const setDisplay = (displayArray, targetDisplays) => {
        for (const display of displayArray) {
            display.value = !(targetDisplays.includes(display));
        }
    };

    const counter = (fromFunc) => {
                    sec.value--;  
                    if(from.value !== ''){
                        from.value = fromFunc;  
                    }
                    if(fromFunc == ''){
                        fromFunc = from.value;
                    }            
                    if(sec.value == 0){
                        sec.value = 59;
                        min.value--;
                        if(fromFunc == 'work'){
                            complete.value++;
                            localStorage.setItem('complete', complete.value);
                        } 
                    }
                    if(min.value == 0 &&  sec.value == 1){
                        clearInterval(intervalId.value);
                        sec.value = '00';
                         min.value  = fromFunc == 'break' ?  work.value : '00';
                        classFinish.value = true;
                        if(fromFunc == 'work'){
                            complete.value++;
                            localStorage.setItem('complete',  complete.value);
                            setDisplay(displayButtonsArray, [displayValueStartBreak,displayValueStart]);
                            
                            if(myStoreOn.focusSessionOn){
                                
                                tomatoJump.value = true;
                            }
                        }else{
                            setDisplay(displayButtonsArray,[displayValueStart]);
                        }
                    }
    }

    const startCounting = () => {
        tomatoJump.value = false;
        title.value = "focus session on ...";
        setDisplay(displayButtonsArray,[displayValuePause]);
        classFinish.value = false;
        sec.value = 59;
        min.value =  work.value;
        min.value--;
        intervalId.value = setInterval(() => counter('work'), 1000);
    }

    const pauseCounting = () => {
        title.value = "keep going";
        clearInterval(intervalId.value);
        setDisplay(displayButtonsArray,[displayValueContinue,displayValueRestart]);
    } 

    const continueCounting = () => {
        title.value = "focus session on ...";
        intervalId.value  = setInterval(() => counter(''), 1000);
        setDisplay(displayButtonsArray,[displayValuePause]);
    }

    const restartCounting = () => {
        tomatoJump.value = false;
        title.value = "start your focus session";
        sec.value = '00';
        min.value  = work.value;
        setDisplay(displayButtonsArray,[displayValueStart]);
        classFinish.value = false;
    }

    const startBreak = () => {
        tomatoJump.value = false;
        title.value = "you did it!"
        setTimeout(() => {
                        min.value = rest.value;
                        sec.value = 59;
                        min.value--;
                    }, 500);
                    intervalId.value = setInterval(() => counter('break'), 1000);

                    setDisplay(displayButtonsArray,[displayValueStart,displayValuePause]);
    }
</script>

<template>
     <div id="pomodoro">
                <div id="title">
                        <h3>{{ title }}</h3>
                        <img src="/images/pomodoro/finishTomato.png" :class="{'happyTomatoActive': tomatoJump}">
                </div>
                <div id="counter">
                    <i class="fa-solid fa-up-right-and-down-left-from-center changeWindow" id="makeWindowBigger" @click="() => myStoreOn.changeFocusSession('on')" :class="{'hiddenElement' : myStoreOn.displayLaptop}"></i>
                    <i class="fa-solid fa-down-left-and-up-right-to-center changeWindow" id="closeFocusSession" @click="() => myStoreOn.changeFocusSession('off')"></i>
                    <div> 
                        <P>{{ min }}</P>
                        <p>:</p>
                        <p>{{ sec }}</p>
                    </div>
                </div>
                <div id="buttons">
                    <button @click="startCounting"    :class="{'hiddenElement': displayValueStart}">start</button>
                    <button @click="pauseCounting"    :class="{'hiddenElement': displayValuePause}">pause</button>
                    <button @click="continueCounting" :class="{'hiddenElement': displayValueContinue}">Continue</button>
                    <button @click="restartCounting"  :class="{'hiddenElement': displayValueRestart}">Restart</button>
                    <button @click="startBreak"       :class="{'hiddenElement': displayValueStartBreak}">Start break</button>
                </div>
                <p>{{complete}} min completed</p>
            </div>
</template>

<style>
  #pomodoro{
        display: flex;
        flex-direction: column;
    }
    #pomodoro > i {
        margin: 1rem;
        color: #888;
    }
    #pomodoro > div {
        width: 100%;
        height: 30%;
    }
    #title {
        color: #fff;
        display: flex;
        padding: .5rem;
        flex-direction: column;
        align-items: center;
    }
    #title > img{
        width: 60px;
        height: 60px;
    }
    #counter{
        display: flex;
        flex-direction: column;
        color: antiquewhite;
    }
    .changeWindow{
        font-size: .9rem;
        color: #888;
        padding-left: .4rem;
    }
    .changeWindow:hover{
        color: #eb9128;
    }
    #closeFocusSession{
        display: none;
    }
    #counter > div {
        font-size: 2rem;
        display: flex;
        gap: .5rem;
        align-items: center;
        justify-content: center;
        margin-bottom: .5rem;
    }
    #buttons{
        display: flex;
        gap: .5rem;
        align-items: flex-start;
        justify-content: center;
    }
    #buttons > button{
        padding: 0.4rem;
        font-size: 1.2rem;
        color: #7D7D7D;
        border: 1px solid #7D7D7D;
        border-radius: 0.5rem;
        background-color: transparent;
    }
    #buttons > button:hover{
        border-color: #eb9128;
        color: #eb9128;
    }
    #pomodoro > p{
        height: 10%;
        color: #777;
        padding-left: 1.5rem;
    }

        /* --------------------------------- focusSessionOnStyle ---------------------------------------------- */
        .focusSessionOnStylePomodoro{
        width: 90%;
        height: 90%;
        margin: 0 auto;
    }
    .focusSessionOnStylePomodoro > main > #process{
        display: none;
    }
    .focusSessionOnStylePomodoro > main > #pomodoro{
        align-items: center;
    }
    .focusSessionOnStylePomodoro > main > #pomodoro > #title {
        font-size: 2.5rem;
    }
    .focusSessionOnStylePomodoro > main > #pomodoro > #title  > img {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 70%;
        left: 70%;
    }
    .focusSessionOnStylePomodoro > main > #pomodoro >  #counter{
        width: 50%;
        height: 70%;
        display: flex;
        flex-direction: column;
        padding-top: 10%;
        font-size: 4rem;
        background-color: #34373a;
        border-radius: 2rem;
    }
    .focusSessionOnStylePomodoro > main > #pomodoro >  #counter > #makeWindowBigger{
        display: none;
    }
    .focusSessionOnStylePomodoro > main > #pomodoro >  #counter > #closeFocusSession{
        font-size: 1.5rem;
        margin-left: 2rem;
        display: block;
    }
    .focusSessionOnStylePomodoro > main > #pomodoro >  #buttons{
        position: absolute;
        top: 60%;
        gap: 3rem;
    }
    .focusSessionOnStylePomodoro > main > #pomodoro >  #buttons > button{
        width: 100px;
        height: 70px;
    }
    .happyTomatoActive{
        animation: happyTomato 1s infinite alternate;
    }
    @keyframes happyTomato {
        0%{
            top: 70%;
        }
        100%{
            top: 50%;
        }
    }

    @media screen and (max-width: 500px) {
        #pomodoro{
            width: 80%;
            background-color: #1a1c1e;
            gap: 2rem;
        }
    }
</style>