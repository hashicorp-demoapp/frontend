import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { Header } from '../../components/Header'
import { Slider } from '../../components/Slider'
import {Card, Container} from '@material-ui/core';
import Payment from '../Payment'

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

const Coffees = styled(Slider)`
    position: fixed;
    top: 90px;
    width: 100%;
`



const App = () => {
    const { loading, error, data } = useQuery(QUERY_coffees)

    if (error) return <p>Error :(</p>

    return (
        <>
            <Header loading={loading} />
            {/* {!loading && 
                <Coffees items={ data.coffees} />
            } */}
            <Container style={{paddingTop: "5em"}}>
                <Payment/>
            </Container>
        </>
    )
}

export default App