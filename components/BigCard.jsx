import Jumbotron from '@/components/Jumbotron'


export default function BigCard() {
    return (
        // [length:90em_50em]
       <div id="main" className={`h-screen bg-center bg-cover bg-[url('/images/fuji.jpeg')]`}>
        <Jumbotron heading="Learn Japanese" subHeading="A Japanese Vocabulary Application" callToAction="Get Started"/>
       </div>
    )
}
    