import React, { useState} from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled, { css, keyframes } from 'styled-components'

import { Header } from '../../components/Header'
import { Slider } from '../../components/Slider'

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
            {!loading && 
                <Coffees items={ data.coffees} />
            }
        </>
    )
}

export default App