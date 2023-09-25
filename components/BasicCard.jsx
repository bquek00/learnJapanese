export default function BasicCard({ title, text, left, image, children}) {
    const flexClasses = left ? 'md:flex-row-reverse' : 'md:flex-row';
    const mobFlexClasses = left ? 'flex-col-reverse' : 'flex-col';

    return (
       <div className={`className='overflow-hidden' w-3/4 h-3/4 md:w-basic md:h-basic border border-gray-200 
       rounded-lg shadow flex my-11 md:my-0
       ${mobFlexClasses} ${flexClasses} justify-between overflow-hidden`}>
        <div className="md:pt-20 w-full">
            <div className="p-10">
                <h2 className="mb-4 text-4xl font-semibold">{title}</h2>
                <p>{text}</p>
                {children}
            </div>
        </div>
        <img src={image} className='object-scale-down md:object-cover h-2/4 md:h-full md:block border border-gray-200 rounded-lg shadow'/>
       </div>
    )
}
    