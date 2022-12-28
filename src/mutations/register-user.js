import { gql } from "@apollo/client";

const REGISTER_USER_MUTATION = gql`
mutation REGISTER_USER_MUTATION( $input: RegisterUserInput! ) {
  registerUser(input: $input) {
    user {
      jwtAuthToken
      jwtRefreshToken
    }
  }
}
`;

export default REGISTER_USER_MUTATION;
