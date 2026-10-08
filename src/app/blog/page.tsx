// "use client"
import React from "react";
import Navbar from "../../components/Navbar";
import { getAllPosts } from "@/lib/wordpress";
import Footer from "../../components/Footer";
import { PenNib, BookOpen, ArrowRight } from "@phosphor-icons/react/dist/ssr";
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
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              name
            }
          }
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
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />

      <main className="grow flex flex-col items-center pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Grid
        <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        </div> */}

        {!hasPosts ? (
          /* COMING SOON STATE (Your Original UI) */
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-8 md:p-16 text-center relative shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium mb-8">
              <PenNib size={12} className="text-primary" weight="fill" />
              <span>Editorial in Progress</span>
            </div>
            <h1 className="text-3xl tracking-tighter md:text-5xl font-bold text-slate-900 mb-4">Words are loading...</h1>
            <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto">
              We are documenting our process of building Team CoBuild. Engineering logs and culture notes coming soon.
            </p>
          </div>
        ) : (
          /* ACTIVE BLOG LIST */
          <div className="w-full max-w-6xl">
            <header className="mb-16 text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-4">Our Journal</h1>
              <p className="text-slate-500 text-lg">Insights, engineering logs, and stories from Teamcobuild.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post: any) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="group relative block w-full h-[400px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Background Image */}
                  <div className="absolute inset-0 bg-slate-900">
                    <img
                      src={post.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={post.title}
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <div
                      className="text-white/80 line-clamp-2 text-sm md:text-base mb-6 font-medium"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />

                    {/* Meta Row */}
                    <div className="flex items-center justify-between">
                      {/* Author & Date */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white/20">
                          <img
                            src={post.author?.node?.avatar?.url || "https://ui-avatars.com/api/?name=Team+Cobuild&background=22c55e&color=fff"}
                            alt={post.author?.node?.name || "Author"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-sm font-medium text-white/90">
                          {post.author?.node?.name || "Team Cobuild"} <span className="mx-1">•</span> {new Date(post.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>

                      {/* Category Pill */}
                      <div className="bg-white px-4 py-2 rounded-full text-xs font-extrabold text-slate-800 shadow-sm tracking-wide">
                        {post.categories?.nodes?.[0]?.name || "Article"}
                      </div>
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