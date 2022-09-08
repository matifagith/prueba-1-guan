import React from 'react'
import NavBar from '../../Components/NavBar/NavBar'
import {HomeContainer, HomeNavContainer, HomeBody} from './StyledHome.js'

export default function Home (){
    return (
        <HomeContainer>            
            <HomeNavContainer><NavBar/></HomeNavContainer>
            <HomeBody>Home</HomeBody>
        </HomeContainer>
    )
}