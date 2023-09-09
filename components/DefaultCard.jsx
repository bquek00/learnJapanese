export default function DefaultCard({children, id}) {
    return (
       <div className="overflow-hidden h-auto md:h-screen flex items-center justify-center snap-start" id={id}>
        {children}
       </div>
    )
}
    