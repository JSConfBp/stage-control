import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ profile }) {
      const admins = JSON.parse(process.env.ADMINS)

      if (profile && profile.login && admins.includes(profile.login)) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },/*
     async jwt({ token, account, profile }) {
      if (profile && profile.login) {
        token.login = profile.login
      }
      return token;
    },
    async session({ session, token }) {

      return session;
    }, */
  }
}

export default NextAuth(authOptions)
