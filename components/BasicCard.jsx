import Image from 'next/image'

export default function BasicCard({ title, text, left, image}) {
    const flexClasses = left ? 'flex-row-reverse' : 'flex-row';

    return (
       <div className={`w-basic h-basic border border-gray-200 rounded-lg shadow flex ${flexClasses} justify-between`}>
        <div className="pt-20">
            <div className="p-10">
                <h2 className="mb-4 text-4xl font-semibold">{title}</h2>
                <p>{text}</p>
            </div>
        </div>
        <img src={image} className='border border-gray-200 rounded-lg shadow'/>
       </div>
    )
}
    