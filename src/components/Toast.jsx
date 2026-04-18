import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              isError ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
            }`}
          >
            {isError ? (
              <DotLottieReact
                src="https://lottie.host/8044c951-e3ed-44ba-a62f-d61cb7c47255/tsREtHLGyq.lottie"
                autoplay
                loop={false}
                className="w-8 h-8"
              />
            ) : (
              <DotLottieReact
                src="https://lottie.host/b610cf69-d5d4-45a3-b07f-e0d4224bc299/yFSp052FbS.lottie"
                autoplay
                loop={false}
                className="w-8 h-8"
              />
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
