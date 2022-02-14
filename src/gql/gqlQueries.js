import gql from 'graphql-tag';

const ALL_COFFEES_QUERY = gql`
  query GetCoffees {

    coffees {
      id
      name
      image
    }
  }
`

const COFFEE_QUERY = gql`
  query GetCoffee($coffeeID: String!) {
    coffee(id: $coffeeID) {
      id
      name
      image
      teaser
      collection
      origin
      color
    }
  }
`;

const COFFEE_IMG_QUERY = gql`
  query GetCoffee($coffeeID: String!) {
    coffee(id: $coffeeID) {
      image
    }
  }
`;

const COFFEE_INGREDIENTS_QUERY = gql`
  query GetCoffeeIngredients($coffeeID: String!) {
    coffeeIngredients(coffeeID: $coffeeID) {
      unit
      quantity
      name
    }
  }
`;


export {
  ALL_COFFEES_QUERY,
  COFFEE_QUERY,
  COFFEE_IMG_QUERY,
  COFFEE_INGREDIENTS_QUERY
};
