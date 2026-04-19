import React, { useRef, useState } from "react";
import { createPortal } from "react-dom"; // ye add karo
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ActionIconButton({
  as = "button",
  to,
  onClick,
  label,
  lordSrc,
  lordColors,
  glowColor = "rgba(255,255,255,0.15)",
  ringColor = "ring-white/20",
}) {
  const iconRef = useRef(null);
  const buttonRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    if (iconRef.current) iconRef.current.playerInstance?.playFromBeginning();
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    }
    setShowTooltip(true);
  };

  const buttonContent = (
    <motion.button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
      className={`relative flex size-11 items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 ring-1 ${ringColor} transition-all duration-300 hover:bg-white/10 outline-none group`}
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 22px 4px ${glowColor}` }}
      />
      <lord-icon
        ref={iconRef}
        src={lordSrc}
        trigger="hover"
        colors={lordColors}
        style={{ width: "24px", height: "24px" }}
      />
    </motion.button>
  );

  return (
    <>
      {/* Portal — directly body mein, koi parent affect nahi karega */}
      {showTooltip && createPortal(
        <div
          className="fixed z-9999 pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <span className="block whitespace-nowrap rounded-md px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-[11px] font-medium tracking-wide text-white/80 shadow-lg">
            {label}
          </span>
        </div>,
        document.body
      )}

      {as === "link" && to ? (
        <Link to={to} aria-label={label}>{buttonContent}</Link>
      ) : (
        buttonContent
      )}
    </>
  );
}

function PostActionButtons({ editTo, onDelete }) {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.2 }}
    >
      <ActionIconButton
        as="link"
        to={editTo}
        label="Edit post"
        lordSrc="https://cdn.lordicon.com/exymduqj.json"
        lordColors="primary:#facc15,secondary:#facc15"
        glowColor="rgba(250,204,21,0.28)"
        ringColor="ring-yellow-400/30"
      />
      <ActionIconButton
        onClick={onDelete}
        label="Delete post"
        lordSrc="https://cdn.lordicon.com/jzinekkv.json"
        lordColors="primary:#ef4444,secondary:#ef4444"
        glowColor="rgba(239,68,68,0.28)"
        ringColor="ring-red-500/30"
      />
    </motion.div>
  );
}

export { ActionIconButton, PostActionButtons };