"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Send,
  User,
  Clock,
  AlertCircle,
  Star,
  CheckCircle2,
} from "lucide-react";
import {
  FirestoreComment,
  fetchCommentsForBlog,
  submitBlogComment,
  subscribeToComments,
} from "@/lib/firestore/comments";
import { auth, db } from "@/lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { getSSOUser, saveSSOUser, type AuthUser } from "@/lib/sso";

interface Props {
  blogSlug: string;
}

type CommentUser = {
  displayName?: string | null;
  name?: string;
  email?: string | null;
  photoURL?: string | null;
  avatar?: string;
  uid?: string;
  id?: string;
};

export function BlogCommentsSection({ blogSlug }: Props) {
  const [comments, setComments] = useState<FirestoreComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CommentUser | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Form states
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Synchronize authentication with Universal SSO session and Firebase Auth
  useEffect(() => {
    // 1. Initial hydrate from shared SSO session
    const ssoUser = getSSOUser();
    if (ssoUser) {
      setCurrentUser(ssoUser);
    }

    // 2. Listen to active Firebase authentication
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        const uObj: AuthUser = {
          id: user.uid,
          email: user.email,
          name: user.displayName || user.email.split("@")[0],
          avatar: user.photoURL || "cyber-astro",
          photoURL: user.photoURL || undefined,
          role: user.email.includes("admin") ? "admin" : "client",
        };
        setCurrentUser(uObj);
        saveSSOUser(uObj);
      }
    });

    // 3. Listen to SSO cross-tab or cross-subdomain auth changes
    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<AuthUser | null>;
      if (customEvent.detail) {
        setCurrentUser(customEvent.detail);
      } else {
        setCurrentUser(null);
      }
    };
    window.addEventListener("modernisum_auth_change", handleAuthChange);

    return () => {
      unsubscribeAuth();
      window.removeEventListener("modernisum_auth_change", handleAuthChange);
    };
  }, []);

  // Subscribe to real-time comments for this specific blog slug
  useEffect(() => {
    fetchCommentsForBlog(blogSlug).then((initialComments) => {
      setComments(initialComments);
      setLoading(false);
    });

    const unsubscribe = subscribeToComments(blogSlug, (updated) => {
      setComments(updated);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [blogSlug]);

  // Google 1-Click Sign-In
  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      if (fbUser.email) {
        const uObj: AuthUser = {
          id: fbUser.uid,
          email: fbUser.email,
          name: fbUser.displayName || fbUser.email.split("@")[0],
          avatar: fbUser.photoURL || "cyber-astro",
          photoURL: fbUser.photoURL || undefined,
          role: fbUser.email.includes("admin") ? "admin" : "client",
        };
        saveSSOUser(uObj);
        setCurrentUser(uObj);
      }

      // Also record authenticated lead into marketing_leads
      if (fbUser.email) {
        try {
          const docId = fbUser.email.toLowerCase().replace(/[@.]/g, "_");
          await setDoc(
            doc(db, "marketing_leads", docId),
            {
              email: fbUser.email.toLowerCase(),
              name: fbUser.displayName || fbUser.email.split("@")[0],
              photoURL: fbUser.photoURL || null,
              uid: fbUser.uid,
              source: "blog_comment_auth",
              pageSource: `/blog/${blogSlug}`,
              lastActive: serverTimestamp(),
              status: "active_lead",
            },
            { merge: true }
          );
        } catch {}
      }
    } catch (err: unknown) {
      const errorObj = err as { code?: string };
      if (errorObj?.code !== "auth/popup-closed-by-user") {
        setError("Sign-in could not be completed. Please try again.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setError("Please sign in with Google to post a comment.");
      return;
    }

    if (!commentText.trim()) {
      setError("Please enter your comment before posting.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await submitBlogComment({
        blogSlug,
        authorName: currentUser.displayName || currentUser.name || currentUser.email?.split("@")[0] || "Reader",
        authorEmail: currentUser.email || "reader@modernisum.com",
        authorAvatar: currentUser.photoURL || currentUser.avatar || undefined,
        ...(rating > 0 ? { rating } : {}),
        commentText: commentText.trim(),
      });

      setSubmitted(true);
      setCommentText("");
      setRating(0);
      setHoverRating(0);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
      setError("Could not post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Only compute rating if there are actual rated comments
  const ratedComments = comments.filter((c) => typeof c.rating === "number" && c.rating > 0);
  const avgRating =
    ratedComments.length > 0
      ? (ratedComments.reduce((acc, c) => acc + (c.rating || 0), 0) / ratedComments.length).toFixed(1)
      : null;

  return (
    <section className="mt-14 pt-10 border-t border-slate-200/80 dark:border-white/10">
      {/* Header: Title and Genuine Rating Score (Only visible when reviews exist) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
              Comments ({comments.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Thoughts and feedback from readers.
            </p>
          </div>
        </div>

        {/* Real Rating Badge - ONLY shown if real rated comments exist */}
        {ratedComments.length > 0 && avgRating && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold w-fit">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{avgRating} / 5.0</span>
            <span className="text-[11px] opacity-75 font-normal">
              ({ratedComments.length} {ratedComments.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>

      {/* Traditional Comment Input Box */}
      {currentUser ? (
        <div className="flex items-start gap-3 sm:gap-4 mb-8">
          {/* User Avatar */}
          {currentUser.photoURL && (currentUser.photoURL.startsWith("http") || currentUser.photoURL.startsWith("/")) ? (
            <Image
              src={currentUser.photoURL}
              alt={currentUser.displayName || currentUser.name || "User"}
              width={38}
              height={38}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 dark:border-white/15 object-cover shrink-0 mt-0.5"
            />
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 mt-0.5 uppercase">
              {(currentUser.displayName || currentUser.name || currentUser.email || "U")[0]}
            </div>
          )}

          {/* Comment Form Card */}
          <form onSubmit={handleSubmit} className="flex-1 min-w-0">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md overflow-hidden focus-within:border-cyan-500/60 transition-all shadow-sm">
              {/* Textarea */}
              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 pt-3 pb-2 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none resize-none leading-relaxed"
              />

              {/* Action Toolbar inside the comment box */}
              <div className="flex items-center justify-between px-3.5 py-2 border-t border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-white/[0.02]">
                {/* Optional Star Rating (Clean & Minimal without verbose labels) */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Rating:</span>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(rating === star ? 0 : star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
                        title={`${star} star`}
                        aria-label={`${star} star`}
                      >
                        <Star
                          className={`w-3.5 h-3.5 transition-colors ${
                            (hoverRating || rating) >= star
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-700 hover:text-slate-400"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <span className="text-[11px] text-amber-600 dark:text-amber-400 font-mono font-medium ml-0.5">
                      {rating}★
                    </span>
                  )}
                </div>

                {/* Compact Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !commentText.trim()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed select-none"
                >
                  {submitting ? (
                    <span>Posting...</span>
                  ) : (
                    <>
                      <Send className="w-3 h-3" />
                      <span>Comment</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error or Success notification */}
            {error && (
              <p className="mt-2 text-xs text-rose-500 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </p>
            )}
            {submitted && (
              <p className="mt-2 text-xs text-emerald-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Comment posted successfully!</span>
              </p>
            )}
          </form>
        </div>
      ) : (
        /* Traditional Unauthenticated Inline Prompt */
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] backdrop-blur-md mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                Join the discussion
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Sign in with Google to share your thoughts.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={authLoading}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white text-xs font-semibold hover:border-cyan-500 shadow-sm transition-all cursor-pointer shrink-0 disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{authLoading ? "Signing in..." : "Continue with Google"}</span>
          </button>
        </div>
      )}

      {/* Existing Comments List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-6 text-center text-xs text-slate-400 animate-pulse">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-white/10 text-xs text-slate-400 dark:text-slate-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/40 dark:bg-white/[0.015] backdrop-blur-md space-y-2.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {comment.authorAvatar ? (
                    <Image
                      src={comment.authorAvatar}
                      alt={comment.authorName}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-xs">
                      {comment.authorName ? comment.authorName[0] : "R"}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                        {comment.authorName}
                      </span>
                      {/* Star Rating Display */}
                      {comment.rating && comment.rating > 0 && (
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                (comment.rating || 0) >= star
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300 dark:text-slate-700"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>
                    {comment.createdAt?.toDate
                      ? `${comment.createdAt.toDate().toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}, ${comment.createdAt.toDate().toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}`
                      : "Recent"}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-10.5">
                {comment.commentText}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
