import { gql } from "@apollo/client";

const REGISTER_INVESTMENT_MUTATION = gql`
mutation REGISTER_INVESTMENT_MUTATION( $input: RegisterInvestmentInput! ) {
  registerInvestment(input: $input) {
    user {
      jwtAuthToken
      jwtRefreshToken
    }
  }
}
`;

export default REGISTER_INVESTMENT_MUTATION;
