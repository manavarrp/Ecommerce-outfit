"use server";

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    //await sleep(1);
    await signIn('credentials',formData );

    return 'Success';
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {
       case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
         return 'Uknown error.';
     }
    }
    throw error;
  }
}


export const login = async(email: string, password: string) => {

  try {
    
    const user = await signIn('credentials', {
      email,
      password,
    })
    return {
      ok: true,
      message: 'Login exitoso',
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'No se pudó iniciar sesión',
    }
  }

}