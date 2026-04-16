import React, { useEffect, useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const navItem = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-10 right-10 z-50 bg-transparent backdrop-blur-md border-b border-border rounded-4xl"
        >
          <Container>
            <nav className="flex items-center justify-between py-4">
              <Link to="/" className="group">
                <Logo width="50px" />
              </Link>

              <ul className="flex items-center space-x-1">
                {navItem.map((item) =>
                  item.active ? (
                    <li key={item.name}>
                      <motion.button
                        onClick={() => navigate(item.slug)}
                        className="relative px-5 py-2 text-text font-medium text-sm transition-colors hover:text-accent"
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
                      </motion.button>
                    </li>
                  ) : null,
                )}
                {authStatus && (
                  <li className="ml-4">
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            </nav>
          </Container>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

export default Header;
