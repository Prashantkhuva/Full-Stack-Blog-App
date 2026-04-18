import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PenLine, Trash2 } from "lucide-react";

function ActionIconButton({
  as = "button",
  to,
  onClick,
  label,
  icon: Icon,
  videoSrc,
  tone = "default",
}) {
  const videoRef = useRef(null);
  const toneClass =
    tone === "danger"
      ? "text-red-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-200 hover:shadow-[0_0_24px_rgba(239,68,68,0.18)]"
      : "text-text-muted hover:border-border hover:bg-bg/70 hover:text-text hover:shadow-[0_0_22px_rgba(245,245,245,0.08)]";

  const iconMotion =
    tone === "danger"
      ? {
        rest: { scale: 1, rotate: 0, opacity: 0.9 },
        hover: {
          scale: 1.1,
          rotate: -9,
          opacity: 1,
          transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        },
      }
      : {
        rest: { scale: 1, rotate: 0, opacity: 0.9 },
        hover: {
          scale: 1.1,
          rotate: -7,
          opacity: 1,
          transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const button = (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`inline-flex size-11 items-center justify-center rounded-full border border-border/80 bg-bg-card/70 backdrop-blur-sm transition-all duration-300 ${toneClass}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileFocus="hover"
      variants={{
        rest: { y: 0, scale: 1 },
        hover: { y: -1, scale: 1.04 }
      }}
      whileTap={{ scale: 0.96 }}
      onHoverStart={() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
        }
      }}
      onHoverEnd={() => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <motion.span variants={iconMotion}>
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-5 h-5 object-contain"
            muted
            playsInline
          />
        ) : (
          <Icon size={16} />
        )}
      </motion.span>
    </motion.button>
  );

  if (as === "link" && to) {
    return (
      <Link to={to} aria-label={label} title={label}>
        {button}
      </Link>
    );
  }

  return button;
}

function PostActionButtons({ editTo, onDelete }) {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.2 }}
    >
      <ActionIconButton
        as="link"
        to={editTo}
        label="Edit post"
        icon={PenLine}
        videoSrc="/wired-outline-35-edit-hover-circle.mp4"
      />
      <ActionIconButton
        onClick={onDelete}
        label="Delete post"
        icon={Trash2}
        tone="danger"
        videoSrc="/wired-gradient-185-trash-bin-hover-empty.mp4"
      />
    </motion.div>
  );
}

export { ActionIconButton, PostActionButtons };
