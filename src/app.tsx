import { useState } from "react";
import { Header } from "./Components/Header/header";
import { Login } from "./Components/Login/login";
import { Register } from "./Components/Register/register";

function App() {
  const [token, setToken] = useState<string | null>(null);

  const handleLoginSuccess = (token: string) => {
    setToken(token);
  };

  return (
    <div className='w-full min-h-screen bg-slate-950 text-white'>
      <Header />
      <main>
        {!token ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <p>Bem vindo</p>
        )}
        <Register />
      </main>
    </div>
  );
}

export default App;
