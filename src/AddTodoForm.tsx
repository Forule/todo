import type { ChangeEvent } from "react";

interface AddTodoFromProbs{
  onAdd: () => void;
  value: string;
  onChange: (event: ChangeEvent <HTMLInputElement>) => void;
}

export function AddTodoForm(probs: AddTodoFromProbs){

return <div><div>
        <input type="text" name="todoInput" value={probs.value} onChange={probs.onChange} id="" placeholder="New entry"/>
        <button onClick={probs.onAdd}>Add</button>
      </div></div>

}