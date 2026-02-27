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
  function onDelete(id: string){

    let newList: Todo [] = todoList.filter(item => {
      return (item.id != id)
    })
    setTodoList(newList)
  }

  return (
    <div>
      <AddTodoForm value = {inputValue} onAdd={onAdd} onChange={onInputChange}></AddTodoForm>
      <TodoList onDelete={onDelete} todoList={todoList}></TodoList>
    </div>
  )
}

export default App
