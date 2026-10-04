import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { ArrowLeft, Calendar, Clock } from "@phosphor-icons/react";
import Link from "next/link";
import Comments from "./Comments";
async function getPost(slug: string) {
  const query = `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        databaseId
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            name
          }
        }
        comments {
          nodes {
            id
            content
            date
            author {
              node {
                name
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch('https://dev-Teamcobuild.pantheonsite.io/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: { id: slug }
    }),
    next: { revalidate: 3600 }
  });

  const json = await res.json();
  return json.data?.post;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Post not found.</p>
        <Link href="/blog" className="text-emerald-600 ml-2">Back to blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="grow pt-32 pb-20 px-4 relative">
        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

        <article className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors mb-12 group"
          >
            <ArrowLeft weight="duotone" size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Engineering Logs
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Calendar weight="duotone" size={16} className="text-emerald-600" />
                {new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'long' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock weight="duotone" size={16} />
                <span>5 min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 bg-slate-50 border border-slate-100">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-slate prose-lg max-w-none 
              prose-headings:tracking-tighter prose-headings:font-bold 
              prose-a:text-emerald-600 prose-img:rounded-2xl 
              text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Comments comments={post.comments?.nodes || []} postId={post.databaseId} />
        </article>
      </main>

      <Footer />
    </div>
  );
}