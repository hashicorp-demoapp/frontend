import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useHistory } from "react-router-dom";
import { useCarousel } from '../../hooks/Carousel' //imports useCarousel function
import { Payment } from '../Payment'//imports payment function from payment file

const Container = styled.div` //container for "Buy" button
    position: relative;
    overflow: hidden;
    overscroll-behavior: none;
    text-align: center;
    //gradient background for coffee slider
    background: linear-gradient(45deg, rgb(47,171,206), rgb(137,145,157), rgb(51,170,133), rgb(108,94,197), rgb(41,114,206), rgb(184,60,128));
    background-size: 400% 400%;
    width:100%
    animation: gradient 15s ease infinite;
    
}
//gradient animation for slider
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
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
    font-family: 'Montserrat';
    font-size: 2.5rem;
    letter-spacing: -.01em;
    line-height:1;
    font-weight: bold;
    text-transform: Capitalize;
    text-align: center;
    transform: translateY(200px);
`
//css styling for the teasers
const Teaser = styled.div`
    font-family: Helvetica,Arial,sans-serif;
    font-size: 20px;
    padding-top: 20px;
    font-weight: 400;
    text-transform: Capitalize;
    text-align: center;
    transform: translateY(100px);
`
//css styling for the price
const Price = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-size: 19px;
    line-height: 1
    padding-top: 20px;
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
    background: #000000;
    border-color: #000000;
    color: #ffffff;
    margin: 0px auto 20px auto;
    margin-top:-500px;
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
        transform: translateY(-50px);
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
        <div>
            <Container className={className}>
                    <Items {...handlers} style={style} length={items.length} onAnimationEnd={onAnimationEnd}>
                        {createItem(items[items.length - 1], false, ready)}
                        {items.map((item, index) => createItem(item, active === index, ready))}
                        {createItem(items[0], false, ready)}
                    </Items>
                <Buy ready={ready} onClick={() => history.push("/payments")} paid={paid}>Buy</Buy>
            </Container>
            <Payment show={showPayment} setShow={setShowPayment} setPaid={setPaid} />
            </div>    
    )
}