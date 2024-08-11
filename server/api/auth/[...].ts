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
    // @ts-expect-error Use .default here for it to work during SSR.
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        turnstile_token: { label: "Turnstile Token", type: "text" },
        type: { label: "Type", type: "text" },
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials : any) {
        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }
          const response = await fetch(`${useRuntimeConfig().apiBase}/auth/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" , "Turnstile-Token": credentials.turnstile_token},
            body: JSON.stringify({
              type: credentials.type,
              username: credentials.username,
              password: credentials.password
            })
          });
          if (response.status == 200) {
            const data = await response.json();
            return {
              sessionToken: data.login_token
            };
          } else {
            const data = await response.json();
            // console.error('Authentication failed:', data);
            throw new Error(data.message);
          }
      }
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    CredentialsProvider.default({
      id: 'register',
      name: 'register',
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
        otp_code: { label: "OTP Code", type: "text" }
      },
      async authorize(credentials : any) {
        if (!credentials) {
          console.error('No credentials provided');
          return null;
        }

          const response = await fetch(`${useRuntimeConfig().apiBase}/auth/register/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
              otp: credentials.otp,
              otp_code: credentials.otp_code
            })
          });
          if (response.status == 200) {
            const data = await response.json();
            console.log('Register successful:', data);
            return {
              sessionToken: data.login_token
            };
          } else {
            const data = await response.json();
            console.error('Authentication failed:', data);
            throw new Error(data.message);
          }
      }
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // @ts-expect-error Use .default here for it to work during SSR.
    AzureADProvider.default({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    })
  ],
  callbacks: {
    async jwt({ token, user , account } : { token: any, user: any, account: any }) {
      if (account) {
        if (account.provider === 'credentials' || account.provider === 'register') {
          if (user) {
            token.sessionToken = user.sessionToken;
          }
        }else {
          const provider:string = account.provider.toLowerCase();
          const data_session = await fetch(`${useRuntimeConfig().apiBase}/auth/oauth/login`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ provider: provider.toLowerCase(), provider_token: account.access_token})
          });
          if (data_session.status >= 200 && data_session.status < 300) {
            const data = await data_session.json();
            // console.log('OAuth login successful:', data);
            token.sessionToken = data.login_token;
          }
        }
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
          // console.log('Session fetch successful:', data);
          return data;
        } else {
          console.error('Session fetch failed:', data_session.statusText);
          return null;
        }
      } catch (error) {
        console.error('Error during session fetch:', error);
        return session;
      }
    }
  },
});
