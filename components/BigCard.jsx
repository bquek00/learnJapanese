
export default function BigCard( {children} ) {
    return (
        // [length:90em_50em]
       <div id="main" className={`h-screen bg-center bg-cover bg-[url('/images/fuji.jpeg')]`}>
        {children}
       </div>
    )
}
    