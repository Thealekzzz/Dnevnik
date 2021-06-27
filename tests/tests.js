function $(str, all = false) {
    if (all) return document.querySelectorAll(str)
    else return document.querySelector(str)
}

function createElem(type = 'div', classes = [], attributes = {}, onclick = "") {

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

subjectsList = $(".subjectsList")
addItemToListButton = $(".addElemToList")

addItemToListButton.addEventListener('click', () => {
    elem = createElem(classes=["listElement"])

    deleteButton = createElem(
    type="button", 
    classes=["deleteButton"], 
    onclick=() => {
        subjectsList.removeChild(elem)
    })

    content = createElem()
    content.content = "Сопромат"

    elem.appendChild(deleteButton)
    elem.appendChild(content)

    subjectsList.insertBefore(elem, addItemToListButton)

})