import gql from "graphql-tag";

export const POSTS_QUERYS = gql`
  query ($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        description
        brand
        category
        attributes {
          name
          type
          items {
            displayValue
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      brand
      category
      attributes {
        name
        type
        items {
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  {
    categories {
      name
    }
  }
`;
