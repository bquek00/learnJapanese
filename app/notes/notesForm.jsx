"use client";
import { useState } from 'react';
import Loader from '@/components/Loader';
import { AppContext } from '@/context/NavContext';
import { createContext, useContext} from 'react';
import { useEffect } from 'react';
import Cards from '@/components/wordCard';

export default function Notes({session, data}) {
    const [usrNotes, setUsrNotes] = useState(data);
    const [searchInput, setSearchInput] = useState('');

    const { activeLink, setActiveLink } = useContext(AppContext);
    useEffect(() => {
      setActiveLink("learn");
    }, []);

    const handleDelete = (id) => {
        setUsrNotes(prevUsrNotes => {
            return prevUsrNotes.filter(item => item.id !== id)
        })
    }

    return(
      
        <div className="bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed bg-black/[.6]">
            <form className="absolute inset-basic inset-x-1/4">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Filter</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Filter Notes" 
                    onChange={(e) => setSearchInput(e.target.value)}
                    required />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Filter</button>
                </div>
            </form>

            <div id="results" className={`mt-20 absolute inset-basic inset-x-0 bottom-0 overflow-scroll`} >
            {usrNotes.map((item, index) => (
                <Cards key={index} word={item.jishodata} isSearch={false} cid={item.id} onDelete={handleDelete }/>
            ))}
            </div>


        
        </div>
    )
}
