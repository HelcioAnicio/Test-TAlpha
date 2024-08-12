import React, { useState } from "react";

interface Register {
  name: string;
  taxNumber: string;
  mail: string;
  phone: string;
  password: string;
}

export const Register = () => {
  const [registerData, setRegisterData] = useState<Register>({
    name: "",
    taxNumber: "",
    mail: "",
    phone: "",
    password: "",
  });

  const baseUrl = "https://interview.t-alpha.com.br/api/";

  const onClickRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = `${baseUrl}auth/register`;
    const apiRequest = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: registerData.name,
        taxNumber: registerData.taxNumber,
        mail: registerData.mail,
        phone: registerData.phone,
        password: registerData.password,
      }),
    });

    const data = apiRequest.json();
    console.log(data);
    // console.log(registerData);

    setRegisterData({
      name: "",
      taxNumber: "",
      mail: "",
      phone: "",
      password: "",
    });

    return apiRequest;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegisterData((prevData) => ({
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
          <legend className='ml-4'>Cadastrar</legend>

          <div className='flex flex-col gap-1'>
            <label htmlFor='inputName'>Name: </label>
            <input
              className='border border-white bg-transparent'
              type='text'
              name='name'
              id='inputName'
              value={registerData.name}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='inputtaxNumber'>Cpf ou Cnpj: </label>
            <input
              className='border border-white bg-transparent'
              type='text'
              name='taxNumber'
              id='inputtaxNumber'
              value={registerData.taxNumber}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='inputEmail'>Email: </label>
            <input
              className='border border-white bg-transparent'
              type='email'
              name='mail'
              id='inputEmail'
              value={registerData.mail}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='inputPhone'>Celular: </label>
            <input
              className='border border-white bg-transparent'
              type='tel'
              name='phone'
              id='inputPhone'
              value={registerData.phone}
              onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='inputPassword'>Senha: </label>
            <input
              className=' border border-white bg-transparent'
              type='password'
              name='password'
              id='inputPassword'
              value={registerData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type='submit'
            onClick={onClickRegister}
            className='w-full bg-slate-500 rounded-sm p-1'>
            Cadastrar
          </button>
        </fieldset>
      </form>
    </>
  );
};
