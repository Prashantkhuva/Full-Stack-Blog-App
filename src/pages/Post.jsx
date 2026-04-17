import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import {
  Container,
  EmptyState,
  MediaFrame,
  PostDetailsSkeleton,
  PostMeta,
  PostActionButtons,
} from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { formatPostDate, getAuthorName, getReadingTime } from "../lib/post-utils";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const postDate = post ? formatPostDate(post.$createdAt) : null;
  const readingTime = post ? getReadingTime(post.content) : null;
  const authorName = post
    ? getAuthorName(post, isAuthor && userData?.name ? userData.name : undefined)
    : null;

  useEffect(() => {
    let isMounted = true;

    if (slug) {
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (!isMounted) {
            return;
          }

          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    } else {
      navigate("/");
    }

    return () => {
      isMounted = false;
    };
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (loading) {
    return <PostDetailsSkeleton />;
  }

  if (!post) {
    return (
      <div className="py-12 md:py-16">
        <Container>
          <EmptyState
            title="Story not found"
            description="This article may have been removed or the link may be out of date. Head back to the archive to keep reading."
            actionLabel="Browse Posts"
            actionTo="/all-posts"
          />
        </Container>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pb-16 md:pb-24"
    >
      {/* Full-width Hero Image */}
      <div className="relative">
        <div className="relative">
          <MediaFrame
            fileId={post.featuredImage}
            alt={post.title}
            ratio="aspect-[16/9]"
            fit="contain"
            rounded="rounded-none"
            loading="lazy"
            overlay={
              <div className="bg-linear-to-t from-bg via-bg/50 to-transparent" />
            }
            fallbackLabel="Article"
            fallbackHint="Featured Media"
            className="border-0"
          />

          {/* Author Actions */}
          {isAuthor && (
            <div className="absolute right-4 top-4 z-20 md:right-6 md:top-6">
              <PostActionButtons
                editTo={`/edit-post/${post.$id}`}
                onDelete={deletePost}
              />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <Container>
        <motion.div
          className="relative z-10 mx-auto -mt-12 max-w-4xl px-4 md:-mt-16 md:px-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-[32px] border border-border bg-bg-card px-4 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] md:px-10 md:py-12">
            <div className="mx-auto flex w-full max-w-3xl flex-col">
              <motion.div
                className="mb-5"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
              >
                <span className="mb-4 inline-flex rounded-full border border-border bg-bg-secondary px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent/80">
                  Editorial Note
                </span>
                <PostMeta
                  authorName={authorName}
                  createdAt={postDate}
                  readingTime={readingTime}
                  tone="bright"
                />
              </motion.div>
              <motion.h1
                className="mb-6 max-w-4xl font-heading text-2xl font-bold leading-[1.08] text-text md:mb-8 md:text-5xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {post.title}
              </motion.h1>

              <motion.div
                className="browser-css"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {parse(post.content)}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </motion.article>
  );
}
