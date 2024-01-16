import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export const config = {
//   // Skip all internal paths (_next)
//   matcher: [
//   "/(en-US|fr|nl-NL)?/((?!.+\\.[\\w]+$|_next).*)",
//   "/(en-US|fr|nl-NL)?/",
//   "/(en-US|fr|nl-NL)?/(api|trpc)(.*)",
//   ],
//   };