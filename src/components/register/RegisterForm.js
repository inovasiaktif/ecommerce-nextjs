import { useMutation } from '@apollo/client';
import { v4 } from 'uuid';
import REGISTER_USER_MUTATION from '../../mutations/register-user';
import { isEmpty } from 'lodash'
import { useState } from 'react';

const RegisterForm = () => {

    const [requestError, setRequestError] = useState(null);

    const [register, { data: clearCartRes, loading: clearCartProcessing, error: clearCartError }] = useMutation(REGISTER_USER_MUTATION, {
        onCompleted: () => {
            refetch();
        },
        onError: (error) => {
            if (error) {
                const errorMessage = !isEmpty(error?.graphQLErrors?.[0]) ? error.graphQLErrors[0]?.message : '';
                setRequestError(errorMessage);
            }
        }
    });

    console.log(requestError)

    /*
     * Handle form submit.
     *
     * @param {Object} event Event Object.
     *
     * @return {void}
     */
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        register({
            variables: {
                input: {
                    clientMutationId: v4(),
                    username: event.target.username.value,
                    password: event.target.password.value,
                    email: event.target.email.value
                }
            },
        });
    }

    return (
        <>
            <form onSubmit={handleFormSubmit} className="woo-next-checkout-form">
                <div>
                    <div>Username</div>
                    <input type="text" name="username" />
                </div>
                <div>
                    <div>Email</div>
                    <input type="text" name="email" />
                </div>
                <div>
                    <div>Password</div>
                    <input type="text" name="password" />
                </div>
                <div>
                    <button type="submit">Daftar</button>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
