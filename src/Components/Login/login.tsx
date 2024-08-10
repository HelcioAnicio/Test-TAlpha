import { useState } from "react";

interface Login {
  taxNumber: string;
  password: string;
}

export const Login = () => {
  const [loginData, setLoginData] = useState<Login>({
    taxNumber: "",
    password: "",
  });

  const baseUrl = "https://interview.t-alpha.com.br/api/";

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
    console.log(loginData);
    setLoginData({
      taxNumber: "",
      password: "",
    });

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
        action=''
        method='post'>
        <fieldset className='border-white border m-auto w-[calc(100%-1rem)] sm:w-full flex flex-col items-start gap-5 pt-10 p-2 rounded-md'>
          <legend className='ml-4'>Login</legend>

          <div className='flex flex-col gap-1'>
            <label htmlFor='inputtaxNumber'>Cpf ou Cnpj: </label>
            <input
              className=' placeholder:text-gray-300 border border-white bg-transparent'
              type='string'
              name='taxNumber'
              id='inputtaxNumber'
              value={loginData.taxNumber}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='inputPassword'>Senha: </label>
            <input
              className='placeholder:text-gray-300 border border-white bg-transparent'
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
            className='w-full bg-slate-500 rounded-sm p-1'
            onClick={onClickLogin}>
            Logar
          </button>
        </fieldset>
      </form>
    </>
  );
};
