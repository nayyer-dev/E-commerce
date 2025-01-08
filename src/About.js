import React, { useContext } from 'react'
import HeroSection from './components/HeroSection'
import { AppContext, useProductContext } from './context/productcontext';

const About = () => {
  const {myName} = useProductContext();

  const data = {
    name: "Thapa Ecommerce",
  };

  return (
    <div>
      {myName}
      <HeroSection myData={data} />
    </div>
  )
}

export default About