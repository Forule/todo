import type { ChangeEvent } from "react";

interface AddTodoFromProbs{
  onAdd: () => void;
  value: string;
  onChange: (event: ChangeEvent <HTMLInputElement>) => void;
}

export function AddTodoForm(probs: AddTodoFromProbs){

return <div><div className="flex gap-4 items-center">
        <input className="px-2 py-1 border border-gray-300 focus:outline-sky-500" type="text" name="todoInput" value={probs.value} onChange={probs.onChange} id="" placeholder="New entry" 
        onKeyDown={
            (e) => {
              if (e.key === "Enter"){
              probs.onAdd()
              }
            }
        }/>
        <button className="px-2 py-1 bg-sky-500 text-white hover:bg-sky-600 rounded-lg" onClick={probs.onAdd}>Add</button>
      </div></div>

}