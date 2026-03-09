import type { Todo } from "./types/todo"
import { useEffect, useState, type ChangeEvent, type JSX } from "react";
import { AddTodoForm } from "./AddTodoForm";
import { TodoList } from "./TodoList";
import { LoginView } from "./LoginView";

// Der todoService Import ist weg!

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [doneList, setDoneList] = useState<Todo[]>([]);
  const [isLoggedIN, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("todo-token"))

  
  // 1. Zentrale Funktion zum Laden (Die Quelle der Wahrheit)
  const loadDataFromServer = async () => {
    const token = localStorage.getItem("todo-token");
  

    try {
      const response = await fetch("http://localhost:3000/todos", {
      headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status === 401 || response.status === 403){
        setIsLoggedIn(false)
        return;
      }
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
    const newItem: Omit<Todo, 'id'> = {
      name: inputValue,
      completed: false,
    };

    const token = localStorage.getItem("todo-token");

    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
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
    const token = localStorage.getItem("todo-token");
    try {
      const response = await fetch (`http://localhost:3000/todos/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }})

      if (response.ok) {
        await loadDataFromServer()
      }
    } catch (error){
      console.error("Fehler beim Loeschen:", error)
    }
  }

  async function onToggleTodo(id: string) {
    const token = localStorage.getItem("todo-token");

    try{

      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
      })
      if(response.ok){

        await loadDataFromServer()

      }
    }catch (error) {

      console.error("Fehler beim Verschieben", error);

    }

  }
  
  if (!isLoggedIN) {
    return <LoginView onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans text-slate-900">
    <div className="max-w-5xl mx-auto">
      
      {/* Header & Input Sektion */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-8">
          simple<span className="text-sky-600">Todo</span>
        </h1>
        <div className="flex justify-center">
          <AddTodoForm value={inputValue} onAdd={onAdd} onChange={onInputChange} />
        </div>
      </header>

      {/* Spalten-Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Spalte: Offene Aufgaben */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Zu erledigen
              <span className="text-sm font-medium bg-sky-100 text-sky-700 px-2.5 py-0.5 rounded-full">
                {todoList.length}
              </span>
            </h2>
          </div>
          <div className="bg-white/40 backdrop-blur-sm p-2 rounded-3xl border border-slate-200/60 shadow-inner">
            <TodoList onDelete={onDeleteTodo} todoList={todoList} onClick={onToggleTodo} />
          </div>
        </section>

        {/* Spalte: Erledigte Aufgaben */}
        <section className="space-y-6 opacity-80 lg:opacity-100 transition-opacity hover:opacity-100">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-500 flex items-center gap-2">
              Erledigt
              <span className="text-sm font-medium bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full">
                {doneList.length}
              </span>
            </h2>
          </div>
          <div className="bg-slate-200/30 p-2 rounded-3xl border border-dashed border-slate-300">
            <TodoList onDelete={onDeleteTodo} todoList={doneList} onClick={onToggleTodo} />
          </div>
        </section>

      </div>
    </div>
  </div>
  );
}

export default App;
