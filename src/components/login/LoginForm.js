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
    const response = await fetch('/api/customer/login', {
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

    // If response is OK, set JWT access token to cookies and redirect to home page
    // const { accessToken } = await response.json();
    // console.log(await response.json())
    // document.cookie = `accessToken=${accessToken}; path=/;`;
    // router.push('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="username" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}