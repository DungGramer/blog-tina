import { Inter } from "next/font/google";
import Link from "next/link";
import type { PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

const languages = {
  en: "English",
  vi: "Tiếng Việt",
};

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;

  return (
    <div className={inter.className}>
      <header className='border-b'>
        <nav className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <Link href={`/${locale}`} className='text-xl font-bold'>
            My Blog
          </Link>
          <div className='space-x-4'>
            <Link href={`/${locale}/posts`}>Posts</Link>
            <Link href={`/${locale}/about`}>About</Link>
            <div className='inline-block'>
              {Object.entries(languages).map(([code, name]) => (
                <Link
                  key={code}
                  href={`/${code}`}
                  className={`ml-2 ${locale === code ? "font-bold" : ""}`}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main className='container mx-auto px-4 py-8'>{children}</main>
    </div>
  );
}
