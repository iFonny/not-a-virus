import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { RoleEnum } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: User;
  }

  interface User {
    id: string;
    role: RoleEnum;
    apiKey: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: RoleEnum;
    apiKey: string;
  }
}
