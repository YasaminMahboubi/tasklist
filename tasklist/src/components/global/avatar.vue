<script setup>
    import { ref } from 'vue';
    import { myStore } from '@/stores/myStore';
    const myStoreOn = myStore();

    const photos = ref([1,2,3,4,5,6]);

    const avatar = (whichAvatar) => {
      myStoreOn.userData[0].profile = '/images/avatars/'+photos.value[whichAvatar-1]+'.png';
      myStoreOn.changeAvatarProcess = false;

      let userLocalStorage = JSON.parse(localStorage.getItem('userData'));
      userLocalStorage.profile = '/images/avatars/'+photos.value[whichAvatar-1]+'.png';
      localStorage.setItem('userData',JSON.stringify(userLocalStorage));

      if(myStoreOn.showChoosingAvatar){
        myStoreOn.registerMain = true;
        myStoreOn.tasksMain = false;
        myStoreOn.showChoosingAvatar = false;

        let allUsers = JSON.parse(localStorage.getItem('allUsers'));
        let checkUser = allUsers.find(user => user.username == myStoreOn.userData[0].username);
        let index = allUsers.indexOf(checkUser);

        checkUser.profile = '/images/avatars/'+photos.value[whichAvatar-1]+'.png';
        allUsers[index] = checkUser;
        localStorage.setItem('allUsers', JSON.stringify(allUsers));

        myStoreOn.buildPage();
      }
  }
</script>

<template>
  <div id="choosingAvatarP" :class="{'hiddenElement': !myStoreOn.showChoosingAvatar}">
      <p >choose your Avatar: </p>
  </div>
  <div id="avatars" :class="{'hiddenElement' : !myStoreOn.changeAvatarProcess , 'displayCompleteAvatar': myStoreOn.showChoosingAvatar}">
        <img v-for="photo in photos" :src="'/images/avatars/' + photo + '.png'" alt="" @click="avatar(photo)">
    </div>
</template>

<style>
     #avatars{
        position: absolute;
        top: 15%;
        left: 15%;
        width: 500px;
        height: 250px;
        background-color:#363a3e;
        opacity: 1 !important;
        z-index: 10000;
        display: grid;
        gap: .5rem;
        border-radius: .5rem;
        padding: .5rem;
        grid-template-columns: repeat(3,1fr);
        opacity: 1;
    }
  #avatars > img{
    width: 80%;
    height: 90%;
    border: 1px solid #363a3e;
    border-radius: 50%;
    padding: .5rem;
  }
  #avatars > img:hover{
    border: 1px solid #fff;
  }
  .displayCompleteAvatar{
    top: 30% !important;
    left: 25% !important;
    width: 50% !important;
    height: 50% !important;
  }
  #choosingAvatarP{
    position: absolute;
    top: 22%;
    left: 25%;
    color: #fff;
    font-size: 2rem;
  }

  @media screen and (min-width: 791px) and (max-width: 1121px){
    #avatars{
      left: 10%;
      top: 12%;
    }
  }
  @media screen and (max-width:699px) {
    #avatars{
      grid-template-columns: repeat(2,1fr);
    }
  }
</style>