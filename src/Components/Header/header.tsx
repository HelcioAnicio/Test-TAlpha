import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    // Remova o token do local storage
    localStorage.removeItem("token");

    // Redirecione o usuário para a página de login ou outra página
    navigate("/login");
  };

  return (
    <header className='p-4 bg-blue-950 w-full text-white flex justify-between'>
      <h1 className='text-xl font-bold'>Test T-Alpha</h1>
      {token && (
        <button
          onClick={handleLogout}
          className='bg-red-500 p-2 rounded-md'>
          Logout
        </button>
      )}
    </header>
  );
};
