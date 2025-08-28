import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/organizations(.*)",
  "/select-org",
  "/board(.*)",
]);
const isPublicRoute = createRouteMatcher(["/", "/signup", "/login"]);

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, orgId } = await auth();

    if (!userId && isProtectedRoute(req)) {
      return NextResponse.redirect(new URL("/signup", req.url));
    }

    if (userId && isPublicRoute(req)) {
      return NextResponse.redirect(new URL("/select-org", req.url));
    }

    if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
      return NextResponse.redirect(new URL("/select-org", req.url));
    }
  },
  {
    authorizedParties: ["https://boardzy.dpdns.org"],
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
