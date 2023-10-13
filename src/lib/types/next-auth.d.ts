import NextAuth from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */

    interface User {
        /** The user's postal address. */
        username: string;
    }
    interface Session {
        user: User & {
            /** The user's postal address. */
            username: string;
        };
    }
    interface token {
        username: string;
    }
}
