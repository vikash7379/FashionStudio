import React from 'react'
import styled from 'styled-components'
import Logo from '../style/Logo'
import VideoCover from '../style/VideoCover'
import Navbar from './Navbar'


const Section  = styled.section`
    position: relative;
    min-height: 100vh;
    overflow: hidden;
`


const Home = () => {
  return (
    <Section id="home">
        <VideoCover/>
        <Logo/>
        <Navbar/>
    </Section>
  )
}

export default Home