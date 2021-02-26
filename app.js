var mainList = document.getElementById('mainList')
var todoInput = document.getElementById('inp')

firebase.database().ref("todos").on("child_added",function(data){
    var text = document.createTextNode(data.val().value)
    var li = document.createElement('li')
    li.setAttribute('class', 'list')
    li.appendChild(text)
    console.log(li)
    mainList.appendChild(li)
    todoInput.value = ''

    var btnDiv = document.createElement('div')
    //=== Create Delete Button =====
    var deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('class', 'btn')
    deleteBtn.setAttribute("id", data.val().key)
    deleteBtn.setAttribute('onClick', 'deletTodo(this)')
    var deleteBtnText = 'Delete Todo'
    var deleteText = document.createTextNode(deleteBtnText)
    deleteBtn.appendChild(deleteText)
    btnDiv.appendChild(deleteBtn)

    //=== Create Edit Button =====
    var editBtn = document.createElement('button')
    editBtn.setAttribute('class', 'btn')
    editBtn.setAttribute("id", data.val().key)
    editBtn.setAttribute('onClick', 'editTodo(this)')
    var editText = document.createTextNode('Edit Todo')
    editBtn.appendChild(editText)
    btnDiv.appendChild(editBtn)

    li.appendChild(btnDiv)
})

function addTodo() {
    var inputText = todoInput.value
    var key = firebase.database().ref("todos").push().key

    var toodoo = {
        value: inputText,
        key: key
    }
    
    firebase.database().ref("todos").child(key).set(toodoo)

}

function deletTodo(e) {
    firebase.database().ref("todos").child(e.id).remove()
    e.parentNode.parentNode.remove()
}

function editTodo(e) {
    var newText = prompt('add new todo')
    var editObj = {
        value: newText,
        key: e.id
    }
    firebase.database().ref("todos").child(e.id).set(editObj)
    console.log(e.parentNode.parentNode.childNodes[0])
    var listText = e.parentNode.parentNode.firstChild
    listText.nodeValue = newText
}

function deleteAll() {
    mainList.innerHTML = ''
}

