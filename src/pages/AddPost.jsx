import React from "react";
import { Container, PostForm } from "../components/index";
import { motion } from "framer-motion";

function AddPost() {
  return (
    <motion.div
      className="py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="font-heading text-4xl md:text-5xl font-bold text-text mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create New <span className="text-accent">Post</span>
          </motion.h1>
          <motion.p
            className="text-text-muted mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Share your thoughts with the world
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PostForm />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
}

export default AddPost;
