import type { Todo } from "./types/todo"
import { useState, type ChangeEvent } from "react";
import "./App.css"

function App() {

  const [inputValue, setInputValue] = useState<string>(
    ""
  )

  function onInputChange(event: ChangeEvent<HTMLInputElement>){
    setInputValue(event.target.value)
  }

  const [todoList, setTodoList] = useState<Todo[]>([]);

  function onAdd(){

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
      <div>
        <input type="text" name="todoInput" value={inputValue} onChange={onInputChange} id="" placeholder="New entry"/>
        <button onClick={onAdd}>Add</button>
      </div>
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
