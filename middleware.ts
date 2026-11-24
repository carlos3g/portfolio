import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Prefixed OG/Twitter image URLs must be served as is, not redirected.
  matcher: [
    "/((?!api|_next|_vercel|apple-icon|(?:pt|en)/(?:opengraph|twitter)-image|.*\\..*).*)",
  ],
};
