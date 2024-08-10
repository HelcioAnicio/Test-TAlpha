import { Header } from "./Components/Header/header";
import { Login } from "./Components/Login/login";
import { Register } from "./Components/Register/register";

function App() {
  return (
    <div className='w-full min-h-screen bg-slate-950 text-white'>
      <Header />
      <main>
        <Login />
        <Register />
      </main>
    </div>
  );
}

export default App;
