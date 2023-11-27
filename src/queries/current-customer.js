import { gql } from "@apollo/client";

const CURRENT_CUSTOMER_QUERY = gql`query {
    customer {
      displayName
      firstName
      role
    }
}`;

export default CURRENT_CUSTOMER_QUERY;
