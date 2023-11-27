import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';

const SearchForm = () => {
    
    const router = useRouter();
    const [keyword, setKeyword] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();

        router.push('?keyword='+keyword);
    }

    return (
        <>
            <div className="w-full">
                <form className="bg-white px-3 py-4 mb-4" onSubmit={handleSearch}>
                    <div className="relative text-gray-600 focus-within:text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" style={
                                {
                                    "width":"20px"
                                }
                            }><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </span>
                        <input className="search-input py-2 text-sm text-white pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Cari produk atau jasa..." autoComplete="off" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                    </div>
                </form>
            </div>
        </>
    )
};

export default SearchForm;