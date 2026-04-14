import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo width="100px" />
            <p className="text-text-muted text-sm mt-4">
              Stories worth sharing.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-text hover:text-accent transition-colors text-sm"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-text hover:text-accent transition-colors text-sm"
                  to="/all-posts"
                >
                  All Posts
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
              Account
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-text hover:text-accent transition-colors text-sm"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="text-text hover:text-accent transition-colors text-sm"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  className="text-text hover:text-accent transition-colors text-sm"
                  to="/"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="text-text hover:text-accent transition-colors text-sm"
                  to="/"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <p className="text-text-muted text-sm text-center">
            &copy; {new Date().getFullYear()} MegaBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
