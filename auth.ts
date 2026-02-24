import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        // call api sign in
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payload = await response.json();
        console.log(payload);

        // لازم ترجع user object أو null
        if(payload.message=="success"){
            const decoded : {id:string} = jwtDecode(payload.token) 
            return {
                id: decoded.id,
                user: payload.user,
                token: payload.token
            }
        }
        else {
            throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
       async jwt({ token, user}) {
          if(user){
         token.user=user.user;
        token.token=user.token;
          }
      return token
    },
    async session({ session, token }) {
      session.user = token.user;
      // session.token = token.token;
      return session
    },
  }
};
