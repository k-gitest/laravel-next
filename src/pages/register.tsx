import React, { useState } from 'react';
import { larafetch } from '@/lib/larafetch'

export default function register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const csrf = () => larafetch.get('/sanctum/csrf-cookie')

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await csrf()

    larafetch.post('/register',
      {
        "name": name,
        "email": email,
        "password": password,
      })
      .then((res) => {
        console.log(res);
      }).catch((error) => {
        console.error(error);
      });

  }

  return (
    <div>
      <h1>Register</h1>
      <p>Register your account</p>
      <form onSubmit={submitForm}>
        <div className="flex flex-col gap-2 max-w-96">
          <input id="name" onChange={event => setName(event.target.value)} type="text" className='border' />
          <input id="email" onChange={event => setEmail(event.target.value)} type="email" className="border" />
          <input id="password" onChange={event => setPassword(event.target.value)} type="password" className="border" />
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Register</button>
        </div>
      </form>
    </div>
  );
}