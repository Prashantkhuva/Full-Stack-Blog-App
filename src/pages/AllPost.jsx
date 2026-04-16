import appwriteService from "../appwrite/config";
import { PostCard, Container } from "../components";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
        dispatch(setReduxPosts(posts.documents));
      }
    });
  }, []);

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      className="w-full py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-2">
            All <span className="text-accent">Posts</span>
          </h1>
          <p className="text-text-muted">
            {posts.length} {posts.length === 1 ? "post" : "posts"} found
          </p>
        </motion.div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">No posts available.</p>
          </div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {posts.map((post) => (
              <motion.div key={post.$id} variants={fadeInUp}>
                <PostCard {...post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </motion.div>
  );
}

export default AllPosts;
