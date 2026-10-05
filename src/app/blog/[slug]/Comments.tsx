"use client";

import React, { useState } from "react";
import { MessageCircle, User, Clock, Loader2 } from "lucide-react";
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
    <div className="mt-20 pt-10 border-t border-slate-200">
      <div className="flex items-center gap-3 mb-8 text-slate-800">
        <h2 className="text-2xl font-bold tracking-tight">Comments</h2>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 mb-12">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Leave a Reply</h3>
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-6 font-medium text-sm flex items-center gap-2"
          >
            Comment submitted for moderation.
          </motion.div>
        ) : null}

        {submitError ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 font-medium text-sm flex items-center gap-2"
          >
            {submitError}
          </motion.div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Name</label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email</label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-slate-600 mb-1">Comment</label>
            <textarea
              id="comment"
              required
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-y"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : null}
            <span>Submit Comment</span>
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="p-6 bg-white border border-slate-200 rounded-2xl relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{comment.author?.node?.name || "Anonymous"}</div>
                  <div className="text-xs font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock size={12} />
                    {new Date(comment.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>
              <div
                className="prose prose-sm prose-slate max-w-none text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              />
            </div>
          ))
        ) : (
          <p className="text-slate-500 text-sm">No comments yet. Be the first to start the discussion!</p>
        )}
      </div>
    </div>
  );
}
