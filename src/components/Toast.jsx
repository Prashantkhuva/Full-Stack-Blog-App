import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, CheckCircle } from "lucide-react";

export default function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500); 
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const isError = type === "error";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: 50, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 50, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed bottom-5 left-1/2 z-50 flex w-[90%] max-w-sm items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md ${
            isError
              ? "border-red-500/20 bg-red-500/10"
              : "border-green-500/20 bg-green-500/10"
          }`}
        >
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              isError ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
            }`}
          >
            {isError ? (
              <XCircle size={18} />
            ) : (
              <CheckCircle size={18} />
            )}
          </div>
          <p
            className={`text-sm font-medium ${
              isError ? "text-red-300" : "text-green-300"
            }`}
          >
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
