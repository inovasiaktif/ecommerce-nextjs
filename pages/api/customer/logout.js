import { destroyCookie } from "nookies";

export default function handler(req, res) {
  try {
    destroyCookie({ res }, 'accessToken', {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    destroyCookie({ res }, 'refreshToken', {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout failed:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
}