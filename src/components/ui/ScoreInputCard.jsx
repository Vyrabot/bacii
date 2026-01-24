import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

function ScoreInputCard({
  index,
  onScoreChange,
  title,
  img,
  percentage,
  color,
  score,
  max,
  error
}) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const handleChange = (e) => {
    const value = e.target.value;
    onScoreChange(index, value);
  };

  return (
    <div
      className={`flex items-center gap-4 overflow-hidden rounded-2xl p-3 transition-all duration-300 shadow-sm backdrop-blur hover:shadow-md ${
        error 
          ? "border-2 border-red-500/50 ring-1 ring-red-500/20" 
          : "border border-transparent"
      } ${
        isDark ? "bg-dark-secondary/80 border-white/10 text-white" : "bg-white/80 border-white/40 text-slate-800"
      }`}
    >
      <div className="h-[88px] w-[88px] overflow-hidden rounded-xl shadow-sm group">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between">
          <p
            className={`text-base font-semibold ${
              isDark ? "text-blue-200" : "text-slate-800"
            }`}
          >
            {title}
          </p>
          <div className="flex flex-col items-end">
            <span className={`text-xs font-semibold ${error ? "text-red-500" : "text-slate-400 dark:text-blue-200/70"}`}>
              {score || 0} <span className="text-[10px] opacity-60">/ {max}</span>
            </span>
          </div>
        </div>
        <div
          className={`h-1.5 w-full rounded-full overflow-hidden ${
            isDark ? "bg-blue-900/40" : "bg-slate-200"
          }`}
        >
          <div
            className={`h-full rounded-full ${color} transition-all duration-500 ease-out`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder={t("enterScorePlaceholder")}
            value={score === 0 ? "" : score}
            className={`h-[42px] w-full rounded-xl border px-3 text-sm font-bold shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 ${
              error
                ? "border-red-500 bg-red-50/50 dark:bg-red-500/5 focus:border-red-600"
                : `border-slate-200 bg-slate-50/30 dark:border-white/10 dark:bg-white/5 ${
                    isDark ? "text-white focus:border-blue-500/50" : "text-slate-700 focus:border-accent/40"
                  }`
            }`}
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
          />
          {error && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-500 animate-fadeIn">
              !
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScoreInputCard;
