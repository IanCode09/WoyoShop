import React from 'react'
import ImageHero from '../assets/images/bg.jpg'
import {Image, Jumbotron, Button} from 'react-bootstrap'

const Hero = () => {
    return (
        
            <Jumbotron fluid>
                <div className="hero-content ">
                    <h1>Time to Upgrade Your Device and Make Your Work More Optimal</h1>
                    <Button variant="outline-primary" style={{marginTop: '20px', fontSize: '20px'}}>Show Product</Button>
                </div>
                
                <Image src={ImageHero} style={{width: '100%'}}/>
                
                
            </Jumbotron>

            /* <Image src={ImageHero} style={{width: '100%'}}/>
             */

    )
}

export default Hero
