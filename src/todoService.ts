import type { Todo } from "./types/todo"

let todoList: Todo [] = []
let doneList: Todo [] = []

loadState()

export function addTodo(item: Todo){

    item.id = Date.now().toString()
    todoList.push(item)

    saveState()

}

export function getTodos(){

    return todoList

}

export function getDones(){

    return doneList

}

export function deleteTodo(idTodo: string){

    let newTodoList = todoList.filter(item => {
        return (idTodo != item.id)
    })

    todoList = newTodoList

    saveState()

}

export function deleteDone(idDone: string){

    let newDoneList = doneList.filter(item => {
        return (idDone != item.id)
    })

    doneList = newDoneList

    saveState()

}

export function moveToTodo(idTodo: string){

    let foundTodo = doneList.find(item => {
    
        return (item.id == idTodo)

    })

    if(foundTodo){

        foundTodo.completed = false
        todoList = [...todoList, foundTodo]
        deleteDone(idTodo)
    }

    saveState()

}

export function moveToDone(idDone: string){
 
    let foundDone = todoList.find(item => {
    
        return (item.id == idDone)

    })

    if(foundDone){

        foundDone.completed = true
        doneList = [...doneList, foundDone]
        deleteTodo(idDone)
    }
    saveState()

}

function loadState(){

let rawTodoList: string | null = window.localStorage.getItem("todoList")

let rawDoneList: string | null = window.localStorage.getItem("doneList")

if(rawTodoList){

    let newTodoList = JSON.parse(rawTodoList)

    todoList = newTodoList

}

if(rawDoneList){

    let newDoneList = JSON.parse(rawDoneList)

    doneList = newDoneList

}




}


function saveState(){

    let todoSave = JSON.stringify(todoList)
    let doneSave = JSON.stringify(doneList)

    localStorage.setItem("todoList", todoSave)
    localStorage.setItem("doneList", doneSave)


}