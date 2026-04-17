import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import {
  Button,
  Container,
  EmptyState,
  HomeSkeleton,
  MediaFrame,
  PostCard,
  PostMeta,
  SectionHeading,
} from "../components/index";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  formatPostDate,
  getAuthorName,
  getPostExcerpt,
  getReadingTime,
  toPlainData,
} from "../lib/post-utils";
import { updateMetaTags, generateBreadcrumbSchema, injectSchema, clearInjectedSchemas } from "../lib/seo-utils";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setPosts([]);

    appwriteService
      .getPosts()
      .then((posts) => {
        if (isMounted && posts) {
          setPosts(posts.documents.map((post) => toPlainData(post)));
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [authStatus]);

  // SEO: Update meta tags on homepage load
  useEffect(() => {
    const baseUrl = window.location.origin;
    updateMetaTags({
      title: 'MegaBlog – Modern SaaS Blog Platform',
      description: 'MegaBlog is a modern SaaS-style blog platform built with React. Read, write, and share stories with a clean and premium experience.',
      url: baseUrl,
    });

    // Inject Breadcrumb schema for homepage
    clearInjectedSchemas();
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
    ]);
    injectSchema(breadcrumbSchema);

    return () => {
      clearInjectedSchemas();
    };
  }, []);

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);
  const featuredExcerpt = featuredPost
    ? getPostExcerpt(featuredPost.content, 220)
    : "";
  const featuredDate = featuredPost ? formatPostDate(featuredPost.$createdAt) : null;
  const featuredReadingTime = featuredPost
    ? getReadingTime(featuredPost.content)
    : null;
  const featuredAuthor = featuredPost ? getAuthorName(featuredPost) : null;

  if (loading) {
    return <HomeSkeleton />;
  }

  if (posts.length === 0) {
    return (
      <motion.div className="w-full py-16 md:py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Container>
          <EmptyState
            title={authStatus ? "No posts yet" : "Sign in to unlock the stories"}
            description={
              authStatus
                ? "Your publication is ready. Start with a first story and the homepage will instantly feel alive."
                : "Browse the editorial shell now, then log in when you’re ready to read and publish full posts."
            }
            actionLabel={authStatus ? "Create Post" : "Go to Login"}
            actionTo={authStatus ? "/add-post" : "/login"}
          />
        </Container>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      {featuredPost && (
        <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-bg-secondary/50 via-bg-secondary/20 to-bg" />
          <Container>
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] md:gap-10">
                <div className="order-2 flex flex-col items-center gap-6 text-center md:order-1 md:items-start md:text-left">
                  <motion.span
                    className="text-xs font-semibold uppercase tracking-[0.32em] text-accent/80"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.24 }}
                  >
                    Featured Story
                  </motion.span>
                  <motion.h1
                    className="font-heading text-2xl font-bold leading-[1.1] text-text md:text-6xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {featuredPost.title}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.36 }}
                  >
                    <PostMeta
                      authorName={featuredAuthor}
                      createdAt={featuredDate}
                      readingTime={featuredReadingTime}
                      tone="bright"
                    />
                  </motion.div>
                  <motion.p
                    className="max-w-2xl text-sm leading-7 text-text-muted md:text-base md:leading-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {featuredExcerpt}
                  </motion.p>
                  <motion.div
                    className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Link to={`/post/${featuredPost.$id}`} className="w-full sm:w-auto">
                      <Button className="w-full bg-accent text-bg hover:bg-accent-hover">
                        Read Article
                      </Button>
                    </Link>
                    <Link
                      to="/all-posts"
                      className="inline-flex w-full items-center justify-center rounded-full border border-border bg-bg-card/60 px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-text transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent sm:w-auto"
                    >
                      Browse Archive
                    </Link>
                  </motion.div>
                </div>
                <div className="order-1 mx-auto w-full max-w-sm md:order-2 md:max-w-none">
                  <motion.div
                    className="relative shadow-[0_28px_80px_rgba(0,0,0,0.3)]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <MediaFrame
                      fileId={featuredPost.featuredImage}
                      alt={featuredPost.title}
                      ratio="aspect-square md:aspect-[16/9]"
                      fit="contain"
                      rounded="rounded-[24px] md:rounded-[28px]"
                      loading="lazy"
                      imageClassName="transition-transform duration-700 hover:scale-[1.02]"
                      overlay={
                        <div className="bg-linear-to-t from-bg/40 via-transparent to-transparent" />
                      }
                      fallbackLabel="Featured"
                      fallbackHint="Story Artwork"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Posts Grid */}
      {regularPosts.length > 0 && (
        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <Container>
            <motion.div
              className="mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                eyebrow="Fresh essays"
                title="Latest"
                accent="Stories"
                description="A quieter, more readable stream of recent writing with stronger previews and cleaner motion."
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {regularPosts.map((post) => (
                <motion.div key={post.$id} variants={fadeInUp}>
                  <PostCard {...post} />
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}
    </div>
  );
}

export default Home;
