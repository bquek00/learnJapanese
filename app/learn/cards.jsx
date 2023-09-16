export default function Cards({word}) {


    
    return (
        <div className="bg-white w-9/12 mx-auto my-10 p-3 rounded-xl">
        <h1 className="text-4xl">{word.slug}</h1>
        <div>
            <h2 className="text-3xl">
                Definitions
            </h2>
            <div>
                {word.senses.map((sense, senseIndex) => (
                    <div key={senseIndex}>
                        <p key={senseIndex + 1} className="text-2xl">{sense.parts_of_speech.join(', ')}</p>
                        <p key={senseIndex + 2}>{sense.english_definitions.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-3xl">
                Pronounciations
            </h2>

            <div className="max-h-24 overflow-scroll card">
            {word.japanese.map((form, formIndex) => (
                <p key={formIndex + 3} className="">
                    Word: {form.word || '-'} | Reading: {form.reading || '-'}
                </p>
            ))}
            </div>

        </div>
    </div>
	);
}