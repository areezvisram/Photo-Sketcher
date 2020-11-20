import React from 'react'
import './Header.css'
import logo from '../images/logo.png'
import GitHub from './socials/GitHub'
import Linkedin from './socials/LinkedIn'

const Header = () => {
    return (
        <div className="header">
            <div>
                <a href="http://www.areezvisram.com" target="_blank" rel="noopener noreferrer">
                    <img src={logo} alt="" className="logo"></img>
                </a>
            </div>
            <div className="social-div">
                <a href="https://www.github.com/areezvisram" target="_blank" rel="noopener noreferrer">
                    <GitHub style={'github'} />
                </a>
                <a href="https://www.linkedin.com/in/areezvisram/" target="_blank" rel="noopener noreferrer">
                    <Linkedin style={'linkedin'} />
                </a>
            </div>
        </div>
    )
    
}

export default Header;