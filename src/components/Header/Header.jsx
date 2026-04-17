import React, { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [authStatus]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  const navItem = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleNavigate = (slug) => {
    setIsMenuOpen(false);
    navigate(slug);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed left-2 right-2 top-2 z-50 rounded-3xl border border-border bg-bg/85 px-3 shadow-[0_16px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:left-4 sm:right-4 md:left-6 md:right-6"
          >
            <Container>
              <nav className="flex items-center justify-between py-2.5 lg:py-4">
                <Link to="/" className="group shrink-0" onClick={() => setIsMenuOpen(false)}>
                  <Logo width="44px" className="md:w-12.5" />
                </Link>

                <div className="hidden items-center gap-1 lg:flex">
                  {navItem.map((item) =>
                    item.active ? (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavigate(item.slug)}
                        className="rounded-full px-4 py-2 text-sm font-medium text-text transition-all duration-300 hover:bg-bg-secondary hover:text-accent"
                        whileTap={{ scale: 0.96 }}
                      >
                        {item.name}
                      </motion.button>
                    ) : null,
                  )}
                  {authStatus ? (
                    <div className="ml-3">
                      <LogoutBtn />
                    </div>
                  ) : null}
                </div>

                <motion.button
                  type="button"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-bg-secondary text-text transition-all duration-300 hover:border-accent hover:bg-bg hover:text-accent lg:hidden"
                  whileTap={{ scale: 0.95 }}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.button>
              </nav>
            </Container>
          </motion.header>

          <AnimatePresence>
            {isMenuOpen ? (
              <>
                <motion.div
                  className="fixed inset-0 z-40 bg-bg/70 backdrop-blur-sm lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />
                <motion.aside
                  className="fixed inset-y-0 left-0 z-50 flex w-[min(300px,85vw)] flex-col border-r border-border bg-bg-card px-4 pb-6 pt-4 shadow-[0_24px_80px_rgba(0,0,0,0.34)] lg:hidden"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <Link
                      to="/"
                      className="group shrink-0"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Logo width="48px" />
                    </Link>
                    <motion.button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-bg-secondary text-text-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                      whileTap={{ scale: 0.95 }}
                      aria-label="Close menu"
                    >
                      <X size={16} />
                    </motion.button>
                  </div>

                  <div className="mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-text-muted">
                      Navigation
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
                    {navItem.map((item) =>
                      item.active ? (
                        <motion.button
                          key={item.name}
                          onClick={() => handleNavigate(item.slug)}
                          className="flex items-center justify-between rounded-xl border border-transparent bg-bg-secondary px-4 py-3 text-left text-sm font-medium text-text transition-all duration-300 hover:border-border hover:bg-bg hover:text-accent"
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{item.name}</span>
                        </motion.button>
                      ) : null,
                    )}
                    {authStatus ? (
                      <div className="mt-auto pt-3">
                        <LogoutBtn className="w-full rounded-xl py-3" />
                      </div>
                    ) : null}
                  </div>
                </motion.aside>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

export default Header;
