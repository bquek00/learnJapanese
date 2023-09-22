"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Cards({word, data, id, count}) {
    const [options, setOptions] = useState([]);
    const[name, setName] = useState(word.slug) 
    const[selected, setSelected] = useState(null) 

    const handleClick = (answer) => {
      setSelected(answer)
      if (word.id === answer.id) {
        alert("correct")
      } else {
        alert("wrong")
      }
    };

    useEffect(() => {
        if (data && Array.isArray(data)) {
            // Make a copy of the data array using the spread operator
            const dataCopy = [...data];
    
            let numItems = (data.length >= 4) ? 3 : data.length;

            const slicedData = dataCopy.slice(0, numItems)

            slicedData.push(word)
            
            // Shuffle the copied array and pick the first 'count' number of elements
            const shuffledData = slicedData.sort(() => 0.5 - Math.random());

            setOptions(shuffledData);
            setName(word.slug)
        }
        }, [data, count]);
    

    return (
        <div className='bg-white m-3 p-2 rounded-xl'>
            <p className='text-2xl'>Match the word with the definition</p>
            <p className='text-3xl'>{name}</p>

            <p className='text-2xl'>Options</p>

            <div className='flex flex-col'>
                {options && options.map((item, index) => (
                <button key={index} 
                className={`text-start m-1 p-1 ${(selected && selected.id === item.id)? "bg-gray-200": "bg-gray-100 hover:bg-gray-200"} 
                focus:ring-gray-300 rounded-lg`}
                onClick={() => handleClick(item)}>
                    {item.jishodata.senses[0].english_definitions.join(", ")}
                </button>
                ))}
            </div>

        </div>
	);
}