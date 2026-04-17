import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpenText } from "lucide-react";
import { motion } from "framer-motion";

function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
}) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.32em] text-accent/80">
          {eyebrow}
        </span>
      ) : null}

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-3xl font-bold leading-tight text-text md:text-5xl">
          {title} {accent ? <span className="text-accent">{accent}</span> : null}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-text-muted md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function EmptyState({
  title,
  description,
  actionLabel,
  actionTo,
  align = "center",
}) {
  const isCentered = align === "center";

  return (
    <motion.div
      className={`rounded-[28px] border border-border bg-bg-card/70 px-4 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-sm md:px-10 md:py-16 ${
        isCentered ? "text-center" : "text-left"
      }`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div
        className={`flex flex-col gap-6 ${
          isCentered ? "items-center" : "items-start"
        }`}
      >
        <div className="flex size-14 items-center justify-center rounded-full border border-border bg-bg-secondary text-accent">
          <BookOpenText size={22} />
        </div>

        <div className="flex max-w-xl flex-col gap-3">
          <h3 className="font-heading text-2xl font-bold text-text md:text-4xl">
            {title}
          </h3>
          <p className="text-sm leading-7 text-text-muted md:text-base">{description}</p>
        </div>

        {actionLabel && actionTo ? (
          <Link
            to={actionTo}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-text transition-transform duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            {actionLabel}
            <ArrowRight size={16} />
          </Link>
        ) : null}
      </div>
    </motion.div>
  );
}

function PostMeta({ authorName, createdAt, readingTime, tone = "muted" }) {
  const textColor = tone === "bright" ? "text-text/85" : "text-text-muted";
  const items = [authorName, createdAt, readingTime].filter(Boolean);

  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.24em] md:text-xs ${textColor}`}
    >
      {items.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          {index > 0 ? (
            <span className="h-1 w-1 rounded-full bg-current/60" />
          ) : null}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

export { EmptyState, PostMeta, SectionHeading };
