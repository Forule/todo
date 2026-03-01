import type { Todo } from "./types/todo"

let todoList: Todo [] = []
let doneList: Todo [] = []

export function addTodo(item: Todo){

    item.id = String (todoList.length)
    todoList.push(item)


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

}

export function deleteDone(idDone: string){

    let newDoneList = doneList.filter(item => {
        return (idDone != item.id)
    })

    doneList = newDoneList

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


}