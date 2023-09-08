import Navbar from '@/components/NavBar'
import BigCard from '@/components/BigCard'
import DefaultCard from '@/components/DefaultCard'
import BasicCard from '@/components/BasicCard'

export default function Home() {
  return (
  
    <div>
      <BigCard/>
      <DefaultCard id='about'>
        <BasicCard 
        title="About" 
        image="images/street-small.jpg"
        id="about"
        text="Explore Japanese vocabulary effortlessly with our app. We offer Kanji stroke animations and various conjugations to enhance your learning experience. Perfect for beginners and advanced learners alike, our app simplifies Japanese language acquisition while providing valuable insights into Kanji writing and verb forms"/>
      </DefaultCard>
      <DefaultCard id='contact'>
        <BasicCard 
        title="Contact" 
        left={true}
        image="images/temple-small.jpg"
        text="Explore Japanese vocabulary effortlessly with our app. We offer Kanji stroke animations and various conjugations to enhance your learning experience. Perfect for beginners and advanced learners alike, our app simplifies Japanese language acquisition while providing valuable insights into Kanji writing and verb forms"/>
      </DefaultCard>
    </div>
  )
}