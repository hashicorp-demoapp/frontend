import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {Carousel} from "./components/Carousel"
import styled, { css } from 'styled-components'

import { Header } from './components/Header'
import { Fingerprint } from './components/Fingerprint'
import { Footer } from './components/Footer'

const QUERY_coffees = gql`
{
    coffees {
        id
        name
        image
        price
    }
}
`

const Coffees = styled.div`
    width: 1280px;
    margin: 100px auto 0 auto;
`

const Coffee = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
`

const Left = styled.div`
    width: 40%;
`

const Image = styled.div`
    ${props => props.src && css`
        background-image: url(${props.src});
    `}
    background-size: cover;
    width: 400px;
    height: 581px;
`

const Right = styled.div`
    width: 60%;
`

const Title = styled.h1`
    font-family: 'Montserrat', sans-serif;
    font-size: 96px;
    font-weight: 900;
    text-transform: uppercase;
    color: #ffffff;
    margin: 0;
    padding: 0;
`

const Subtitle = styled.h2`
    font-family: 'Montserrat', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 40px 0;
    padding: 0;
`

const Details = styled.div`
    color: #ffffff;
    max-width: 600px;
`

const Tabs = styled.ul`
    display: flex;
    flex-direction: row;
    list-style: none;
    margin: 0 0 30px 0;
    padding: 0;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    box-sizing: border-box;
`

const Tab = styled.li`
    padding: 10px 30px 10px 10px;
    color: rgba(255, 255, 255, 0.3);
    
    ${props => props.active && css`
        box-shadow: 0 4px 0px -2px #4482ff;
        color: #ffffff;
    `}
`

const Button = styled.button``

const Buy = styled.div`
    margin-top: 100px;

    button:first-of-type {
        --space-grid-gap: 32px;
        --space-card-padding: 32px;
        --space-independent-content: 72px;
        --space-block-padding: 128px;
        --space-section1-intro: 32px;
        --space-display1-intro: 32px;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -webkit-box-direction: normal;
        box-sizing: border-box;
        text-decoration: none;
        font-family: 'metro-web', 'Metro', -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
            sans-serif;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.5em;
        border: 1px solid;
        border-radius: 50px;
        display: inline-block;
        padding: 11px 24px;
        text-align: center;
        transition: background 0.3s, border 0.3s, transform 0.3s, -webkit-transform 0.3s;
        width: auto;
        background: #1563ff;
        border-color: #1563ff;
        color: #ffffff;
    }

    button {
        --space-grid-gap: 32px;
        --space-card-padding: 32px;
        --space-independent-content: 72px;
        --space-block-padding: 128px;
        --space-section1-intro: 32px;
        --space-display1-intro: 32px;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -webkit-box-direction: normal;
        box-sizing: border-box;
        background-color: transparent;
        text-decoration: none;
        color: #ffffff;
        font-family: 'metro-web', 'Metro', -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
            sans-serif;
        font-weight: 600;
        font-size: 1rem;
        line-height: 1.5em;
        border: 1px solid;
        border-radius: 50px;
        display: inline-block;
        padding: 11px 24px;
        text-align: center;
        transition: background 0.3s, border 0.3s, transform 0.3s, -webkit-transform 0.3s;
        width: auto;
        margin: 0 16px 0 0;
        border-color: rgba(255, 255, 255, 0.2);
    }
`

const Content = styled.div``


function App() {
    const { loading, error, data } = useQuery(QUERY_coffees)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    const sliderConfig = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const slides = data.coffees.map(({ id, name, image, price }) => (
        <Coffee key={id}>
            <Left>
                <Image src={process.env.PUBLIC_URL + "/img/" + image + ".png"} />
            </Left>
            <Right>
                <Title>{name}</Title>
                <Subtitle>Seriously deliciously.</Subtitle>
                <Details>
                    <Tabs>
                        <Tab active={true}>Description</Tab>
                        <Tab>Ingredients</Tab>
                    </Tabs>
                    <Content>
                        Something something delicoulsly with typoes and everything! Yum as my mum used to say, coffee is like a bucket of chocolates.
                    </Content>
                    <Buy>
                        <Button>Contact Sales</Button>
                        <Button>Request a </Button>
                    </Buy>
                    <Fingerprint />
                </Details>
            </Right>
        </Coffee>
    ))

    return (
        <>
            <Header />
            <Coffees>
                <Carousel interval={10000}>
                    {slides}
                </Carousel>
            </Coffees>
            <Footer />
        </>
    )
}

export default App