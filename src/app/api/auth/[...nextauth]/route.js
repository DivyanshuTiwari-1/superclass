import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
    // Configure the Google provider
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        }),
    ],

    // Enable JWT sessions
    session: {
        jwt: true,
    },



    // Callbacks for handling JWT and session data
    callbacks: {
        // This callback is called whenever a new JWT token is created
        async jwt({ token, user, account }) {
            // If it's the first sign in, store the user's name and email in the token
            if (user) {
                console.log("User:", user);
                token.name = user.name;
                token.email = user.email;
                token.accesstoken = account.access_token;
            }
            return token;
        },

        // This callback is called whenever a session is checked
        async session({ session, token }) {
            // Send user name and email to the session
            session.accesstoken = token.accesstoken;
            session.user.name = token.name;
            session.user.email = token.email;
            return session;
        },

        secret: process.env.NEXTAUTH_URL
    },
});

export { handler as GET, handler as POST,handler as authOptions }