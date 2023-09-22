"use client";
import { useState } from 'react';
import Loader from '@/components/Loader';
import { AppContext } from '@/context/NavContext';
import { createContext, useContext} from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import Cards from './testCard';

export default function TestSection({data, count})  {
     // State to store the selected random data
     const [randomData, setRandomData] = useState([]);
     const [correct, setCorrect] = useState({});
     const [check, setCheck] = useState(false);

     const updateDictStateByKey = (key, value) => {
        setCorrect(prevState => {
            return {
                ...prevState,
                [key]: value
            };
        });
    }

     useEffect(() => {
        if (data && Array.isArray(data)) {
            // Make a copy of the data array using the spread operator
            const dataCopy = [...data];
            
            // Shuffle the copied array and pick the first 'count' number of elements
            const shuffledData = dataCopy.sort(() => 0.5 - Math.random());
            const selectedData = shuffledData.slice(0, count);
            
            const selectedDataWithOptions = selectedData.map(item => {
                const filteredData = data.filter(cur => cur.id !== item.id);
                let numItems = (filteredData.length >= 4) ? 3 : filteredData.length;
                const slicedData = filteredData.slice(0, numItems);
                slicedData.push(item);
                const uniqueShuffledData = slicedData.sort(() => 0.5 - Math.random());
                return {
                    ...item,
                    options: uniqueShuffledData
                };
            });

            console.log(selectedDataWithOptions)
            setRandomData(selectedDataWithOptions);

            const newDict = {};
            selectedData.forEach(item => {
                newDict[item.id] = false;
            });

            setCorrect(newDict);

        }
        }, [count]);

    return(
        <div>  
            <div className='flex justify-between'>
                <p className={`text-white ${check ? "visible" : "invisible"} p-2 text-xl font-bold `}>
                    Score: {Object.values(correct).filter(value => value === true).length}/{Object.values(correct).length}
                </p> 
                <div className='flex justify-end'>
                    <button 
                    type="submit" 
                    className={`mr-2
                    text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                        Restart
                    </button>

                    <button 
                    type="submit" 
                    onClick={() => setCheck(true)}
                    className={`${check ? "hidden" : "block"}
                    text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                        Check
                    </button>
                </div>
            </div>
            
            {randomData && randomData.map((item, index) => (
                    <Cards 
                        key={index} 
                        word={item} 
                        setCorrect={updateDictStateByKey}
                        data={item.options}  
                        count={count}
                    />
           
            ))}

        </div>
        
    )
}

