import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { FaMoon, FaSun, FaGlobe, FaBars, FaTimes } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

function MainNavigation() {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
      isDark ? "border-white/10 bg-dark-secondary/80" : "border-white/20 bg-white/70"
    }`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col min-w-0">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <h1 className="bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-xl font-black tracking-tight text-transparent dark:from-blue-200 dark:to-indigo-300 sm:text-2xl md:text-3xl truncate">
              {t("appTitle")}
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center rounded-full p-1 ${isDark ? "bg-white/5" : "bg-slate-100/50"}`}>
            <Link
              to="/"
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
                isActive("/")
                  ? (isDark ? "bg-dark-primary text-blue-100 shadow-sm" : "bg-white text-accent shadow-sm")
                  : (isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700")
              }`}
            >
              {t("science")}
            </Link>
            <Link
              to="/home2"
              className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
                isActive("/home2")
                  ? (isDark ? "bg-dark-primary text-blue-100 shadow-sm" : "bg-white text-accent shadow-sm")
                  : (isDark ? "text-slate-400 hover:text-slate-200" : "text-slate-500 hover:text-slate-700")
              }`}
            >
              {t("social")}
            </Link>
          </div>

          <div className={`flex items-center gap-1 border-l pl-1 md:pl-4 md:gap-3 ${isDark ? "border-white/10" : "border-slate-200"}`}>
            <button
              onClick={toggleTheme}
              className={`group relative flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                isDark ? "bg-white/5 text-blue-200 hover:bg-white/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <FaSun className="h-4 w-4 text-yellow-300 transition-transform group-hover:rotate-90" />
              ) : (
                <FaMoon className="h-4 w-4 transition-transform group-hover:-rotate-12" />
              )}
            </button>

            <button
              onClick={toggleLanguage}
              className={`flex h-9 items-center gap-2 rounded-full px-3 text-xs font-bold uppercase tracking-wide transition-all ${
                isDark ? "bg-white/5 text-blue-200 hover:bg-white/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              aria-label="Toggle Language"
            >
              <FaGlobe className="h-3.5 w-3.5 opacity-70" />
              <span>{language}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`flex md:hidden h-9 w-9 items-center justify-center rounded-full transition-all ${
                isDark ? "bg-white/5 text-blue-200 hover:bg-white/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className={`md:hidden animate-slideDown overflow-hidden border-t ${isDark ? "border-white/5 bg-dark-secondary" : "border-slate-100 bg-white"}`}>
          <div className="flex flex-col gap-2 p-4">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-all ${
                isActive("/")
                  ? (isDark ? "bg-blue-500/10 text-blue-400" : "bg-accent/5 text-accent")
                  : (isDark ? "text-slate-400 hover:bg-white/5" : "text-slate-600 hover:bg-slate-50")
              }`}
            >
              {t("science")}
              {isActive("/") && <div className="h-1.5 w-1.5 rounded-full bg-current" />}
            </Link>
            <Link
              to="/home2"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-bold transition-all ${
                isActive("/home2")
                  ? (isDark ? "bg-blue-500/10 text-blue-400" : "bg-accent/5 text-accent")
                  : (isDark ? "text-slate-400 hover:bg-white/5" : "text-slate-600 hover:bg-slate-50")
              }`}
            >
              {t("social")}
              {isActive("/home2") && <div className="h-1.5 w-1.5 rounded-full bg-current" />}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default MainNavigation;
