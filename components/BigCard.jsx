import Jumbotron from '@/components/Jumbotron'


export default function BigCard() {
    return (
       <div id="main" className={`h-screen bg-center bg-[length:90em_50em] bg-[url('/images/fuji.jpeg')]`}>
        <Jumbotron heading="Learn Japanese" subHeading="A Japanese Vocabulary Application" callToAction="Get Started"/>
       </div>
    )
}
    