import { gql } from "@apollo/client";

const REFRESH_TOKEN_MUTATION = gql`
mutation REFRESH_TOKEN_MUTATION( $input: RefreshJwtAuthTokenInput! ) {
    refreshJwtAuthToken(input: $input) {
        authToken
    }
}
`;

export default REFRESH_TOKEN_MUTATION;
