"use client";
import { useState } from 'react';
import Cards from './cards';
import Loader from '@/components/Loader';

export default function Learn() {
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    async function SearchWord() {
        setLoading(true);
        try {
          const response = await fetch(`/api/words?key=${searchInput}`); // Replace 'your-endpoint' with the actual endpoint URL
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          
          const data = await response.json();
          setData(data);

          setLoading(false);

          var results = document.getElementById('results');
          results.scrollTop = 0;

          var pronounciations = document.querySelectorAll('.card');

          // Scroll each card to the top
          pronounciations.forEach(pronounciation => {
              pronounciation.scrollTop = 0;
          });
          

        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      }

    return(
      
        <div className="bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed bg-black/[.6]">
            <form className="absolute inset-basic inset-x-phone lg:inset-x-1/4">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search word" 
                    onChange={(e) => setSearchInput(e.target.value)}
                    required />
                    <button onClick={(e) => {e.preventDefault(); SearchWord()}} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

            <div id="results" className={`${loading ? "invisible" : "visible"} mt-20 absolute inset-basic inset-x-0 bottom-0 overflow-scroll`} >
            {data && data.data.map((wordEntry, index) => (
                <Cards key={index} word={wordEntry} />
            ))}
            </div>

            <div className='flex justify-center'>
            <div className={`${loading ? "visible" : "invisible"} absolute inset-y-basic mt-20`}><Loader/></div>
            </div>

        </div>
    )
}
