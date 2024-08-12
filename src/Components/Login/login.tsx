import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess: (token: string) => void;
}

interface Login {
  taxNumber: string;
  password: string;
}

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const [loginData, setLoginData] = useState<Login>({
    taxNumber: "",
    password: "",
  });

  const navegate = useNavigate();

  const baseUrl = "https://interview.t-alpha.com.br/api/";

  useEffect(() => {
    // Remove o token ao acessar a tela de login
    localStorage.removeItem("token");
  }, []);

  const onClickLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiRequest = `${baseUrl}auth/login`;
    const response = await fetch(apiRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taxNumber: loginData.taxNumber,
        password: loginData.password,
      }),
    });
    // console.log(loginData);

    const data = await response.json();
    const token = data?.data?.token;
    console.log(data);

    if (token) {
      localStorage.setItem("token", token);
      onLoginSuccess(token);
      navegate("/products");
    }

    return response;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        action='/products'
        method='post'>
        <fieldset className='border-white border m-auto w-[calc(100%-1rem)] sm:w-full flex flex-col items-start gap-5 py-10 p-2 rounded-md  max-w-lg sm:items-center'>
          <legend className='ml-4'>Login</legend>

          <div className='flex flex-col gap-1 w-full max-w-xs'>
            <label htmlFor='inputtaxNumber'>Cpf ou Cnpj: </label>
            <input
              className='border border-white bg-transparent p-1 rounded-md'
              type='string'
              name='taxNumber'
              id='inputtaxNumber'
              value={loginData.taxNumber}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1 w-full max-w-xs'>
            <label htmlFor='inputPassword'>Senha: </label>
            <input
              className='border border-white bg-transparent p-1 rounded-md'
              type='password'
              name='password'
              id='inputPassword'
              value={loginData.password}
              onChange={handleChange}
              autoComplete='current-password'
            />
          </div>

          <button
            type='submit'
            className='bg-slate-500 rounded-sm p-1 w-full max-w-xs hover:bg-slate-700 duration-100'
            onClick={onClickLogin}>
            Logar
          </button>
        </fieldset>
      </form>
    </>
  );
};
