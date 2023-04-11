import { gql } from "@apollo/client";

const SEND_RESET_PASSWORD_MUTATION = gql`
mutation SEND_RESET_PASSWORD_MUTATION( $input: SendPasswordResetEmailInput! ) {
    sendPasswordResetEmail(input: $input) {
        success
    }
}
`;

export default SEND_RESET_PASSWORD_MUTATION;