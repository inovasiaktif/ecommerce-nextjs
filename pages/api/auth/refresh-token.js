import { parseCookies, setCookie } from 'nookies';
import client from '../../../src/components/ApolloClient';
import { v4 } from 'uuid';
import REFRESH_TOKEN_MUTATION from '../../../src/mutations/refresh-token';

export default async function refreshToken(req, res) {
  // const cookies = parseCookies({req});
  // const refreshToken = cookies.refreshToken?? '';

  // console.log(cookies)
  const { refreshToken } = req.body;

  try {
    const { data } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: {
        input: {
            clientMutationId: v4(),
            jwtRefreshToken: refreshToken ?? ''
        }
    },
      context: { headers: { cookie: req.headers.cookie } },
    });

    // Set the cookie on the server-side
    // setCookie({res}, 'accessToken', data.refreshJwtAuthToken.authToken, {
    //   maxAge: 30 * 24 * 60 * 60,
    //   path: '/',
    //   secure: false,
    //   sameSite: 'strict',
    //   httpOnly: true
    // });

    res.status(200).json({ accessToken: data?.refreshJwtAuthToken?.authToken });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
}