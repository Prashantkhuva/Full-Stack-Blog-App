import appwriteService from "../appwrite/config";
import {
  PostCard,
  Container,
  EmptyState,
  PostGridSkeleton,
  SectionHeading,
} from "../components";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setReduxPosts } from "../store/postSlice";
import { toPlainData } from "../lib/post-utils";
import { updateMetaTags, generateBreadcrumbSchema, injectSchema, clearInjectedSchemas } from "../lib/seo-utils";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setPosts([]);

    appwriteService
      .getPosts()
      .then((posts) => {
        if (isMounted && posts) {
          const plainPosts = posts.documents.map((post) => toPlainData(post));
          setPosts(plainPosts);
          dispatch(setReduxPosts(plainPosts));
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
  }, [dispatch, authStatus]);

  // SEO: Update meta tags for All Posts page
  useEffect(() => {
    const baseUrl = window.location.origin;
    updateMetaTags({
      title: 'All Posts – MegaBlog',
      description: `Browse all ${posts.length} ${posts.length === 1 ? 'story' : 'stories'} on MegaBlog. A curated collection of articles on technology, development, and more.`,
      url: `${baseUrl}/all-posts`,
    });

    // Inject Breadcrumb schema
    clearInjectedSchemas();
    const breadcrumbSchema = generateBreadcrumbSchema([
      { name: 'Home', url: baseUrl },
      { name: 'All Posts', url: `${baseUrl}/all-posts` },
    ]);
    injectSchema(breadcrumbSchema);

    return () => {
      clearInjectedSchemas();
    };
  }, [posts.length]);

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

  if (loading) {
    return <PostGridSkeleton />;
  }

  return (
    <motion.div
      className="w-full px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <div className="mx-auto w-full max-w-6xl">
          <motion.div
            className="mb-8 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeading
              eyebrow="Archive"
              title="All"
              accent="Posts"
              description={`${
                posts.length
              } ${posts.length === 1 ? "story" : "stories"} arranged in one clean editorial grid.`}
            />
          </motion.div>

          {posts.length === 0 ? (
            <EmptyState
              title="No posts available"
              description="The archive is empty right now. Publish your first story to turn this page into a proper magazine wall."
              actionLabel="Create Post"
              actionTo="/add-post"
            />
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {posts.map((post) => (
                <motion.div key={post.$id} variants={fadeInUp} className="h-full">
                  <PostCard {...post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </motion.div>
  );
}

export default AllPosts;
