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

let editTaskField = document.querySelector('.editTaskField')

// ТУТ НАДО СДЕЛАТЬ ПОЛЕ ДЛЯ РЕДАКТИРОВАНИЯ СУЩЕСТВУЮЩИХ ЗАДАНИЙ

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

function createElem(type = 'div', classes = [], attributes = {}) {

    // Создаёт объект и добавляет классы и атрибуты

    let tempElem = document.createElement(type)

    classes.forEach(classItem => {
        tempElem.classList.add(classItem)
    })

    for (let key in attributes) {
        tempElem.setAttribute(`${key}`, attributes[key])
    }

    return tempElem
}

function addTaskToBoard(obj) {
    let task = createElem('div', ['task'], {'data-id':obj.id})

    let top = createElem('div', ['top'])

    let dl = createElem('div', ['deadline'])

    if (+obj.deadlineNum - +new Date() < 0) {
        dl.classList.add('past')

    } else if (+obj.deadlineNum - +new Date() < 172800000) {
        dl.classList.add('asap')

    } else {
        dl.classList.add('regular')
        
    }
    dl.textContent = `${obj.deadline}, ${days[new Date(+obj.deadlineNum).getDay()]}`
    top.appendChild(dl)

    let topRight = createElem('div', ['topRight'])

    let edit = createElem('div', ['editButton'])
    edit.addEventListener('click', () => {
        console.log('wruighj');
        if (edit.classList.contains('confirmButton')) {
            task.removeChild(document.querySelector('.editTaskField'))
        } else {
            console.log(task.style.width);
            task.style.position = 'relative'
    
            let editTaskField = createElem('div', ['editTaskField'], {'data-id':obj.id})
            editTaskField.style.position = 'absolute'
    
            let editDate = createElem('div', ['editDate'])
    
            let editDateInput = createElem('input')
            editDateInput.type = 'date'
            editDateInput.value = obj.deadlineNum
            editDate.appendChild(editDateInput)
    
            let editNextWeek = createElem('div', ['editNextWeek'])
            editNextWeek.textContent = 'Через неделю'
            editNextWeek.addEventListener('click', () => {
                editDateInput.valueAsDate = new Date(+new Date() + +new Date(1970, 0, 8, 3))
            })
            editDate.appendChild(editNextWeek)
    
            let editNextTwoWeek = createElem('div', ['editNextTwoWeek'])
            editNextTwoWeek.textContent = 'Через 2 недели'
            editNextTwoWeek.addEventListener('click', () => {
                editDateInput.valueAsDate = new Date(+new Date() + +new Date(1970, 0, 15, 3))
            })
            editDate.appendChild(editNextTwoWeek)
    
            editTaskField.appendChild(editDate)
    
            let editTextarea = createElem('Textarea', [], {'type':'text', 'rows':3, 'placeholder':'Задание'})
            editTextarea.style.width = '100%'
            editTextarea.value = obj.task
            editTaskField.appendChild(editTextarea)
    
            let editSubmit = createElem('div', ['editSubmit'])
            editSubmit.textContent = 'Изменить'
            editSubmit.addEventListener('click', () => {
                obj.task = editTextarea.value
                obj.deadline = optimizeDate(editDateInput.valueAsDate)
                obj.deadlineNum = editDateInput.valueAsDate.getTime().toString()
    
                localStorage.setItem(obj.id, JSON.stringify(obj))
    
                desc.textContent = obj.task
                dl.textContent = `${obj.deadline}, ${days[new Date(+obj.deadlineNum).getDay()]}`
                dl.classList.remove('past', 'asap', 'regular')
                if (+obj.deadlineNum - +new Date() < 0) {
                    dl.classList.add('past')
            
                } else if (+obj.deadlineNum - +new Date() < 172800000) {
                    dl.classList.add('asap')
            
                } else {
                    dl.classList.add('regular')
                    
                }
    
                task.removeChild(editTaskField)
            
                edit.classList.toggle('confirmButton')
    
            })
            editTaskField.appendChild(editSubmit)
    
            task.appendChild(editTaskField)

        }
            
        edit.classList.toggle('confirmButton')
    })

    topRight.appendChild(edit)

    
    let del = createElem('div', ['delete'])

    del.addEventListener('click', () => {
        // console.log(task);
        taskField.removeChild(task)
        tasks.forEach(item => {
            if (item.id == task.getAttribute('data-id')) {
                tasks.splice(tasks.indexOf(item), 1)
                localStorage.removeItem(item.id)
            }
        }) 
    })

    topRight.appendChild(del)

    top.appendChild(topRight)

    task.appendChild(top)

    let subj = createElem('div', ['subject'])
    subj.textContent = obj.subject
    task.appendChild(subj)

    let desc = createElem('div', ['descr'])
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

function reSetItem(id, obj) {
    localStorage.setItem(id, obj)
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
    if (deadlineInput.valueAsDate != null && taskInput.value !== "") {
        let tempId = (new Date().getTime()).toString()
        let tempObj = new Hometask(subjectInput.value, taskInput.value, optimizeDate(deadlineInput.valueAsDate), deadlineInput.valueAsDate.getTime().toString(), tempId)
        addTaskToBoard(tempObj)
        tasks.push(tempObj)
        localStorage.setItem(tempId, JSON.stringify(tempObj))

        formTask.classList.toggle('invisible')
        addTaskButton.classList.remove('rotated')
        taskInput.value = ''
        deadlineInput.value = ''

    }
})


updateTasks()