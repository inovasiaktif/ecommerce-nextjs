import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { setContext } from "apollo-link-context";
import { parseCookies } from "nookies";
import { setContext } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client/link/http";
import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';
import { useRouter } from "next/router";

export const withApolloClient = (handler) => async (context) => {
  // const router = useRouter();

  const cookies = parseCookies(context);
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const decodedToken = jwtDecode(accessToken);
  const tokenExpired = Date.now() >= decodedToken.exp * 1000;

  if (tokenExpired) {
    const response = await fetch('/api/auth/refreshToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    // If response is not OK, set error message
    if (!response.ok) {
      // const { message } = await response.json();
      console.log(await response.json())
      // return;
    }
  }

  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    fetch
  });
  
  const authLink = setContext((_, { headers }) => {
    if (accessToken && refreshToken) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${accessToken}`,
        },
      };
    } else if (refreshToken) {
      console.log('REFRESH DONG')
      // Token is expired, refresh it
      // Implement your refresh logic here
    } else {
      console.log('LOGIN DONG')
      // window.location.href('/login');
    }
  });

  const apolloClient = new ApolloClient({
    // ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    onError: (error) => {
      const { graphQLErrors, networkError } = error;
  
      if (networkError && networkError.statusCode === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
  
      if (graphQLErrors) {
        graphQLErrors.forEach(({ extensions }) => {
          if (extensions && extensions.code === 'UNAUTHENTICATED') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        });
      }
    },
  });

  context.apolloClient = apolloClient;

  const props = await handler(context);

  return props;
}