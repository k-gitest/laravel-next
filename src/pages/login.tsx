import { useState } from 'react';
import { larafetch } from '@/lib/larafetch'
import { useRouter } from 'next/navigation'

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const csrf = async () => await larafetch.get('/sanctum/csrf-cookie')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await csrf()

    larafetch.post('/login', {
      email: email,
      password: password
    }).then((res) => {
      console.log(res);
      router.push('/dashboard')
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Login your account</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 max-w-96">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border" />
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">login</button>
        </div>
      </form>
    </div>
  );
}