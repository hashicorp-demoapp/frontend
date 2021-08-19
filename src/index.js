// import defaultExport from 'module'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'
// import entire module contents from ./serviceWorker
import * as serviceWorker from './serviceWorker'

// import single export from 'module', in this case initializing ApolloClient
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'

// terminating link which sents GraphQL operation to remote endpoint /api
const httpLink = createHttpLink({
    uri: '/api',
})

// accessing users local store to check if user has a token
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            // returns empty string if no token
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

// setting up server
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    // new cache for user
    cache: new InMemoryCache()
})

// creates app, root variable contains JSX 
const root = (
    // wrapping application so it has access to apollo provider
    <ApolloProvider client={client}>
        <App /> 
    </ApolloProvider>
)

// tells front end library to render jsx by assigning to rood id to html element
ReactDOM.render(root, document.getElementById('root'))
serviceWorker.unregister()
