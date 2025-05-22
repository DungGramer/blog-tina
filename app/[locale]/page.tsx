import { languages } from "@/lib/i18next.config";

export const revalidate = 300;

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ locale: "en" | "vi" }>;
}>) {
  const { locale } = await params;
  console.log(`📕 lang - 11:page.tsx \n`, locale);

  /* const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <PostClientPage {...data} />
    </Layout>
  ); */

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm'>
        <h1 className='text-4xl font-bold mb-8'>
          {locale === "en"
            ? "Welcome to Blog Tina"
            : "Chào mừng đến với Blog Tina"}
        </h1>
        <div className='flex gap-4'>
          {languages.map((language) => (
            <a
              key={language}
              href={`/${language}`}
              className={`px-4 py-2 rounded ${
                language === locale
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {language.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
