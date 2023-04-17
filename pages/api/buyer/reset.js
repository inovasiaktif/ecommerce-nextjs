import { setCookie } from 'nookies';
import client from '../../../src/components/ApolloClient';
import { v4 } from 'uuid';
import SEND_RESET_PASSWORD_MUTATION from '../../../src/mutations/send-reset-password';

export default async function login(req, res) {
  const { username } = req.body;

  try {
    const { data } = await client.mutate({
      mutation: SEND_RESET_PASSWORD_MUTATION,
      variables: {
        input: {
            clientMutationId: v4(),
            username: username
        }
    },
      context: { headers: { cookie: req.headers.cookie } },
    });

    // Set the cookie on the server-side
    setCookie({res}, 'accessToken', data.login.authToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      secure: false,
      sameSite: 'strict',
      httpOnly: true
    });

    setCookie({res}, 'refreshToken', data.login.refreshToken, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
      secure: false,
      sameSite: 'strict',
      httpOnly: true
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed' });
  }
}