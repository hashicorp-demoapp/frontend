import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const QUERY_coffees = gql`
{
    coffees {
        id
        name
        price
    }
}
`

function App() {
    const { loading, error, data } = useQuery(QUERY_coffees)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return data.coffees.map(({ id, name, price }) => (
    <div key={id}>
        <span>{name}</span>
        <span>{price}</span>
    </div>
    ))
}

export default App