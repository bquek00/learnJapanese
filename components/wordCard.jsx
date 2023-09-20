"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react';

export default function Cards({word, isSearch, cid, onDelete}) {
    const supabase = createClientComponentClient()
    const [popUp, setPopup] = useState(false);

    const showPopup = () => {
        setPopup(true);
    };

    const del = async (toAdd, toDefine) => {
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            
            if (session) {
                var user = session?.user?.id

                const { data, error } = await supabase
                .from('notes')
                .delete()
                .eq('id', cid)
                .eq('uid', session?.user?.id)

                onDelete(cid)
                

                alert("Deleted " + toAdd)

                if (error) {
                    console.log(error);
                }

            } else {
                alert("Please Login")
            }

            

        } catch (error) {
            alert("Error fetching session:" + error);
        }
    };

    const add = async (toAdd, toDefine) => {
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            
            if (session) {
                var user = session?.user?.id

                alert("Added " + toAdd)

                const { _, error } = await supabase.from('notes').insert({
                    uid: session?.user?.id,
                    isjisho: true,
                    slug: toAdd,
                    jishodata: toDefine,
                }); 

                if (error) {
                    console.log(error);
                }

            } else {
                alert("Please Login")
            }

            

        } catch (error) {
            alert("Error fetching session:" + error);
        }
    };

    const checkAdded = async (toAdd, toDefine) => {
        try {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            
            if (session) {
                var user = session?.user?.id

                const { data:selectData, err } = await supabase.from('notes').select().eq('slug', toAdd).eq('uid', session?.user?.id);

                if (Object.keys(selectData).length > 0) {
                    showPopup();
                    return;
                } 

                add(toAdd, toDefine);

            } else {
                alert("Please Login")
            }  
        } catch (error) {
            alert("Error fetching session:" + error);
        }
    };

    const handlePopup = (command) => {
        if (command === "add") {
            add(word.slug, word)
        } else if (command === "delete") {
            del(word.slug, word)
        }
        setPopup(false);
    };
    
    const handleClick =() => {
        if (isSearch) {
            checkAdded(word.slug, word);
        } else {
            showPopup();
        }
    }

    return (
        <div className="bg-white w-9/12 mx-auto my-10 p-3 rounded-xl break-all">
        <div className="flex justify-between">
            <h1 className="text-2xl md:text-4xl">{word.slug}</h1>
            <button className={`text-white 
            ${isSearch ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300" : "bg-red-700 hover:bg-red-800 focus:ring-red-300"}
            focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center align-middle flex items-center justify-center
            hidden md:block`}
            onClick={() => handleClick()}>
                {isSearch ? "Add to notes" : "Delete"}
            </button>

        </div>
        <div>
            <h2 className="text-xl md:text-3xl">
                Definitions
            </h2>
            <div>
                {word.senses.map((sense, senseIndex) => (
                    <div key={senseIndex}>
                        <p key={senseIndex + 1} className="text-lg md:text-2xl">{sense.parts_of_speech.join(', ')}</p>
                        <p key={senseIndex + 2} className="text-sm md:text-base break-normal">{sense.english_definitions.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-xl md:text-3xl">
                Pronounciations
            </h2>

            <div className="max-h-24 overflow-scroll card">
            {word.japanese.map((form, formIndex) => (
                <p key={formIndex + 3} className="text-sm md:text-base break-normal">
                    Word: {form.word || '-'} | Reading: {form.reading || '-'}
                </p>
            ))}
            </div>

        </div>

        <button className={`text-white 
            ${isSearch ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300" : "bg-red-700 hover:bg-red-800 focus:ring-red-300"}
            mt-2 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center align-middle flex items-center justify-center
            md:hidden`}
            onClick={() => handleClick()}>
                {isSearch ? "Add to notes" : "Delete"}
            </button>

        <div className={`${popUp ? "block" : "hidden"}`}>
            <div id="popup-modal" tabIndex="-1" 
            className={`fixed top-0 left-0 right-0 z-50 overflow-x-hidden overflow-y-none md:inset-0 h-[calc(100%-1rem)] w-full h-full`}>
                <div className="relative w-full top-1/4 flex justify-center">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-6 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                {isSearch ? "Duplicate detected. Add anyway?" : "Are you sure?"}
                                </h3>
                            <button 
                            onClick={() => handlePopup(isSearch ? "add" : "delete")}
                            data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Yes
                            </button>
                            <button 
                             onClick={() => handlePopup("cancel")}
                            data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
	);
}