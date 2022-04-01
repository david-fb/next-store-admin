import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import endPoints from '@services/api';
import axios from 'axios';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const userData = {
          email: credentials.email,
          password: credentials.password,
        };
        try {
          const res = await axios.post(endPoints.auth.login, userData);
          const user = res.data;
          // If no error and we have user data, return it
          if (user) {
            return user;
          }
        } catch (error) {
          // Return null if user data could not be retrieved
          console.log(error.message);
        }
        return null;
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
    maxAge: 15 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  // jtw: {
  //   secret: 'test',
  //   encryption: true,
  // },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user: data }) {
      if (data?.user?.role !== 'admin') return false;
      return true;
    },
    async jwt({ token, user: data }) {
      // Persist the OAuth access_token to the token right after signin
      if (data) {
        token.user = data.user;
        token.accessToken = data.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.token = token.accessToken;
      return session;
    },
  },
});
