import { gql } from "@apollo/client";

const LOGIN_CUSTOMER_MUTATION = gql`
mutation LOGIN_CUSTOMER_MUTATION( $input: LoginInput! ) {
  login(input: $input) {
    authToken
    refreshToken
  }
}
`;

export default LOGIN_CUSTOMER_MUTATION;
