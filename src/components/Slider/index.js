import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useHistory } from "react-router-dom";

import { useCarousel } from '../../hooks/Carousel' //imports useCarousel function
import Box from '@material-ui/core/Box';

import { Payment } from '../Payment'//imports payment function from payment file

const Container = styled.div` //container for "Buy" button
    position: relative;
    overflow: hidden;
    overscroll-behavior: none;
    text-align: center;
    background-color: #fff;
`


//animation for fast sliding at reload of page
const slide = (props) => keyframes`
    0% {
        left: -${(props.length+2)*100}%;
    }    

    100% {
        left: 0%;
    }
`
//css styling for each name of the coffees
const Name = styled.div`
    font-family: "Archer A", "Archer B", "HelveticaNeue", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 2.5rem;
    letter-spacing: -.01em;
    line-height: 1.8;

    font-weight: 600;
    text-transform: Capitalize;
    text-align: center;
    transform: translateY(200px);
`
//css styling for the teasers
const Teaser = styled.div`
    font-family: SoDoSans,Helvetica Neue,Helvetica,Arial,sans-serif;
    font-size: 20px;
    line-height: 1.8;
    font-weight: 400;
    text-transform: Capitalize;
    text-align: center;
    transform: translateY(100px);
`
//css styling for the price
const Price = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-size: 17px;
    line-height: 1.8;
    font-weight: 500;
    text-align: center;
    transform: translateY(100px);
`

//controls animation of buy button as well as styling
const Buy = styled.div`
    box-sizing: border-box;
    font-weight: 600;
    border: 1px solid;
    border-radius: 50px;
    padding: 11px 24px;
    text-align: center;
    display: inline-block;
    width: 90px;
    background: #1563ff;
    border-color: #1563ff;
    color: #ffffff;
    margin: 20px auto 0 auto;
    transform: translateY(100px);
    ${props => props.ready && css`
        animation-name: ${animateBuy};
        animation-duration: 0.3s;
        animation-delay: 0.1s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
    `}

    ${props => props.paid && css`
        background: #ffcc00;
    `}
`
//styling for the big box around the whole item
const Item = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    //animations for name
    
    ${Name} {
        ${props => props.active && props.ready && css`
            animation-name: ${animateTitle};
            animation-duration: 0.3s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-timing-function: linear;
        `}
    }
    //animations for teaser
    ${Teaser} {
        ${props => props.active && props.ready && css`
            animation-name: ${animateTitle};
            animation-duration: 0.3s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-timing-function: linear;
        `}
    }
    //animations for price
    ${Price} {
        ${props => props.active && props.ready && css`
            animation-name: ${animateTitle};
            animation-duration: 0.3s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-timing-function: linear;
        `}
    }
    
`

const Image = styled.div`
    ${props => props.src && css`
        background-image: url(${props.src});
    `}
    padding-left: 500px;
    background-size: auto 360px;
    background-repeat: no-repeat;
    background-position: center 80px;
    width: 100%;
    height: 500px;
`

const animateTitle = keyframes`
    0% {
        transform: translateY(100px);
    }

    100% {
        transform: translateY(-60px);
    }
`

const animateBuy = keyframes`
    0% {
        transform: translateY(80px);
    }

    100% {
        transform: translateY(0);
    }
`

const Items = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: hidden;
    position: relative;
    

    animation-name: ${slide};
    animation-delay: 1s;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    overscroll-behavior: none;
`


const createItem = ({ id, name, teaser, price, image }, active, ready) => (
    <Item key={id} active={active} ready={ready}>
        <Image alt={name} src={`${process.env.PUBLIC_URL}/img${image}`} />
        <Name>{name}</Name>
        <Teaser>{teaser}</Teaser>
        <Price>{price}</Price>
    </Item>
)
//slider function can be imported onto other files
export const Slider = ({ className, items }) => {
    // Because circleci chokes on JS warnings, we have to use this nasty syntax to get around it.
    const [active, , handlers, style] = useCarousel(items.length, -1)
    let history = useHistory();

    const [ready, setReady] = useState(false)
    const [showPayment, setShowPayment] = useState(false)

    const [paid, setPaid] = useState(false)

    const onAnimationEnd = () => {
        if (!ready) setReady(true)
    }

    

    return (
        <Box bgcolor = 'white'

        >
            <Container className={className}>
<<<<<<< HEAD
=======
                
>>>>>>> 130dfb9497b2ed73937528276c387000c0a977bc
                    <Items {...handlers} style={style} length={items.length} onAnimationEnd={onAnimationEnd}>
                        {createItem(items[items.length - 1], false, ready)}
                        {items.map((item, index) => createItem(item, active === index, ready))}
                        {createItem(items[0], false, ready)}
                    </Items>
               
                <Buy ready={ready} onClick={() => history.push("/payments")} paid={paid}>Buy</Buy>
            </Container>
            <Payment show={showPayment} setShow={setShowPayment} setPaid={setPaid} />
            </Box>
    )
}