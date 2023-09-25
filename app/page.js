"use client";
import NavBar from '@/components/NavBar'
import BigCard from '@/components/BigCard'
import DefaultCard from '@/components/DefaultCard'
import BasicCard from '@/components/BasicCard'
import Jumbotron from '@/components/Jumbotron';
import { useEffect } from 'react';
import { AppContext } from '@/context/NavContext';
import { createContext, useContext} from 'react';
import ContactLink from '@/components/ContactLink';

export default function Home() {

  const { activeLink, setActiveLink } = useContext(AppContext);
  
  return (
  
    <div className='overflow-hidden'>
      <NavBar />
      <BigCard>
        <Jumbotron heading="Learn Japanese" subHeading="A Japanese Vocabulary Application" callToAction="Get Started"/>
      </BigCard>
      <DefaultCard id='about'>
        <BasicCard 
        title="About" 
        image="images/street-small.jpg"
        id="about"
        text="Explore Japanese vocabulary effortlessly with our app. Through our integration with the Jisho API, we offer a seamless search capability. Our platform also includes an intuitive space for you to save notes and the vocabulary you've explored. To top it off, we've incorporated a testing mechanism to assess and reinforce your skills"/>
      </DefaultCard>
      <DefaultCard id='contact'>
        <BasicCard 
        title="Contact" 
        left={true}
        image="images/temple-small.jpg"
        text="I am a final year computer science student at the University of Queensland and I am passionate about Full Stack Development and creating web applications. This is a Japanese learning app I created for my Japanese elective class I'm doing in university. I also really love Japanese culture and hope to work there one day"
        >
          <ContactLink />
        </BasicCard>
      </DefaultCard>
    </div>
  )
}