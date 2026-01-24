import React from "react";
import { Link, useLocation } from "react-router";
import { FaMoon, FaSun, FaGlobe } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

function MainNavigation() {
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-colors duration-300 ${
      isDark ? "border-white/10 bg-dark-secondary/80" : "border-white/20 bg-white/70"
    }`}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col min-w-0">
          <h1 className="bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-3xl font-black tracking-tight text-transparent dark:from-blue-200 dark:to-indigo-300 sm:text-2xl md:text-3xl truncate">
            {t("appTitle")}
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <div className={`flex items-center rounded-full p-1 ${isDark ? "bg-white/5" : "bg-slate-100/50"}`}>
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

          <div className={`flex items-center gap-2 border-l pl-3 md:gap-3 md:pl-6 ${isDark ? "border-white/10" : "border-slate-200"}`}>
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
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
