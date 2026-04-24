import type { Todo } from "./types/todo";

interface TodoListProps {
  onDelete: (id: string) => void;
  todoList: Todo[];
  onClick: (id: string) => void;
}

export function TodoList({ onDelete, todoList, onClick }: TodoListProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {todoList.map((item) => (
        <div
          key={item.id}
          className="group flex items-center justify-between p-3 bg-white/80 hover:bg-white rounded-2xl transition-all duration-200 border border-transparent hover:border-slate-200 shadow-sm"
        >
          <div className="flex items-center gap-3 flex-1">
            {/* Checkbox ohne Text "completed" - das Icon reicht meistens */}
            <input
              checked={item.completed}
              type="checkbox"
              className="w-5 h-5 rounded-full border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer transition-transform active:scale-90"
              onChange={() => onClick(item.id)}
            />
            
            <span className={`text-slate-700 font-medium ${
              item.completed ? "line-through text-slate-400" : ""
            }`}>
              {item.name}
            </span>
          </div>

          {/* Kleinerer, dezenter Lösch-Button */}
          <button
            className="opacity-0 group-hover:opacity-100 px-3 py-1 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
            onClick={() => onDelete(item.id)}
          >
            Löschen
          </button>
        </div>
      ))}
    </div>
  );
}