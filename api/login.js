import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests allowed' });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const apiKey = process.env.AIzaSyAk6-ojS17WvRyCn-4mqQgOxRtk6aa1hAc; // Your Firebase web API key

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // If login successful, you can send back token or user info
    res.status(200).json({ 
      message: 'Login successful',
      token: data.idToken,
      refreshToken: data.refreshToken,
      uid: data.localId
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
