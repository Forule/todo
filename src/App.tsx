import type { Todo } from "./types/todo"
import { useEffect, useState, type ChangeEvent, type JSX } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { TodoList } from "./TodoList";

// Der todoService Import ist weg!

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [doneList, setDoneList] = useState<Todo[]>([]);

  // 1. Zentrale Funktion zum Laden (Die Quelle der Wahrheit)
  const loadDataFromServer = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const data: Todo[] = await response.json();

      setTodoList(data.filter(t => !t.completed));
      setDoneList(data.filter(t => t.completed));
    } catch (error) {
      console.error("Server Fehler", error);
    }
  };

  // 2. Effekt beim Start
  useEffect(() => {
    loadDataFromServer();
  }, []);

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  // 3. Hinzufügen (Schon umgestellt)
  async function onAdd(): Promise<void> {
    const newItem: Todo = {
      id: Date.now().toString(), // Sicherere ID
      title: inputValue,
      completed: false,
    };

    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        setInputValue("");
        await loadDataFromServer(); // Holt die frische Liste vom Server
      }
    } catch (error) {
      console.error("Konnte Todo nicht speichern", error);
    }
  }

  // PLATZHALTER: Diese Funktionen bauen wir als nächstes für den Server um
  async function onDeleteTodo(id: string) {
    try {
      const response = await fetch (`http://localhost:3000/todos/${id}`, { method: "DELETE"})

      if (response.ok) {
        await loadDataFromServer()
      }
    } catch (error){
      console.error("Fehler beim Loeschen:", error)
    }
  }

  async function onToggleTodo(id: string) {
    
    try{

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH"
      })
      if(response.ok){

        await loadDataFromServer()

      }
    }catch (error) {

      console.error("Fehler beim Verschieben", error);

    }

  }

  return (
    <div className="flex flex-col gap-5 p-4">
      <AddTodoForm value={inputValue} onAdd={onAdd} onChange={onInputChange} />
      <div className="flex flex-row gap-100 p-5">
        <div className="flex flex-col gap-5 p-4">
          <h1 className="text-lg font-bold">TodoListe</h1>
          <TodoList onDelete={onDeleteTodo} todoList={todoList} onClick={onToggleTodo} />
        </div>
        <div className="flex flex-col gap-5 p-4">
          <h1 className="text-lg font-bold">DoneListe</h1>
          <TodoList onDelete={onDeleteTodo} todoList={doneList} onClick={onToggleTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;