'use client';
import { SignInButton, SignUpButton, Show, UserButton, useAuth } from '@clerk/nextjs'

export function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <a href="/" className='text-xl font-bold'>Link Shortener</a>
      <div className='flex gap-4'>
        {!isSignedIn ? (
          <>
            <SignInButton mode='modal'>
              <button className="font-medium text-sm sm:text-base h-10 sm:h-12 px-2 sm:px-4 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-2 sm:px-4 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </>
        ) : (
          <UserButton />
        )}
      </div>
    </header>
  )
}
