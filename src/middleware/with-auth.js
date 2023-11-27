import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { parseCookies, setCookie } from "nookies";
import { HttpLink } from "@apollo/client/link/http";
import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';
import { TokenRefreshLink } from "apollo-link-token-refresh";

export const withApolloClient = (handler) => async (context) => {
  const cookies = parseCookies(context);
  let currentAccessToken = cookies.accessToken ?? '';
  const refreshToken = cookies.refreshToken ?? '';

  context.isLoggedIn = true;

  if (!currentAccessToken || !refreshToken) {
    context.isLoggedIn = false;
  }

  const tokenExpired = () => {
    if (!currentAccessToken) {
      return false;
    }
    try {
      const { exp } = jwtDecode(currentAccessToken);
      if (Date.now() >= exp * 1000) {
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    fetch
  });
  
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: currentAccessToken ? `Bearer ${currentAccessToken}` : '',
      },
    }));

    return forward(operation);
  });

  const fetchAccessToken = async () => {
    const res = await fetch('http://localhost:3000/api/auth/refresh-token', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    return await res.json();
  };

  const tokenRefreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      return tokenExpired();
    },
    fetchAccessToken,
    handleResponse: (operation, accessTokenField) => (response) => {
      if (!response) return { accessToken: null };

      return { accessToken: response.accessToken };
    },
    handleFetch: (accessToken) => {
      currentAccessToken = accessToken;
      
      // Set the cookie on the server-side
      setCookie(context, 'accessToken', accessToken, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        secure: false,
        sameSite: 'strict',
        httpOnly: true
      });
    },
    handleError: (err) => {
      context.isLoggedIn = false;
    },
  });

  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([tokenRefreshLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    onError: (error) => {
      const { graphQLErrors, networkError } = error;
  
      // if (networkError && networkError.statusCode === 401) {
      // }
  
      // if (graphQLErrors) {
      //   graphQLErrors.forEach(({ extensions }) => {
      //     if (extensions && extensions.code === 'UNAUTHENTICATED') {
      //     }
      //   });
      // }
    },
  });

  context.apolloClient = apolloClient;

  const props = await handler(context);

  return props;
}