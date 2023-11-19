import { defineStore } from "pinia";
export const myStore = defineStore('displays' ,  {
    state: () => {
        return {
             /* -------------------- app ------------------------- */
             registerMain: false,
             tasksMain: true,
             usersId: 1,
             /* ------------------- tasks ------------------------ */
            focusSessionOn: false, 
            userSettingDisplay: false,
            displayDisplay: false,
            formDisplay: true,
            extraOptionDisplay: false,
            changeAvatarProcess: false,
            labelOfDisplayedTasks: 'All',
            taskHistory: [ ],
            userData: [{username: '', profile: '',userTaskId: 1}],
            showCategorySmall: false,
            editTaskOn: false,
            taskToEdit: {},
            editmodeOn: false,

            taskId: 1,
            taskToEditId: 0,
            taskToDeleteId: 0,
            percent: 0,

            costumeCategory: [],
            costumeCategoryButtons: [],
            
            todayDate: '',
            startIndex: 0,

            todayAllTaskProgress: 0,

            /* -------- form ----------------- */
            title: '',
            category: '',
            importance: 'low',

            highButton: false,
            mediumButton: false,
            lowButton: false,

            workButton: false,
            shopButton: false,
            studyButton: false,

            addTaskStatus: true,
            editTaskStatus: true,
            notShowStatusDiv: true,
            
            /* --------------- local storage -------------------- */
            localStorageData: JSON.parse(localStorage.getItem('userTasks')) ? JSON.parse(localStorage.getItem('userTasks')) : '',
            complete: 0,

            /* ----------------- registeration ------------------- */
            displayLoginNone: true,
            displaySignup: false,
            avatarRegister: false,
            showChoosingAvatar: false,

            /* ---------------- progress --------------------------- */
            todayTitle: '',
            yesterDayTitle: '',

            todayDate: '',
            yesterDayDate: '',
            /* -------------- phone --------------------------------- */
            addCaregoryFilterBtn: true,
            showDropDown: false,
            phoneTasksSection: false,

            displayLaptop: false,
           /* -------------- laptop --------------------------------- */
           mainTablet: false,

        }
    },
    actions: {
        /* ------------------- display -------------------------- */
        changeFocusSession(arg){
            if(arg == 'on'){
                this.focusSessionOn = true;
                this.userSettingDisplay =  true;
                this.displayDisplay= true;
                this.extraOptionDisplay= false;
            }else{
                this.focusSessionOn = false;
                this.userSettingDisplay =  false;
                this.displayDisplay= false;
                this.extraOptionDisplay= false;
            }
        },
        showForm(whichForm , ifTask ){
            this.formDisplay= false;

            this.displayDisplay= true;
            this.phoneTasksSection = true;
            this.mainTablet = true;

            this.editTaskOn = whichForm == 'edit' ? true : false ;
            if(ifTask !== null){
                this.title = ifTask.title;
                this.importanceBtnActive(ifTask.importance);
                if(ifTask.category){
                    this.categoryBtnActive(ifTask.category);
                }
                this.taskToEditId = ifTask.id;
            }
        },
        hideForm(){
            this.formDisplay= true;
            this.displayDisplay= false;
            this.phoneTasksSection = false;
            this.mainTablet = false;

        },
        changeAvatar(){
            this.changeAvatarProcess = true;
        },

        /* ------------------- form -------------------------- */
        unActivateBtnCostume(array){
            array.forEach(category => {
                category.clicked = 0;
                category.borderOff = category.border;
                category.border = '1px solid #1a1c1e';
            })
        },

        importanceBtnActive(button){
            this.importance = button == 'high' ? 'high' : button == 'medium' ? 'medium' : 'low';
            this.highButton = button == 'high';
            this.mediumButton = button == 'medium';
            this.lowButton = button == 'low';
        },
        categoryBtnActive (button) {
            this.category = button == 'work' ? 'work' : button == 'shopping' ? 'shopping' : button == 'studying' ? 'studying' : button;

            this.workButton = button == 'work';
            this.shopButton = button == 'shopping';
            this.studyButton = button == 'studying';
            
            let notClicked = this.costumeCategory.filter(category => category.name !== button);
            this.unActivateBtnCostume(notClicked);
        },

        /* ------------------- tasks -------------------------- */
        createTask(){
            const currentDate = new Date();
            let today = currentDate.getDate() +'/'+ (1 + currentDate.getMonth())+'/'+currentDate.getFullYear();

            let newTask = {
                'username': this.userData[0].username,
                'id': this.userData[0].userTaskId,
                'title': this.title,
                'date': today,
                'checked': false,
                'importance': this.importance,
                'category': this.category,
            }

            this.userData[0].userTaskId++;
            let storageUser = JSON.parse(localStorage.getItem('userData'));
            storageUser.userTaskId += 1;
            localStorage.setItem('userData',JSON.stringify(storageUser));

            return newTask;
        },
        addNewTask() {
            let newTask = this.createTask();

            if(this.importance == 'high'){
                this.taskHistory.unshift(newTask);
            }else{
                this.taskHistory.push(newTask);
            }

            if(localStorage.getItem('userTasks')){
                let dataFromStorage = JSON.parse(localStorage.getItem('userTasks'));
                if(this.importance == 'high'){
                    dataFromStorage.unshift(newTask);
                }
                else{
                    dataFromStorage.push(newTask);
                }
                localStorage.setItem('userTasks', JSON.stringify(dataFromStorage));
                this.localStorageData = dataFromStorage;
            }
            else{
                localStorage.setItem('userTasks',JSON.stringify(this.taskHistory));
                this.localStorageData = this.taskHistory;
            }

            this.editTaskStatus = true;
            this.addTaskStatus = false;
            this.notShowStatusDiv = false;

            setTimeout(() => {
                this.addTaskStatus = true;
                this.notShowStatusDiv = true;
            }, 1000);

            this.title = '';

            this.highButton = false;
            this.mediumButton = false;
            this.lowButton = false;

            this.workButton = false;
            this.shopButton = false;
            this.studyButton = false;
        },
        editTaskCheck(){
            let newTask = this.createTask(); 

            let findTask = this.taskHistory.find(task => task.id == this.taskToEditId);
            let index = this.taskHistory.indexOf(findTask)
            this.taskHistory[index] = newTask;

            this.localStorageData.splice(index,1);
            this.localStorageData[index] = newTask;
            localStorage.setItem('userTasks',JSON.stringify(this.localStorageData));

            this.addTaskStatus = true;
            this.editTaskStatus = false;
            this.notShowStatusDiv = false;
            setTimeout(() => {
                this.editTaskStatus = true;
                this.notShowStatusDiv = true;
                this.displayDisplay= false;
                this.phoneTasksSection = false;
                this.mainTablet = false;
                this.formDisplay= true;

            }, 1000);
        },
        deleteTask(id){
            let findTask = this.taskHistory.find(task => task.id == id);
            let index = this.taskHistory.indexOf(findTask);
            this.taskHistory.splice(index,1);

            this.localStorageData.splice(index,1);
            localStorage.setItem('userTasks',JSON.stringify(this.localStorageData));
        },
        filterTask(filter, filterBy){
            this.showDropDown = false;
            this.labelOfDisplayedTasks = filter;
            if(filterBy == 'category'){
                let filterTasks = this.localStorageData.filter(task => task.username == this.userData[0].username && task.category == filter);
                this.taskHistory = filterTasks;
            }
            if(filterBy == 'importance'){
                let filterTasks = this.localStorageData.filter(task => task.username == this.userData[0].username && task.importance == 'high');
                this.taskHistory = filterTasks;
                this.labelOfDisplayedTasks = filterBy + ' ' + filter;
            }
            if(filterBy == 'completed'){
                let filterTasks = this.localStorageData.filter(task => task.username == this.userData[0].username && task.checked);
                this.taskHistory = filterTasks;
            }
            if(filterBy == 'All'){
                this.taskHistory = this.localStorageData.filter(task => task.username == this.userData[0].username);
            }
        },
        checkTheTask(task){
            let index = this.taskHistory.indexOf(task);
            this.taskHistory[index].checked = this.taskHistory[index].checked ? false : true;

            let newData = this.localStorageData.splice(index,1);
            newData[0].checked = this.taskHistory[index].checked;
            this.localStorageData.splice(index,0,newData[0]);
            localStorage.setItem('userTasks', JSON.stringify(this.localStorageData));
        },
        filterTaskHistoryDisplay(selectedDate){
            if(this.localStorageData.length !== 0){
                let foundTasks = this.localStorageData.filter(task => task.username == this.userData[0].username && task.date == selectedDate);
                this.taskHistory = foundTasks;
            }
            return this.taskHistory;
        },
        completedTasks(date , yesterday){
            this.todayTitle = date;
            this.yesterDayTitle = yesterday;
            return this.localStorageData.length !== 0 ? this.localStorageData.filter(task => task.username == this.userData[0].username &&  task.date == date && task.checked).length : 0;
        },
        calcPercent(date){
            if(this.localStorageData.length !== 0){
                let tasks = this.localStorageData.filter(task => task.username == this.userData[0].username && task.date == date);
                if(tasks.length == 0){
                    return 0;
                }else{
                    let length = this.localStorageData.filter(task => task.username == this.userData[0].username && task.date == date).length;
                    return Math.round(this.completedTasks(date) * 100 / length);
                }
            }
            else{
                return 0;
            }
        },
        allTasks(date){
            return this.localStorageData.length !== 0 ? this.localStorageData.filter(task => task.username == this.userData[0].username &&  task.date == date).length : 0;
        },
        otherPage(page , number){
            this.startIndex = ( page * number) - number;
        },

        buildPage(){
            if(localStorage.getItem('userData')){
                let userDataFromStorage = JSON.parse(localStorage.getItem('userData')); 
                let categoryStorage = JSON.parse(localStorage.getItem('costumeCategory'));
      
                this.userData[0].username = userDataFromStorage.username;
                this.userData[0].profile = userDataFromStorage.profile;
                this.userData[0].userTaskId = userDataFromStorage.userTaskId;
      
                if(categoryStorage.costumeCategory.length !== 0){
                  categoryStorage.costumeCategory.forEach(category => {
                      this.costumeCategory.push(category);
                  })
                }
               
             }
             if(localStorage.getItem('userTasks')){
              let tasksFromStorage = JSON.parse(localStorage.getItem('userTasks'));
              let userTasks = tasksFromStorage.filter(task => task.username == this.userData[0].username);
              userTasks.forEach(task => {
                this.taskHistory.push(task);
              })
             }
        },

        currentWidth(){
            if(window.innerWidth <= 1121 && window.innerWidth > 790){
                this.displayLaptop = true;
                return 'tablet';
            }
            else if(window.innerWidth >= 800){
                this.displayLaptop = false;
                this.addCaregoryFilterBtn = true;

                return 'laptop';
            }
            else if(window.innerWidth <= 790){
                this.displayLaptop = true;
                this.addCaregoryFilterBtn = false;
                return 'phone';
              }
        }
    },
       
    getters: {
        importanceArray(){
            return [
                this.highButton,
                this.mediumButton,
                this.lowButton
            ]
        },
        categoryArray(){
            return [
                this.workButton,
                this.shopButton,
                this.studyButton
            ]
        }

    }

})