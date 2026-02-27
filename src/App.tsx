import type { Todo } from "./types/todo"
import { useState, type ChangeEvent, type JSX } from "react";
import "./App.css"
import { AddTodoForm } from "./AddTodoForm";
import { TodoList } from "./TodoList";

function App(): JSX.Element {

  const [inputValue, setInputValue] = useState<string>(
    ""
  )

  function onInputChange(event: ChangeEvent<HTMLInputElement>){
    setInputValue(event.target.value)
  }

  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [doneList, setDoneList] = useState<Todo[]>([]);

  function moveToDone(id: string){

    let foundItem = todoList.find(item => {
      return (item.id == id)
    })
    if(foundItem){
      setDoneList([...doneList, foundItem])
      onDeleteTodo(id)
    }
  }

  function onAdd(): void{

    let newID: string = String(todoList.length)
    

    const newItem: Todo = {
      id: newID,
      title: inputValue,
      completed: true
    }
    setInputValue("")
    setTodoList ([...todoList, newItem])

  }
  function onDeleteTodo(id: string){

    let newList: Todo [] = todoList.filter(item => {
      return (item.id != id)
    })
    setTodoList(newList)
  }

function onDeleteDone(id: string){

    let newList: Todo [] = doneList.filter(item => {
      return (item.id != id)
    })
    setDoneList(newList)
  }


  return (
    <div>
      <AddTodoForm value = {inputValue} onAdd={onAdd} onChange={onInputChange}></AddTodoForm>
      <h1>TodoListe</h1>
      <TodoList onDelete={onDeleteTodo} todoList={todoList} moveToDone={moveToDone}></TodoList>
      <h1>DoneListe</h1>
      <TodoList onDelete={onDeleteDone} todoList={doneList} moveToDone={moveToDone}></TodoList>
    </div>
  )
}

export default App
