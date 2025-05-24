import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLocales = ["en", "vi"];
const defaultLocale = "en";
const EXCLUDE_PATHS = [
  /^\/admin/,
  /^\/api/,
  /^\/_next/,
  /^\/static/,
  /^\/favicon.ico/,
  /^\/sitemap.xml/,
];

function getPreferredLocale(request: NextRequest) {
  // Ưu tiên cookie
  const cookie = request.cookies.get("preferred_language")?.value;
  if (cookie && supportedLocales.includes(cookie)) {
    return cookie;
  }

  // Nếu không có, fallback accept-language
  const acceptLang = request.headers.get("accept-language");
  if (!acceptLang) return defaultLocale;

  const langs = acceptLang
    .split(",")
    .map(s => s.split(";")[0].slice(0, 2));
  const found = langs.find(l => supportedLocales.includes(l));
  return found || defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (EXCLUDE_PATHS.some(rx => rx.test(pathname))) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const locale = getPreferredLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
