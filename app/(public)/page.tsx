import Link from "next/link";

// Mock data for demonstration
const featuredPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js",
    slug: "getting-started-with-nextjs",
  },
  {
    id: 2,
    title: "Understanding React Hooks",
    excerpt: "A comprehensive guide to React Hooks",
    slug: "understanding-react-hooks",
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className='space-y-8'>
      <section className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>
          {locale === "vi"
            ? "Chào mừng đến với Blog của tôi"
            : "Welcome to My Blog"}
        </h1>
        <p className='text-xl text-gray-600'>
          {locale === "vi"
            ? "Nơi chia sẻ kiến thức về lập trình và công nghệ"
            : "A place to share programming and technology knowledge"}
        </p>
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4'>
          {locale === "vi" ? "Bài viết nổi bật" : "Featured Posts"}
        </h2>
        <div className='grid gap-6 md:grid-cols-2'>
          {featuredPosts.map((post) => (
            <article key={post.id} className='border rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-2'>
                <Link href={`/${locale}/posts/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className='text-gray-600'>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
