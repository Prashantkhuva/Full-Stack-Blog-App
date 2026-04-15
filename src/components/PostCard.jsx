import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <motion.div
        className="group relative bg-bg-card rounded-lg overflow-hidden border border-border cursor-pointer"
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="relative aspect-16/10 overflow-hidden">
          {featuredImage ? (
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-bg-secondary flex items-center justify-center">
              <span className="text-text-muted text-4xl font-heading">
                No Image
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-liner-to-t from-bg-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-5">
          <motion.h2 className="font-heading text-xl md:text-2xl font-bold text-text leading-tight group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {title}
          </motion.h2>
          <div className="mt-4 flex items-center text-accent text-sm font-medium uppercase tracking-wider">
            <span>Read Article</span>
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default PostCard;
