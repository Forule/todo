import type { Todo } from "./types/todo"
import { useState, type ChangeEvent, type JSX } from "react";
import "./App.css"
import { AddTodoForm } from "./AddTodoForm";

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
      <div className="todo-container"> 
        {todoList.map(item => {
          return(<div className="todo-item">
            <div className="todo-id">{Number(item.id)+1}</div>
            <div className="todo-title">{item.title}</div>
            {/*<div>{item.completed}</div>*/}
            <button onClick={()=>onDelete(item.id)}>Delete</button>
            <div className="todo-title">Finished</div>
            <input type="checkbox" name="completedBox" onClick={()=>onDelete(item.id)}/>
            </div>)
            
        })}
      </div>
    </div>
  )
}

export default App
