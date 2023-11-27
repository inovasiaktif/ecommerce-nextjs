import { gql } from "@apollo/client";

const RESET_PASSWORD_MUTATION = gql`
mutation RESET_PASSWORD_MUTATION( $input: ResetUserPasswordInput! ) {
    resetUserPassword(input: $input) {
        user {
            displayName
        }
    }
}
`;

export default RESET_PASSWORD_MUTATION;