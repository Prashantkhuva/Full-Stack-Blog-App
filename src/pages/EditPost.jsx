import React, { useState, useEffect } from "react";
import { Container, PostForm, PostFormSkeleton, SectionHeading } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

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
    }

    return () => {
      isMounted = false;
    };
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="py-12 md:py-14">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-col gap-3 md:mb-10">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-12 w-56" />
              <Skeleton className="h-5 w-80" />
            </div>
            <PostFormSkeleton />
          </div>
        </Container>
      </div>
    );
  }

  if (!post) return null;

  return (
    <motion.div
      className="py-12 md:py-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionHeading
              eyebrow="Revise"
              title="Edit"
              accent="Post"
              description="Refine the copy, swap the media, and keep the post aligned with the polished reading surface."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PostForm post={post} />
          </motion.div>
        </div>
      </Container>
    </motion.div>
  );
}

export default EditPost;
