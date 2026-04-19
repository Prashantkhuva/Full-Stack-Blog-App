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
  Toast,
} from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { formatPostDate, getAuthorName, getReadingTime } from "../lib/post-utils";
import {
  updateMetaTags,
  generateBlogPostingSchema,
  generateBreadcrumbSchema,
  injectSchema,
  clearInjectedSchemas,
} from "../lib/seo-utils";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [toastConfig, setToastConfig] = useState({ show: false, message: "", type: "error" });

  const showToast = (message, type = "error") => {
    setToastConfig({ show: true, message, type });
  };

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

  // Update SEO meta tags when post loads
  useEffect(() => {
    if (post) {
      const excerpt = post.content?.substring(0, 160).replace(/<[^>]*>/g, '').trim() + '...';
      const postUrl = `${window.location.origin}/post/${post.$id}`;

      updateMetaTags({
        title: `${post.title} | MegaBlog`,
        description: excerpt,
        image: post.featuredImage || `${window.location.origin}/og-image.png`,
        url: postUrl,
        type: 'article',
      });

      // Inject BlogPosting schema
      clearInjectedSchemas();
      const blogSchema = generateBlogPostingSchema(post);
      injectSchema(blogSchema);

      // Inject Breadcrumb schema
      const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: window.location.origin },
        { name: 'All Posts', url: `${window.location.origin}/all-posts` },
        { name: post.title, url: postUrl },
      ]);
      injectSchema(breadcrumbSchema);
    }

    return () => {
      clearInjectedSchemas();
    };
  }, [post]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        showToast("Post deleted successfully", "success");
        setTimeout(() => {
          navigate("/");
        }, 2200);
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
    <>
      <Toast
        message={toastConfig.show ? toastConfig.message : ""}
        type={toastConfig.type}
        onClose={() => setToastConfig((prev) => ({ ...prev, show: false }))}
      />
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
            ratio="aspect-[4/5] sm:aspect-[16/9]"
            fit="contain"
            rounded="rounded-none"
            loading="eager"
            fetchPriority="high"
            overlay={
              <div className="bg-linear-to-t from-bg via-bg/50 to-transparent" />
            }
            fallbackLabel="Articl"
            fallbackHint="Featured Media"
            className="border-0"
          />

          {/* Author Actions */}
          {isAuthor && (
            <div className="absolute top-4 right-4 z-20 flex gap-2">
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
          className="relative z-10 mx-auto -mt-8 max-w-4xl px-4 sm:-mt-12 md:-mt-16 md:px-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="rounded-3xl border border-border bg-bg-card px-4 py-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:px-6 sm:py-8 md:rounded-4xl md:px-10 md:py-12">
            <div className="mx-auto flex w-full max-w-3xl flex-col">
              <motion.div
                className="mb-5"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
              >
                <span className="mb-4 inline-flex rounded-full border border-border bg-bg-secondary px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/80 md:px-4 md:py-2 md:text-[11px]">
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
                className="mb-6 max-w-4xl font-heading text-xl font-bold leading-[1.1] text-text md:mb-8 md:text-5xl"
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
                {parse((post.content || "").replace(/&nbsp;/g, " "))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </motion.article>
    </>
  );
}
