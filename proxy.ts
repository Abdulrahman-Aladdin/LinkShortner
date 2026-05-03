import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are protected
const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, request) => {
  if (isDashboardRoute(request)) {
    auth().then(({ userId }) => {
      if (!userId) {
        return Response.redirect(new URL('/', request.url), 302);
      }
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};