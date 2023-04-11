import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('ia_digitalprinting');
  const [password, setPassword] = useState('Rio991155');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the login API route with username and password
    const response = await fetch('/api/buyer/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    // If response is not OK, set error message
    if (!response.ok) {
      const { message } = await response.json();
      setError(message);
      return;
    }
    
    router.push('/');
  };

  return (
    <div className="w-full">
      <form className="bg-white px-3 py-4 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="username">
            Nama Pengguna
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={username} onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Username" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        {error && <div className='pb-3'>
          <p className="text-red-500 text-xs italic">{error}</p>
        </div>}
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Masuk
          </button>
          <a className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800" href="#">
            Lupa Password?
          </a>
        </div>
      </form>
    </div>
  );
}