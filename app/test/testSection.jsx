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

     useEffect(() => {
        if (data && Array.isArray(data)) {
            // Make a copy of the data array using the spread operator
            const dataCopy = [...data];
            
            // Shuffle the copied array and pick the first 'count' number of elements
            const shuffledData = dataCopy.sort(() => 0.5 - Math.random());
            const selectedData = shuffledData.slice(0, count);
            setRandomData(selectedData);

            const newDict = {};
            selectedData.forEach(item => {
                newDict[item.id] = false;
            });

            setCorrect(newDict);
            console.log(JSON.stringify(newDict))
        }
        }, [data, count]);

    return(
        <div>   
             {randomData && randomData.map((item, index) => (
                <Cards key={index} word={item} 
                data={data.filter((cur, filterIndex) => cur.id !== item.id)}  count={count}/>
            ))}
        </div>
        
    )
}

