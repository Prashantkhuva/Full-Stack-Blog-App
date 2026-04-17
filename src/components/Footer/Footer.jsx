import React from "react";

function Footer() {
  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: "X",
      href: "https://x.com/prashantkhuva_",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18 2h3l-7.5 8.5L22 22h-6l-4.7-6.1L6 22H3l8-9L2 2h6l4.3 5.6L18 2z" />
        </svg>
      ),
    },
    {
      label: "Fiverr",
      href: "https://www.fiverr.com/s/gDbWyzv",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="none"
          stroke="currentColor"
          strokeWidth="32"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 translate-x-0.5 -translate-y-px"
        >
          <path d="M300 200H180v-10c0-30 30-30 45-30 18 0 26 2 26 2v-70s-12-2-37-2c-48 0-135 13-135 110v8H50v60h30v130H50v60h200v-60h-50V268h90v130h-40v60h180v-60h-40V200z" />
        </svg>
        // <svg
        //   viewBox="0 0 24 24"
        //   fill="currentColor"
        //   className="w-5 h-5 translate-x-1px" // 👈 optical center fix
        // >
        //   <path d="M6 7h8v2H8v2h6v2H8v5H6V7zm9-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
        // </svg>
      ),
    },
  ];

  return (
    <footer className="mt-16 border-t border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Grid layout */}
        <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3">
          {/* Branding */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <h2 className="text-xl font-semibold">MegaBlog.</h2>
            <p className="text-neutral-400">Stories worth sharing.</p>
            <p className="text-sm text-neutral-500">
              Crafted with code & creativity by Prashant
            </p>
          </div>

          {/* Quick Links placeholder — keeps grid balanced */}
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Explore
            </h3>
            <nav className="flex flex-col gap-1.5 text-sm text-neutral-500">
              <a href="/" className="transition-colors duration-300 hover:text-amber-500">Home</a>
              <a href="/all-posts" className="transition-colors duration-300 hover:text-amber-500">All Posts</a>
              <a href="/add-post" className="transition-colors duration-300 hover:text-amber-500">Write a Story</a>
            </nav>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center gap-3 sm:items-start lg:items-end">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Connect
            </h3>
            <div className="flex items-center justify-center gap-4 sm:gap-5">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 transition-all duration-300 hover:border-amber-500 hover:text-amber-500 sm:h-12 sm:w-12"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-neutral-800 pt-6 text-center text-sm text-neutral-500 sm:mt-10">
          © 2026 MegaBlog. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
