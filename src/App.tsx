import type { Todo } from "./types/todo"
import { useState, type ChangeEvent, type JSX } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { TodoList } from "./TodoList";
import { addTodo, deleteDone, deleteTodo, getDones, getTodos, moveToDone, moveToTodo } from "./todoService";

function App(): JSX.Element {

  const [inputValue, setInputValue] = useState<string>(
    ""
  )

  function onInputChange(event: ChangeEvent<HTMLInputElement>){
    setInputValue(event.target.value)
  }

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [doneList, setDoneList] = useState<Todo[]>([]);

  function onMoveToDone(id: string){
    
    moveToDone(id)
    let newTodoList: Todo [] = getTodos()
    setTodoList(newTodoList)
    let newDoneList: Todo [] = getDones()
    setDoneList(newDoneList)


  }

  function onMoveToTodo(id: string){

    moveToTodo(id)
    let newTodoList: Todo [] = getTodos()
    setTodoList(newTodoList)
    let newDoneList: Todo [] = getDones()
    setDoneList(newDoneList)

  }


  function onAdd(): void{

    let newID: string = String(todoList.length)
    

    const newItem: Todo = {
      id: newID,
      title: inputValue,
      completed: false,
    }
    setInputValue("")
    addTodo(newItem)

    let newTodoList: Todo [] = getTodos()
    setTodoList(newTodoList)
    

  }
  function onDeleteTodo(id: string){
    
    deleteTodo(id)
    let newList: Todo [] = getTodos()
    setTodoList(newList)
  
  }

function onDeleteDone(id: string){

    deleteDone(id)  
    let newDoneList: Todo [] = getDones()
    setDoneList(newDoneList)

  }


  return (
    <div className="flex flex-col gap-5 p-4">
      <AddTodoForm value = {inputValue} onAdd={onAdd} onChange={onInputChange}></AddTodoForm>
      <h1 className="text-lg font-bold">TodoListe</h1>
      <TodoList onDelete={onDeleteTodo} todoList={todoList} onClick={onMoveToDone}></TodoList>
      <h1 className="text-lg font-bold">DoneListe</h1>
      <TodoList onDelete={onDeleteDone} todoList={doneList} onClick={onMoveToTodo}></TodoList>
    </div>
  )
}

export default App
