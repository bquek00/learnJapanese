export default function DefaultCard({children, id}) {
    return (
       <div className="h-screen flex items-center justify-center snap-center" id={id}>
        {children}
       </div>
    )
}
    