"use client";

import React, { useState } from "react";
import { User, Clock, SpinnerGap, ChatTeardrop } from "@phosphor-icons/react";
import { motion } from "framer-motion";

interface CommentNode {
  id: string;
  content: string;
  date: string;
  author: {
    node: {
      name: string;
    };
  };
}

interface CommentsProps {
  comments: CommentNode[];
  postId: number;
}

export default function Comments({ comments, postId }: CommentsProps) {
  const [formData, setFormData] = useState({ name: "", email: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("https://dev-Teamcobuild.pantheonsite.io/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateComment($input: CreateCommentInput!) {
              createComment(input: $input) {
                success
                comment {
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
          `,
          variables: {
            input: {
              commentOn: postId,
              content: formData.comment,
              author: formData.name,
              authorEmail: formData.email,
            }
          }
        }),
      });

      const json = await res.json();

      if (json.errors) {
        setSubmitError(json.errors[0]?.message || "An error occurred.");
      } else {
        setIsSuccess(true);
        setFormData({ name: "", email: "", comment: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      setSubmitError("Failed to submit comment. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-16 pt-16 border-t border-slate-100">
      <div className="flex items-center gap-3 mb-10 text-slate-900">
        {/* <ChatTeardrop size={24} className="text-primary" weight="fill" /> */}
        <h2 className="text-3xl font-bold tracking-tight">Discussion ({comments?.length || 0})</h2>
      </div>

      <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-8 md:p-10 mb-16">
        <h3 className="text-xl font-bold text-slate-900 mb-8">Leave a Reply</h3>
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/10 border border-primary/20 text-primary px-5 py-4 rounded-2xl mb-8 font-semibold text-sm flex items-center gap-2"
          >
            Thank you! Your comment has been submitted and is pending moderation.
          </motion.div>
        ) : null}

        {submitError ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-8 font-semibold text-sm flex items-center gap-2"
          >
            {submitError}
          </motion.div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-bold text-slate-700 mb-2">Comment</label>
            <textarea
              id="comment"
              required
              rows={5}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all resize-y font-medium text-slate-700"
              placeholder="What are your thoughts?"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-all disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
          >
            {isSubmitting ? (
              <SpinnerGap size={20} className="animate-spin" />
            ) : null}
            <span>Post Comment</span>
          </button>
        </form>
      </div>

      <div className="space-y-8">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-8 bg-white border border-slate-100 rounded-[2rem] relative group">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                  {comment.author?.node?.name ? comment.author.node.name.charAt(0).toUpperCase() : <User size={20} />}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-base">{comment.author?.node?.name || "Anonymous"}</div>
                  <div className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mt-1">
                    <Clock size={12} />
                    {new Date(comment.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
              <div
                className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium text-base"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-50 border border-slate-100 border-dashed rounded-[2rem]">
            <p className="text-slate-500 font-medium">No comments yet. Be the first to start the discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
}
