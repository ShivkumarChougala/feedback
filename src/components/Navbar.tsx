'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user : User = session?.user;

  return (
    <nav className="p-4 text-white shadow-md bg-neutral-950 md:p-6">
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
        <a href="#" className="mb-4 text-xl font-bold md:mb-0">
        Anonymous cachè
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user.username || user.email}
            </span>
            <Button onClick={() => signOut()} className="w-full text-black md:w-auto bg-slate-100" variant='outline'>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full text-black md:w-auto bg-slate-100" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
