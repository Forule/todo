import type { Todo } from "./types/todo";

interface TodoListProbs{

    onDelete: (id: string ) => void;
    todoList: Todo [];
    onClick: (id: string) => void;

}

export function TodoList(probs: TodoListProbs){

    return(<div>
        <div className="todo-container"> 
        {probs.todoList.map(item => {
          return(<div className="todo-item">
            <div className="todo-id">{Number(item.id)+1}</div>
            <div className="todo-title">{item.title}</div>
            {/*<div>{item.completed}</div>*/}
            <button onClick={()=>probs.onDelete(item.id)}>Delete</button>
            <div className="todo-title">Finished</div>
            <input type="checkbox" name="completedBox" onClick={()=>probs.onClick(item.id)}/>
            </div>)
            
        })}
        </div>
      </div>)

}

