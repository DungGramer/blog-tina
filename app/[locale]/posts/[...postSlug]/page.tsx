import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import PostClientPage from "./client-page";

export const revalidate = 300;

export default async function PostPage({
  params,
}: {
  params: Promise<{ postSlug: string[]; locale: string }>;
}) {
  const { locale, postSlug } = await params;
  const fileName = `${postSlug.join("/")}/${locale}.mdx`;
  const data = await client.queries.post({ relativePath: fileName });

  return (
    <Layout rawPageData={data}>
      <PostClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let posts = await client.queries.postConnection();
  const allPosts = posts;

  if (!allPosts.data.postConnection.edges) {
    return [];
  }

  while (posts.data?.postConnection.pageInfo.hasNextPage) {
    posts = await client.queries.postConnection({
      after: posts.data.postConnection.pageInfo.endCursor,
    });

    if (!posts.data.postConnection.edges) {
      break;
    }

    allPosts.data.postConnection.edges.push(...posts.data.postConnection.edges);
  }

  const params =
    allPosts.data?.postConnection.edges.map((edge) => {
      const [slug, locale] = edge!.node!._sys.breadcrumbs;

      return { postSlug: [slug], locale };
    }) || [];

  return params;
}
