import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface LoginViewProbs {
    onLoginSuccess: () => void;
}


export function LoginView ({onLoginSuccess}: LoginViewProbs) {

    const [isLogin, setIsLogin] =  useState(true)
    const [username, setUsername]  = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        const endpoint = isLogin ? "login" : "register"
        
        try {

            const response = await fetch(`${API_URL}/${endpoint}`, {

                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),

            });
            
            const data = await response.json()

            if (response.ok) {

                if(isLogin) {

                    localStorage.setItem("todo-token", data.token)
                    onLoginSuccess()

                }else {

                    alert("Account erstrellt! Du kannst dich jetzt einloggen.")
                    setIsLogin(true)

                }

            }

        }catch(error) {
            setError("Verbindung zum Server fehlgeschlagen")
        }

    }
    
    return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
        <h2 className="text-3xl font-black text-slate-900 mb-2">
          {isLogin ? "Willkommen zurück" : "Account erstellen"}
        </h2>
        <p className="text-slate-500 mb-8">
          {isLogin ? "Logge dich ein, um deine Todos zu sehen." : "Erstelle einen Account für deine private Liste."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nutzername"
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Passwort"
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <p className="text-red-500 text-sm px-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-sky-200 transition-all transform active:scale-[0.98]"
          >
            {isLogin ? "Anmelden" : "Registrieren"}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-slate-500 text-sm font-medium hover:text-sky-600 transition-colors"
        >
          {isLogin ? "Noch keinen Account? Hier registrieren" : "Bereits einen Account? Hier einloggen"}
        </button>
      </div>
    </div>
  );

}