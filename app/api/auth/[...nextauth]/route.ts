import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';
import { OAuthUserConfig } from 'next-auth/providers';
import { signIn } from 'next-auth/react';

type user = {
    id: "" 
}

type profile = {
    email: "",
    name: '',
    picture: ''
}

type error = {
    message: ''
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        } as OAuthUserConfig<GoogleProfile>)
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({email: session.user?.email });
                (session.user as user).id = sessionUser._id.toString();

            return session;
        },
        async signIn({account, profile, user, credentials }) {
            try {
                await connectToDB();

                const userExists = await User.findOne({ email: profile?.email });

                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
                        image: (profile as profile).picture,
                    })
                }

                return true;
            } catch(error) {
                console.log((error as error).message);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST }