import type { Todo } from "./types/todo";

interface TodoListProbs{

    onDelete: (id: string ) => void;
    todoList: Todo [];
    onClick: (id: string) => void;

}

export function TodoList(probs: TodoListProbs){

    return(<div>
        <div className="flex flex-col gap-3"> 
        {probs.todoList.map(item => {
          return(<div className="flex gap-2 p-2 bg-gray-100 w-fit items-center">
            <div className="">{item.title}</div>
            {/*<div>{item.completed}</div>*/}
            <button className = "px-2 py-1 bg-sky-500 text-white hover:bg-sky-600 rounded-md" onClick={()=>probs.onDelete(item.id)}>Delete</button>
            <div className="">completed</div>
            <input checked = {item.completed} type="checkbox" name="completedBox" onChange={()=>probs.onClick(item.id)}/>
            </div>)
            
        })}
        </div>
      </div>)

}

