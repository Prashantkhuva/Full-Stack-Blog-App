import React from "react";
import { Container, PostForm, SectionHeading } from "../components/index";
import { motion } from "framer-motion";

function AddPost() {
  return (
    <motion.div
      className="py-12 md:py-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          <motion.div
            className="mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionHeading
              eyebrow="Compose"
              title="Create New"
              accent="Post"
              description="Shape the story, add your featured image, and publish with the same editorial rhythm used across the reading experience."
            />
          </motion.div>
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
