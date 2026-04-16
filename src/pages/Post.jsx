import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (!post) return null;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Full-width Hero Image */}
      <div className="relative w-full aspect-1/9 md:aspect-21/7 overflow-hidden">
        {post.featuredImage && (
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/50 to-transparent" />

        {/* Author Actions */}
        {isAuthor && (
          <motion.div
            className="absolute right-6 top-6 z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-emerald-600"
                className="mr-3 hover:bg-emerald-700"
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-600"
              onClick={deletePost}
              className="hover:bg-red-700"
            >
              Delete
            </Button>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <Container>
        <motion.div
          className="max-w-3xl mx-auto -mt-16 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-bg-card border border-border rounded-xl p-8 md:p-12">
            <motion.h1
              className="font-heading text-3xl md:text-5xl font-bold text-text mb-6 leading-tight"
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
        </motion.div>
      </Container>
    </motion.article>
  );
}
