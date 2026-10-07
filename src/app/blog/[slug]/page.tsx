import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { ArrowLeft, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
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
            avatar {
              url
            }
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
        <Link href="/blog" className="text-primary ml-2 font-semibold">Back to blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-primary/20 selection:text-primary flex flex-col">
      <Navbar />

      <main className="grow pt-32 pb-20 px-4 md:px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-primary truncate max-w-[200px] md:max-w-md">{post.title}</span>
          </div>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight max-w-4xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-slate-100">
                <img 
                  src={post.author?.node?.avatar?.url || "https://ui-avatars.com/api/?name=Team+Cobuild&background=22c55e&color=fff"} 
                  alt={post.author?.node?.name || "Author"} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <span className="text-slate-900 font-semibold">{post.author?.node?.name || "Team Cobuild"}</span>
                <span className="mx-2">•</span>
                {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <div className="w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden mb-16 bg-slate-50">
              <img
                src={post.featuredImage.node.sourceUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Content Column */}
            <article className="lg:col-span-8 w-full">
              <div
                className="prose prose-slate prose-lg md:prose-xl max-w-none 
                  prose-headings:tracking-tight prose-headings:font-bold prose-headings:text-slate-900
                  prose-a:text-primary prose-img:rounded-2xl 
                  text-slate-600 leading-relaxed mb-20"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Comments Section */}
              <Comments comments={post.comments?.nodes || []} postId={post.databaseId} />
            </article>

            {/* Right Sidebar Column */}
            <aside className="lg:col-span-4 w-full space-y-12 sticky top-32">
              
              {/* Latest Post */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Latest Post</h3>
                <div className="space-y-6">
                  {/* Placeholder 1 */}
                  <div className="flex gap-4 items-start group cursor-pointer">
                    <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">Top 3 Fintech Tools for Small Businesses</h4>
                      <p className="text-xs text-slate-400 mt-2 font-medium">Jan 5, 2025</p>
                    </div>
                  </div>
                  {/* Placeholder 2 */}
                  <div className="flex gap-4 items-start group cursor-pointer">
                    <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                      <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=150&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">Digital Wallets: Are They the Future of Payments?</h4>
                      <p className="text-xs text-slate-400 mt-2 font-medium">Jan 5, 2025</p>
                    </div>
                  </div>
                  {/* Placeholder 3 */}
                  <div className="flex gap-4 items-start group cursor-pointer">
                    <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                      <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&q=80" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">5 Ways to Improve Your Financial Habits</h4>
                      <p className="text-xs text-slate-400 mt-2 font-medium">Jan 5, 2025</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {["Fintech", "Finance Tips", "Security", "Budgeting", "Technology"].map(cat => (
                    <span key={cat} className="px-4 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors cursor-pointer bg-white">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Popular Tags</h3>
                <div className="flex flex-col gap-4 text-sm text-slate-500 font-semibold">
                  <span className="hover:text-primary cursor-pointer transition-colors block">#FintechTrends</span>
                  <hr className="border-slate-100" />
                  <span className="hover:text-primary cursor-pointer transition-colors block">#DigitalPayments</span>
                  <hr className="border-slate-100" />
                  <span className="hover:text-primary cursor-pointer transition-colors block">#BudgetTips</span>
                  <hr className="border-slate-100" />
                  <span className="hover:text-primary cursor-pointer transition-colors block">#AIinFinance</span>
                  <hr className="border-slate-100" />
                  <span className="hover:text-primary cursor-pointer transition-colors block">#SecureTransactions</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Social Media</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"><Facebook size={18}/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#E4405F] flex items-center justify-center text-white hover:opacity-90 transition-opacity"><Instagram size={18}/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"><Twitter size={18}/></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-90 transition-opacity"><Linkedin size={18}/></a>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}