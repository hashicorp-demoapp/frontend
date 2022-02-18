import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let publicApiUrl = "http://localhost:8080"

if (process.env.NEXT_PUBLIC_PUBLIC_API_URL) {
  publicApiUrl = process.env.NEXT_PUBLIC_PUBLIC_API_URL
}

const httpLink = createHttpLink({
  uri: `${publicApiUrl}/api`,
})

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('token'))
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

const queryFetcher = async (q) => {
  let queryBody = { query: q.query }

  if (q.fetchPolicy) queryBody["fetchPolicy"] = q.fetchPolicy

  return await client.query(queryBody);
}
const queryVarFetcher = async (q) => {
  let queryBody = {
    query: q.query,
    variables: q.variables
  }

  if (q.fetchPolicy) queryBody["fetchPolicy"] = q.fetchPolicy

  return await client.query(queryBody)
};
const mutationFetcher = async (q) => {
  let mutationBody = {
    mutation: q.mutation,
    variables: q.variables
  }

  if (q.fetchPolicy) mutationBody["fetchPolicy"] = q.fetchPolicy

  return await client.mutate(mutationBody)
};

export {
  client,
  queryFetcher,
  queryVarFetcher,
  mutationFetcher
};
