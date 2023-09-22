"use client";
import { useState } from 'react';
import Cards from '@/components/wordCard';
import Loader from '@/components/Loader';
import { AppContext } from '@/context/NavContext';
import { createContext, useContext} from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import TestSection from './testSection';

export default function Test({data}) {
    const [test, setTest] = useState(false);
    const [questions, setQuestions] = useState(2);

    const startTest = () => {
        setTest(true);
    };

    const { activeLink, setActiveLink } = useContext(AppContext);
    useEffect(() => {
      setActiveLink("learn");
    }, []);

    return(
      
        <div className="relative bottom-0 left-0 right-0 top-0 h-full w-full overflow-scroll bg-fixed bg-black/[.6] flex justify-center">
            
            <p className={`${Object.keys(data).length < 2 && !test ? "block" : "hidden"} 
            w-6/12 absolute inset-y-basic text-4xl text-white  w-auto px-3 text-center
                block mb-2 font-medium text-gray-900 dark:text-white`}>
                    You need at least 2 cards to begin <br />Add more 
                     <Link className='p-1 ml-2 bg-green-700 hover:bg-green-800 focus:ring-green-300
                     focus:ring-4 focus:outline-none font-medium rounded-lg text-center align-middle 
                     justify-center' href="/learn">Here</Link>
            </p>
            
            <div className={`${Object.keys(data).length > 1 && !test ? "flex" : "hidden"} absolute top-basic flex`}>
                <label className="text-4xl text-white  w-auto px-3
                block mb-2 font-medium text-gray-900 dark:text-white">Select how many questions</label>
                <select className="w-auto self-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e)=>setQuestions(e.target.value)} 
                value={questions}
                >
                    {Array.from({ length: data.length - 1}, (_, i) => (
                        <option key={i} value={i + 2}>{i + 2}</option>
                    ))}
                </select>
                
            </div>

            <button 
            onClick={() => startTest()}
            type="submit" 
            className={`${Object.keys(data).length > 1 && !test ? "block" : "hidden"}
            text-white absolute top-basic mt-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                Begin
            </button>

            <div className={`${!test ? "hidden" : "block"} absolute top-basic inset-x-basic bg-black/[.2] rounded-xl`}>
                <TestSection data={data} count={questions}/>
            </div>

            
        </div>
    )
}

