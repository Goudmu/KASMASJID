import { User2 } from "@/lib/mongodb/models";
import CredentialProvider from "next-auth/providers/credentials";

// JWT TOKEN
const jwt = require("jsonwebtoken");

export const options = {
  providers: [
    CredentialProvider({
      name: "Credential",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your password",
        },
        username: {
          label: "username:",
          type: "text",
          placeholder: "your username",
        },
        isAdmin: {
          label: "is Admin :",
          type: "text",
          placeholder: "is Admin ?",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User2.findOne({
            username: credentials?.username,
          });
          if (foundUser) {
            delete foundUser.password;

            // Convert foundUser to a plain JavaScript object
            const userPayload = foundUser.toObject();

            const token = jwt.sign(
              userPayload,
              process.env.JWT_SECRET as string,
              {
                expiresIn: "24h", // Example expiration time
              }
            );
            foundUser.jwt = token;
            return foundUser;
          }
        } catch (error: any) {
          console.log(error);
          throw new Error(error);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session?.user) {
        // Access the JWT token from the user object
        const jwtToken = session.user.jwt;

        // Use the JWT token as needed
        console.log("JWT Token:", jwtToken);
      }
      return session;
    },
    async redirect() {
      // Customize the URL to which the user is redirected after login
      return "/dashboard?id=660bb772285c3316e6c93e8d"; // Redirect to the dashboard page after login
    },
  },
};
