import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import AzureADProvider from "next-auth/providers/azure-ad"
import CredentialsProvider from 'next-auth/providers/credentials'

export default NuxtAuthHandler({
  secret: 'your-secret-here',
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        type: { label: "Type", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials : any) {
        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }
        try {
          const response = await fetch(`${useRuntimeConfig().apiBase}/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: credentials.type,
              username: credentials.username,
              password: credentials.password
            })
          });
          if (response.status == 200) {
            const data = await response.json();
            return {
              name: data.name,
              email: data.email,
              image: data.image,
              sessionToken: data.login_token
            };
          } else {
            console.error('Authentication failed:', response.statusText);
            return null;
          }
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      }
    }),
    GithubProvider.default({
      clientId: useRuntimeConfig().oauth.github.clientId,
      clientSecret: useRuntimeConfig().oauth.github.clientSecret,
    }),
    GoogleProvider.default({
      clientId: useRuntimeConfig().oauth.google.clientId,
      clientSecret: useRuntimeConfig().oauth.google.clientSecret,
    }),
    FacebookProvider.default({
      clientId: useRuntimeConfig().oauth.facebook.clientId,
      clientSecret: useRuntimeConfig().oauth.facebook.clientSecret,
    }),
    AzureADProvider.default({
      clientId: useRuntimeConfig().oauth.azureAD.clientId,
      clientSecret: useRuntimeConfig().oauth.azureAD.clientSecret,
      tenantId: useRuntimeConfig().oauth.azureAD.tenantId,
    })
  ],
  callbacks: {
    async jwt({ token, user , account } : { token: any, user: any, account: any }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.sessionToken = user.sessionToken;
        token.provider = account.provider;

        console.log('provider iss : ', account.provider);
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any}) {
      try {
        const data_session = await fetch(`${useRuntimeConfig().apiBase}/auth/session`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.sessionToken}`
          }
        });


        if (data_session.status >= 200 && data_session.status < 300) {
          const data = await data_session.json();
          console.log('Session fetch successful:', data);
          return data;
        } else {
          console.error('Session fetch failed:', data_session.statusText);
          return session;
        }
      } catch (error) {
        console.error('Error during session fetch:', error);
        return session;
      }
    }
  },
});
