import { languages } from "@/lib/i18next.config";
import type { Language } from "@/types/localization";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const revalidate = 300;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Language }>;
}) {
  const { locale } = await params;

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm'>
        <h1 className='text-4xl font-bold mb-8'>
          {locale === "en"
            ? "Welcome to Blog Tina"
            : "Chào mừng đến với Blog Tina"}
        </h1>
        <LanguageSwitcher currentLocale={locale} languages={languages} />
      </div>
    </main>
  );
}
