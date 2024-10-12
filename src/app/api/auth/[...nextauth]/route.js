import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Define the auth options
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.accesstoken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accesstoken = token.accesstoken;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET
};

// Export the handler for NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
