'use client';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export function Header() {
  const { isSignedIn } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16">
      <a href="/" className='text-xl font-bold'>Link Shortener</a>
      <div className='flex gap-4'>
        {!isSignedIn ? (
          <>
            <SignInButton mode='modal'>
              <Button variant="outline">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode='modal'>
              <Button>
                Sign Up
              </Button>
            </SignUpButton>
          </>
        ) : (
          <UserButton />
        )}
      </div>
    </header>
  )
}
