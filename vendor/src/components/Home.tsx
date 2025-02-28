import React from 'react'
import Hero from './Hero'
import Card from './Card'
import Multicard from './Multicard'
import Footer from './Footer'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div>
        <Navbar/>
       <Hero/>
     <Card/>
     <Multicard/>
     <Footer/>
    </div>
  )
}

export default Home



