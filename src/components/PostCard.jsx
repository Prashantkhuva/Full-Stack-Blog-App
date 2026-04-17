import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  formatPostDate,
  getAuthorName,
  getPostExcerpt,
  getReadingTime,
} from "../lib/post-utils";
import { PostMeta } from "./blog/BlogUI";
import MediaFrame from "./MediaFrame";

function PostCard({
  $id,
  title,
  featuredImage,
  content,
  $createdAt,
  authorName,
}) {
  const excerpt = getPostExcerpt(content, 118);
  const readingTime = getReadingTime(content);
  const createdAt = formatPostDate($createdAt);
  const byline = getAuthorName({ authorName });

  return (
    <Link to={`/post/${$id}`} className="block h-full">
      <motion.div
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg-card/90 shadow-[0_22px_60px_rgba(0,0,0,0.24)] cursor-pointer md:rounded-[28px]"
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="border-b border-border/80">
          <MediaFrame
            fileId={featuredImage}
            alt={title}
            ratio="aspect-[4/5] sm:aspect-[16/10]"
            fit="cover"
            rounded="rounded-none"
            loading="lazy"
            imageClassName="transition-transform duration-500 group-hover:scale-105"
            overlay={
              <div className="bg-linear-to-b from-transparent via-transparent to-bg-card/80 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            }
            fallbackLabel="Editorial"
            fallbackHint="Story Preview"
          />
          <div className="absolute left-3 top-3 rounded-full border border-border bg-bg/75 px-2.5 py-1.5 backdrop-blur-sm transition-all duration-300 group-hover:border-accent/70 md:left-5 md:top-5 md:px-3 md:py-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-text/85 md:text-[11px]">
              {createdAt || "Premium Story"}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4 sm:gap-4 md:gap-5 md:p-6">
          <PostMeta
            authorName={byline}
            createdAt={createdAt}
            readingTime={readingTime}
          />

          <motion.h2 className="line-clamp-2 font-heading text-lg font-bold leading-tight text-text transition-colors duration-300 group-hover:text-accent md:text-[1.7rem]">
            {title}
          </motion.h2>

          <p className="line-clamp-3 text-sm leading-7 text-text-muted md:text-base">
            {excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-border/80 pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
              Read Article
            </span>
            <div className="flex size-9 items-center justify-center rounded-full border border-border bg-bg-secondary text-accent transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:bg-bg md:size-10">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default PostCard;
