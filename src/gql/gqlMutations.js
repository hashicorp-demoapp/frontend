import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(auth:{
      username: $username
      password: $password
    }) {
      userId
      username
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LogIn($username: String!, $password: String!) {
    login(auth:{
      username: $username
      password: $password
    }) {
      userId
      username
      token
    }
  }
`

const SIGNOUT_MUTATION = gql`
  mutation SignOut {
    signOut
  }
`

export {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
  SIGNOUT_MUTATION
};
