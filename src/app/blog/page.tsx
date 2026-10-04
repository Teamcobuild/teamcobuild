import React from "react";
import Navbar from "../../components/Navbar";
import { getAllPosts } from "@/lib/wordpress";
import Footer from "../../components/Footer";
import { PenNib, BookOpen, ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";

async function getPosts() {
  const query = `
    query GetAllPosts {
      posts {
        nodes {
          title
          slug
          date
          excerpt
          featuredImage {
            node { sourceUrl }
          }
        }
      }
    }
  `;

  const res = await fetch('https://dev-Teamcobuild.pantheonsite.io/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  const json = await res.json();
  return json.data?.posts?.nodes || [];
}

export default async function BlogPage() {
  const posts = await getPosts();
  const hasPosts = posts.length > 0;

  return (
    <div className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900 flex flex-col">
      <Navbar />

      <main className="grow flex flex-col items-center pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Grid */}
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald-500 opacity-5 blur-[120px]" />
        </div>

        {!hasPosts ? (
          /* COMING SOON STATE (Your Original UI) */
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-8 md:p-16 text-center relative shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium mb-8">
              <PenNib weight="duotone" size={12} className="text-emerald-600" />
              <span>Editorial in Progress</span>
            </div>
            <h1 className="text-3xl tracking-tighter md:text-5xl font-bold text-slate-900 mb-4">Words are loading...</h1>
            <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto">
              We are documenting our process of building Team CoBuild. Engineering logs and culture notes coming soon.
            </p>
          </div>
        ) : (
          /* ACTIVE BLOG LIST */
          <div className="w-full max-w-5xl">
            <header className="mb-16 text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-4">Engineering Logs</h1>
              <p className="text-slate-500">Documenting the build, the bugs, and the breakthroughs.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post: any) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 h-full flex flex-col">
                    {post.featuredImage?.node?.sourceUrl && (
                      <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 bg-slate-50">
                        <img
                          src={post.featuredImage.node.sourceUrl}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          alt={post.title}
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <p className="text-xs font-mono text-emerald-600 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                      <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">{post.title}</h2>
                      <div
                        className="text-slate-500 line-clamp-2 text-sm mb-6"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:gap-4 transition-all">
                      Read Entry <ArrowRight weight="duotone" size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}