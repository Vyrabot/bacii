import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaHistory, FaTrash, FaEdit, FaEye } from "react-icons/fa";

const getGrade = (totalScore) => {
  if (totalScore >= 427) return "A";
  if (totalScore >= 380) return "B";
  if (totalScore >= 332) return "C";
  if (totalScore >= 286) return "D";
  if (totalScore >= 237) return "E";
  return "F";
};

const getGradeStyle = (grade) => {
  switch (grade) {
    case "A": return "text-red-500";
    case "B": return "text-pink-500";
    case "C": return "text-red-700";
    case "D": return "text-green-600";
    case "E": return "text-blue-500";
    default: return "text-slate-500";
  }
};

function ScoreHistoryPanel({ entries, track, language, t, onRemove, onClear, isDark, onEdit, onView }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const filteredEntries = entries.filter((entry) => entry.track === track);
  const grouped = filteredEntries.reduce((acc, entry) => {
    const monthKey = entry.month || entry.date.slice(0, 7);
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(entry);
    return acc;
  }, {});

  const monthKeys = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const locale = language === "km" ? "km-KH" : "en-US";
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" });
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <div className={`h-fit overflow-hidden rounded-3xl border transition-all duration-300 ${
      isDark ? "bg-dark-secondary/80 border-white/10" : "bg-white/80 border-white/40"
    } shadow-lg backdrop-blur-md`}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex cursor-pointer items-center justify-between p-5 transition-colors ${
            isDark ? "hover:bg-white/5" : "hover:bg-black/5"
        }`}
      >
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDark ? "bg-blue-500/20 text-blue-300" : "bg-accent/10 text-accent"}`}>
                <FaHistory />
            </div>
            <h3 className={`text-base font-bold ${isDark ? "text-blue-100" : "text-slate-700"}`}>
                {t("monthlyHistory")}
            </h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${isDark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-600"}`}>
                {filteredEntries.length}
            </span>
        </div>
        <button className={`p-2 rounded-full transition-all ${isOpen ? "rotate-180" : ""}`}>
           {isOpen ? <FaChevronUp className="text-slate-400" /> : <FaChevronDown className="text-slate-400" />}
        </button>
      </div>

      <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 p-5 pt-0" : "max-h-0 opacity-0 overflow-hidden"}`}>
         <div className="flex justify-end mb-4">
             {monthKeys.length > 0 && (
                <button
                    onClick={(e) => { e.stopPropagation(); onClear(); }}
                    className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                    type="button"
                >
                    <FaTrash size={12} />
                    {t("clearHistory")}
                </button>
             )}
         </div>

        {monthKeys.length === 0 ? (
            <div className="text-center py-8 opacity-60">
                <p className={`text-sm font-medium ${isDark ? "text-blue-200" : "text-slate-600"}`}>{t("noHistory")}</p>
            </div>
        ) : (
            <div className="space-y-6">
            {monthKeys.map((monthKey) => (
                <div key={monthKey} className="space-y-3">
                <p className={`text-xs font-bold uppercase tracking-wider opacity-50 px-1 ${isDark ? "text-blue-100" : "text-slate-400"}`}>
                    {monthFormatter.format(new Date(`${monthKey}-01T00:00:00`))}
                </p>
                <div className="space-y-2">
                    {grouped[monthKey].map((entry) => {
                    const grade = getGrade(entry.totalScore);
                    return (
                        <div
                        key={entry.id}
                        className={`group relative flex items-center justify-between gap-3 rounded-2xl border p-4 transition-all hover:shadow-lg ${
                            isDark ? "bg-dark-primary/60 border-white/10" : "bg-white/60 border-slate-100"
                        }`}
                        >
                        <div className="flex flex-col gap-1.5">
                            <span className={`text-[10px] font-bold opacity-60 ${isDark ? "text-blue-200" : "text-slate-500"}`}>
                            {dateFormatter.format(new Date(entry.date))}
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
                                    {entry.totalScore}
                                </span>
                                <span className={`text-[11px] font-bold ${isDark ? "text-blue-300/70" : "text-slate-500"}`}>
                                    {t("average")}: {(entry.totalScore / 7).toFixed(1)}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl font-black text-xl ${getGradeStyle(grade)} bg-opacity-10 dark:bg-opacity-20 bg-current`}>
                                {grade}
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-1 sm:gap-2">
                                    <button
                                        onClick={() => onView && onView(entry)}
                                        className={`p-2 rounded-lg transition-all ${
                                            isDark ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                        }`}
                                        title={t("view")}
                                    >
                                        <FaEye size={14} />
                                    </button>
                                    <button
                                        onClick={() => onEdit && onEdit(entry)}
                                        className={`p-2 rounded-lg transition-all ${
                                            isDark ? "bg-white/5 text-blue-300 hover:bg-white/10" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                        title={t("edit")}
                                    >
                                        <FaEdit size={14} />
                                    </button>
                                    <button
                                        onClick={() => onRemove(entry.id)}
                                        className={`p-2 rounded-lg transition-all ${
                                            isDark ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-red-50 text-red-500 hover:bg-red-100"
                                        }`}
                                        title={t("remove")}
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        </div>
                    );
                    })}
                </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </div>
  );
}

export default ScoreHistoryPanel;
