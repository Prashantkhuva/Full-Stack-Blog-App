import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle } from "lucide-react";

export default function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500); // Auto dismiss after 3.5s
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed bottom-5 right-5 z-100 flex w-full max-w-sm items-center gap-3 rounded-2xl px-4 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-md ${
            type === "error"
              ? "border border-red-500/30 bg-red-950/90 text-red-100"
              : "border border-emerald-500/30 bg-emerald-950/90 text-emerald-100"
          }`}
        >
          {type === "error" ? (
            <XCircle className="size-5 shrink-0 text-red-500" />
          ) : (
            <CheckCircle className="size-5 shrink-0 text-emerald-500" />
          )}
          <p className="text-sm font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
