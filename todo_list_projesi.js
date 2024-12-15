const form=document.querySelector('#todoAddForm')
const addInput=document.querySelector('#todoName')
const todoList=document.querySelector('.list-group')
const cardBody1=document.querySelectorAll('.card-body')[0]
const cardBody2=document.querySelectorAll('.card-body')[1]
const clearButton=document.querySelector('#clearButton')
const filterInput=document.querySelector('#todoSearch')

let todos=[]//global de tanımladık
eventCalistir()

function eventCalistir() {
    form.addEventListener('submit',addTodo)
    document.addEventListener('DOMContentLoaded',pageLoaded)
    cardBody2.addEventListener('click',removeTodoUI)
    clearButton.addEventListener('click',allTodosEveryWhere)
    filterInput.addEventListener('keyup',filter)
}



function allTodosEveryWhere() {
    const todoListesi=document.querySelectorAll('.list-group-item')
    if (todoListesi.length>0) {
        //ekrandan silme
        todoListesi.forEach(todo => {
            todo.remove()
        });
        //storage dan silme
         todos=[]
         localStorage.setItem('todos',JSON.stringify(todos))
         showAlert('success','başarılı bir şekilde silindi') 
    } else {
        showAlert('warning','silmek için en az bir todo olmalı')
    }
}

function removeTodoUI(e) {
    if (e.target.className=='fa fa-remove') {
        //Ekrandan sildik
        const todo=e.target.parentElement.parentElement
        todo.remove()

        //storage dan silme
         removeTodoToStorage(todo.textContent)
        showAlert('success','todo silindi')
        e.preventDefault()
       }   
}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage()
    todos.forEach((todo,index) => {
        if (removeTodo == todo) {
            todos.splice(index,1)
        }
        localStorage.setItem('todos',JSON.stringify(todos))
    });
}

function pageLoaded() {
     checkTodosFromStorage()
     todos.forEach(todo => {
        addTodoToUI(todo)
     });
}

function filter(e) {
    const filterValue=e.target.value.toLowerCase().trim()
    const todoListesi=document.querySelectorAll ('.list-group-item')
    if (todoListesi.length>0) {
        todoListesi.forEach(function(todo)  {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute('style','diplat:block')
            } else {
                todo.setAttribute('style','display:none !important')
            }
        });
    } else {
        showAlert('warning','filtreleme yapmak istiyorsanız lütfen bir todo girin!')
    }
}

function addTodo(e) {
    const textInput=addInput.value.trim()
    if (textInput == null || textInput =='') {
       showAlert('warning','lütfen boş bırakmayınız')
    } else {
        addTodoToUI(textInput)//arayüze ekleme
        addTodoToStorage(textInput)//storage'a ekleme
        showAlert('success','todo eklendi.')
    }
    e.preventDefault()
}

function addTodoToUI(newTodo) {
    //arayüze bu şekilde ekliyoruz
    //ve ayrıca burda element oluşturuyorum
    const li=document.createElement('li')
    li.className='list-group-item d-flex justify-content-between'
    li.textContent=newTodo

    const a=document.createElement('a')
    a.href='#'
    a.className='delete-item'

    const i=document.createElement('i')
    i.className='fa fa-remove'

    //burda matruşka gibi iç içe koyarak ilerliyoruz
    a.appendChild(i)//i a nın içinde
    li.appendChild(a)//a li nin içinde
    todoList.appendChild(li)//li de todoList in içinde
    addInput.value=''
}

function addTodoToStorage(newTodo) {//burda ki newTodo paremetresi yeni yapilacak işleri temsil eder her yeni bir sey yapınca ör:gitar çalmak o newTodo gitar çalmak olur.
    checkTodosFromStorage()
    todos.push( newTodo)//bu push ile de gitar çalmayı todos a ekliyoruz
    localStorage.setItem('todos',JSON.stringify(todos))
}

function checkTodosFromStorage() {
   if (localStorage.getItem('todos')== null) {
    todos=[]
   } else {
    todos=JSON.parse(localStorage.getItem('todos'))
   } 
}

function showAlert(type,message) {
    const div=document.createElement('div')
    // div.className='alert alert-'+type
    div.className=`alert alert-${type}`//literal template
    div.textContent=message

    cardBody1.appendChild(div)

    setTimeout(() => {
        div.remove()
    },2500);
}