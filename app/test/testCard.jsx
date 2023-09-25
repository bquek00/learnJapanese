"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react';
import { useEffect } from 'react';

export default function Cards({word, data, id, count, setCorrect, check}) {
  const [selected, setSelected] = useState({});
  const [result, setResult] = useState(false);

    const handleClick = (answer) => {
      if (!check) {
        setSelected(answer)
        if (word.id === answer.id) {
          setCorrect(word.id, true)
          setResult(true)
        } else {
          setCorrect(word.id, false)
          setResult(false)
        }
      }
    };

    return (
        <div className={`bg-white m-3 p-2 rounded-xl ${check ? "border-4": ""} ${result ? "border-emerald-500" : "border-red-500"}`}>
            <p className='text-sm lg:text-2xl'>Match the word with the definition</p>
            <p className='text-2xl lg:text-3xl'>{word.slug}</p>

            <p className='text:xl lg:text-2xl'>Options</p>

            <div className='flex flex-col'>
                {data && data.map((item, index) => (
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