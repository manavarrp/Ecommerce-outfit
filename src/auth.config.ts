import  NextAuth, {type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
 
export const authConfig : NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },

  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
     
    //   const isLoggedIn = !!auth?.user;
    //   const isOnCheckout = nextUrl.pathname.startsWith('/checkout');
    //   if (isOnCheckout) {
    //     if (isLoggedIn) return true;
    //     return Response.redirect(new URL('/auth/login?redirectTo=/checkout/address', nextUrl));; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL('/checkout', nextUrl));
    //   }
    //   return true; 
    // },
    jwt({token, user}) {
      if(user) {
        token.data = user
      }
      //console.log({token, user})
      return token
    },
    session({session, token, user}) {
      session.user = token.data as any
      return session
    }
  },
  providers: [
    Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);

            if (!parsedCredentials.success) return null

            const { email, password } = parsedCredentials.data

            console.log(email, password)

            //buscar correo y password
            const user = await prisma.user.findFirst({ where: { email: email.toLowerCase() } })

            if (!user) return null
            
            //compara las contaraseñas
            if(!bcryptjs.compareSync(password, user.password)) return null

            //retorna el usuario
            const { password: _, ...userWithoutPassword } = user
     

            return userWithoutPassword
        },
      }),
  ],
};

export const { signIn, signOut, auth, handlers} = NextAuth(authConfig)