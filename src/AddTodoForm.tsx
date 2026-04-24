import type { ChangeEvent, KeyboardEvent } from "react";

interface AddTodoFormProps {
  onAdd: () => void;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function AddTodoForm({ onAdd, value, onChange }: AddTodoFormProps) {
  
  // Funktion für die Enter-Taste
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() !== "") {
      onAdd();
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 focus-within:ring-4 focus-within:ring-sky-500/10 focus-within:border-sky-400 transition-all duration-300">
      <input
        className="flex-1 px-4 py-2 text-slate-700 bg-transparent outline-none placeholder:text-slate-400 font-medium"
        type="text"
        name="todoInput"
        placeholder="Was gibt's zu tun?"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      
      <button
        disabled={!value.trim()}
        className="px-6 py-2 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 active:scale-95 disabled:opacity-30 disabled:grayscale transition-all shadow-md shadow-sky-200"
        onClick={onAdd}
      >
        Hinzufügen
      </button>
    </div>
  );
}