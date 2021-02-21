class Hometask {
    id
    subject
    task
    deadline
    deadlineNum

    constructor(subject, task, deadline, deadlineNum, id) {
        this.subject = subject
        this.task = task
        this.deadline = deadline
        this.deadlineNum = deadlineNum
        this.id = id
        

    }
}

let tasks = []
let taskField = document.querySelector('.tasks')
let addTaskButton = document.querySelector('.addTask')
let formTask = document.querySelector('.formTask')
let nextWeekButton = document.querySelector('.nextWeek')
let nextTwoWeekButton = document.querySelector('.nextTwoWeek')
let deadlineInput = document.querySelector('.date input')
let subjectInput = document.querySelector('.formTask select')
let taskInput = document.querySelector('.formTask textarea')
let submit = document.querySelector('.submit')

let days = {
    0: 'Вс',
    1: 'Пн',
    2: 'Вт',
    3: 'Ср',
    4: 'Чт',
    5: 'Пт',
    6: 'Сб',
}


function updateTasks() {
    for (let key in localStorage) {
        if (key > 0) {
            tasks.push(JSON.parse(localStorage[key]))

        }
        // console.log(key > 2);
    }
    taskField.innerHTML = ''
    tasks.forEach(item => addTaskToBoard(item))
}

function addTaskToBoard(obj) {
    let task = document.createElement('div')
    task.classList.add('task')

    let top = document.createElement('div')
    top.classList.add('top')

    let dl = document.createElement('div')
    dl.classList.add('deadline')
    if (+obj.deadlineNum - +new Date() < 0) {
        dl.classList.add('past')
    
    } else if (+obj.deadlineNum - +new Date() < 172800000) {
        dl.classList.add('asap')

    } else {
        dl.classList.add('regular')

    }
    dl.textContent = `${obj.deadline}, ${days[new Date(+obj.deadlineNum).getDay()]}`
    top.appendChild(dl)

    let del = document.createElement('div')
    del.classList.add('delete')
    del.setAttribute("data-id", obj.id)
    del.addEventListener('click', () => {
        // console.log(task);
        taskField.removeChild(task)
        tasks.forEach(item => {
            if (item.id == del.getAttribute('data-id')) {
                tasks.splice(tasks.indexOf(item), 1)
                localStorage.removeItem(item.id)
            }
        })
        
        
    })
    top.appendChild(del)

    task.appendChild(top)

    let subj = document.createElement('div')
    subj.classList.add('subject')
    subj.textContent = obj.subject
    task.appendChild(subj)

    let desc = document.createElement('div')
    desc.classList.add('descr')
    desc.textContent = obj.task
    task.appendChild(desc)
    
    taskField.appendChild(task)
}

function optimizeDate(date) {
    return `${makeDouble(date.getDate())}.${makeDouble(date.getMonth() + 1)}.${makeDouble(date.getFullYear())}`
}

function makeDouble(num) {
    if (num < 10) return `0${num}`
    else return num
}

addTaskButton.addEventListener('click', () => {
    formTask.classList.toggle('invisible')
    addTaskButton.classList.toggle('rotated')
})

nextWeekButton.addEventListener('click', () => {
    deadlineInput.valueAsDate = new Date(+new Date() + +new Date(1970, 0, 8, 3))
})

nextTwoWeekButton.addEventListener('click', () => {
    deadlineInput.valueAsDate = new Date(+new Date() + +new Date(1970, 0, 15, 3))
})

submit.addEventListener('click', () => {
    if (deadlineInput.valueAsDate != null && taskInput.value !== ""){
        let tempId = (new Date().getTime()).toString()
        let tempObj = new Hometask(subjectInput.value, taskInput.value, optimizeDate(deadlineInput.valueAsDate), deadlineInput.valueAsDate.getTime().toString(), tempId)
        addTaskToBoard(tempObj)
        tasks.push(tempObj)
        localStorage.setItem(tempId, JSON.stringify(tempObj))

        formTask.classList.toggle('invisible')
        taskInput.value = ''
        deadlineInput.value = ''



    }
})


updateTasks()

