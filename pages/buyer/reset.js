import Layout from "../../src/components/Layout";
import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
    const [username, setUsername] = useState('ia_digitalprinting');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch('/api/buyer/reset', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        
        if (!response.ok) {
            const { message } = await response.json();
            setError(message);

            return;
        }
        
        router.push('/');
    }

    return (
        <Layout title="Reset Password" menuTitle="Reset Password">
            <div className="w-full">
                <form className="bg-white px-3 py-4 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm mb-2" htmlFor="username">
                            Nama Pengguna
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={username} onChange={(event) => setUsername(event.target.value)} type="text" placeholder="Username" />
                    </div>
                    {error && <div className='pb-3'><p className="text-red-500 text-xs italic">{error}</p></div>}
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Reset Password</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
};

export default LoginPage;
