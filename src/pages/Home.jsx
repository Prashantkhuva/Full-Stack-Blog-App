import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
// import { Container, PostCard } from "../components/index";
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      console.log("Home rendered!");
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  if (posts.length === 0) {
    return (
      <motion.div
        className="w-full py-20 mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container>
          <motion.h1
            className="text-4xl md:text-5xl font-heading font-bold text-text mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {authStatus ? "No posts yet!" : "Login to read posts"}
          </motion.h1>
          {authStatus && (
            <motion.p
              className="text-text-muted text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Add your first post to get started.
            </motion.p>
          )}
        </Container>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      {featuredPost && (
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-bg-secondary/50 to-bg pointer-events-none" />
          <Container>
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <motion.span
                    className="inline-block text-accent text-sm font-medium uppercase tracking-widest mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Featured
                  </motion.span>
                  <motion.h1
                    className="text-4xl md:text-6xl font-heading font-bold text-text leading-tight mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {featuredPost.title}
                  </motion.h1>
                  <motion.p
                    className="text-text-muted text-lg mb-8 line-clamp-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {(() => {
                      const doc = new DOMParser().parseFromString(
                        featuredPost.content,
                        "text/html",
                      );
                      return doc.body.textContent.slice(0, 200);
                    })()}
                    ...
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Link
                      to={`/post/${featuredPost.$id}`}
                      className="inline-block px-8 py-3 bg-accent text-bg font-semibold text-sm uppercase tracking-wider hover:bg-accent-hover transition-colors rounded-sm"
                    >
                      Read Article
                    </Link>
                  </motion.div>
                </div>
                <div className="order-1 md:order-2">
                  <motion.div
                    className="relative aspect-4/3 overflow-hidden rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {featuredPost.featuredImage && (
                      <img
                        src={appwriteService.getFilePreview(
                          featuredPost.featuredImage,
                        )}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>
      )}

      {/* Posts Grid */}
      {regularPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text">
                Latest <span className="text-accent">Stories</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
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
