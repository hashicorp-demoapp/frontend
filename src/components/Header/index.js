import React, {useEffect} from 'react' //imports useEffect from React
import PropTypes from 'prop-types' //typechecking 
import styled, { keyframes, css } from 'styled-components' //css styling
import { style } from '@material-ui/system'

//css styling for the logo
const Logo = styled.div` //division in HTML document and it styled with css below
    position: absolute;
    top: calc(50% - 109px);
    
    z-index: 100; 
    svg {
        fill: #000000; /* black */
    }
`
const Title = styled.div`
    position: relative; //positions it relative to the logo
    top: -50px;
    left: 80px; //80px away from logo
    font-family: montserrat;
    font-size: 2em;
    width: 100px;
    font-weight: 70;
    z-index: 11;
    opacity: 0%;
    color: #fff;
    
`

//css styling for the overlay
const Overlay = styled.div` //division in HTML document and it styled with css below
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000; //header color (black) ; //overlay is white
    width: 100%;
    height: 100%;
    z-index: 1;
`
const animateTitle = keyframes`
    0%{
        opacity: 0%;
    }
    50%{
        opacity: 100%;
    }
    100%{
        opacity: 100%;
    }
`


//animation css for the logo
const animateLogo = keyframes`
    0% {
        top: calc(50% - 109px); //starting position of top animation
        width: 100px;
        left: calc(50% - 50px);//starting position of left animation
    }
    16% {
        top: 20px; //moves to 20 px away from top border
        width: 50px;
        left: calc(50% - 50px); //same position but width got smaller

        
    } 
    50% {
        top: 20px; //stays the same
        width: 50px;
        left: calc(50% - 50px); //same position as above
    }
    75%{
        top:20px;
        width: 50px;
        left:42.5%; //starts moving to left (100px away from border)
    }
    100%{
        top: 20px; //ends 20px away from top
        width:50px;
        left:42.5%; //ends 100px away from left
    
    }
`
//changes color of logo from white to black
const animateColor = keyframes`
    0% {
        fill: #fff; //color black
    }

    66% {
        fill: #fff; //color black
    }

    100% {
        fill: #fff; //color white
    }
`
//animates black background coming up when page is reloaded
const animateOverlay = keyframes`
    0% {
        height: 100%;
    }    

    50% {
        height: 100%;
    }

    75% {
        height: 0%;
    }

    100% {
        height: 0%;
    }
`
//brings up white header to be right under logo
const animateHeader = keyframes`
    0% {
        min-height: 100%;
    }    

    50% {
        min-height: 100%;
    }

    75% {
        min-height: 90px; //moves to 90px away from top border
    }

    100% {
        min-height: 90px;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    min-height: 100%;
    overflow: hidden;
    z-index: 10;
    width: 100%;
    box-shadow: 1px 1px  white;

    ${Logo} {
        svg {
            ${props => !props.loading && css`
                animation-name: ${animateColor};
                animation-duration: 2s;
                animation-iteration-count: 1;
                animation-fill-mode: forwards;
                animation-timing-function: ease-in;
            `}
        }
    
        ${props => !props.loading && css`
            animation-name: ${animateLogo};
            animation-duration: 4s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in-out;
        `}
    }

    ${Overlay} {
        ${props => !props.loading && css`
            animation-name: ${animateOverlay};
            animation-duration: 2s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in;
        `}
    }

    ${props => !props.loading && css`
        animation-name: ${animateHeader};
        animation-duration: 2s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
    `}
    ${Title}{
        ${props => !props.loading && css`
        animation-name: ${animateTitle};
        animation-delay: 3s;
        animation-duration:1s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
        `}
    }
`

export const Header = ({ loading }) => { //provides Header function that can now be imported onto other files

    useEffect(() => {
        document.title = 'HashiCups'//name that shows up on browser tab
    })

    return (
        <Container loading={loading ? 1:0} >
            <Logo>
                <a href="/">
                <svg id="logo_image" viewBox="0 0 33 36">
                    <g id="logo_path"><path d="M20 26.7l5.4-3V3.2L20 0v15.3h-6.9v-6l-5.5 3v20.5l5.5 3.2V20.7H20z"/>
                        <path d="M28 4.6v20.8l-8 4.4V36l13-7.5v-21zM13.1 0L0 7.5v21l5.1 2.9V10.6l8-4.4z"/>
                        </g>
                </svg>
                </a>
                <Title>HashiCups</Title>
            </Logo>
            <Overlay/> 
        </Container>
    )
}

Header.propTypes = {
    loading: PropTypes.bool
}