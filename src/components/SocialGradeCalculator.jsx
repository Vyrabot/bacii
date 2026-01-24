import React, { useMemo, useState } from "react";
import confetti from "canvas-confetti";
import ScoreInputCard from "./ui/ScoreInputCard";
import FeedbackDialog from "./ui/FeedbackDialog";
import ScoreHistoryPanel from "./ui/ScoreHistoryPanel";
import SEO from "./SEO";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { useScore } from "../context/ScoreContext";
import { FaCalculator, FaRedo, FaSave, FaTimes, FaHistory } from "react-icons/fa";
import p7 from "../assets/khmer-book.jpg";
import p1 from "../assets/enlish.jpg";
import p2 from "../assets/earth.jpg";
import p3 from "../assets/sersthorpulroth.jpg";
import p4 from "../assets/marth.jpg";
import p5 from "../assets/phom.jpg";
import p6 from "../assets/history.jpg";

function SocialGradeCalculator() {
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  const {
    scoresByTrack,
    updateScores,
    resetScores,
    history,
    addHistoryEntry,
    removeHistoryEntry,
    clearHistory,
  } = useScore();
  
  const track = "social";
  const defaultScores = [0, 0, 0, 0, 0, 0, 0];
  const [open, setOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });
  const [saveMessage, setSaveMessage] = useState("");

  const data = [
    { title: t("khmerLang"), img: p7, max: 125 },
    { title: t("math"), img: p4, max: 75 },
    { title: t("earthScience"), img: p2, max: 50 },
    { title: t("history"), img: p6, max: 75 },
    { title: t("geography"), img: p5, max: 75 },
    { title: t("civics"), img: p3, max: 75 },
    { title: t("foreignLang"), img: p1, max: 50 },
  ];

  const scores = scoresByTrack?.social || defaultScores;

  const totalScore = useMemo(() => {
    // Rule: Total = Sum of first 6 subjects + (Foreign Lang - 25, if > 25)
    const baseSum = scores.slice(0, 6).reduce((sum, s) => sum + s, 0);
    const foreignBonus = Math.max(0, (scores[6] || 0) - 25);
    return baseSum + foreignBonus;
  }, [scores]);

  const handleScoreChange = (index, value) => {
    const max = data[index].max;
    
    if (value === "") {
        const updatedScores = [...scores];
        updatedScores[index] = 0;
        updateScores(track, updatedScores);
        setValidationErrors(prev => ({ ...prev, [index]: null }));
        return;
    }

    let numValue = Number(value);
    if (isNaN(numValue)) numValue = 0;
    
    if (numValue < 0) return; 

    if (numValue > max) {
        setValidationErrors(prev => ({ ...prev, [index]: `Max ${max}` }));
    } else {
        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[index];
            return newErrors;
        });
    }

    const updatedScores = [...scores];
    updatedScores[index] = numValue; 
    updateScores(track, updatedScores);
  };

  function handleOpen() {
    const hasEmpty = scores.some((value, idx) => idx < 6 && value === 0);
    const hasErrors = Object.keys(validationErrors).some(k => validationErrors[k]);
    
    if (hasEmpty || hasErrors) {
      setShowDialog(true);
      return;
    }

    if (gradeDetails.grade !== 'F') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#274c77', '#00e187', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff']
      });
    }

    setOpen(true);
  }

  const handleSaveMonth = () => {
    const hasEmpty = scores.some((value, idx) => idx < 6 && value === 0);
    if (hasEmpty) {
      setShowDialog(true);
      return;
    }
    addHistoryEntry({
      track,
      scores,
      totalScore,
      month,
    });
    setSaveMessage(t("saved"));
    setTimeout(() => setSaveMessage(""), 2000);
  }

  const getBackgroundColor = (index, score) => {
    const max = data[index].max;
    const percentage = (score / max) * 100;

    if (percentage <= 50) return isDark ? "bg-red-800" : "bg-red-400";
    if (percentage <= 70) return isDark ? "bg-yellow-700" : "bg-yellow-400";
    return isDark ? "bg-green-800" : "bg-green-500";
  };

  const getPercentage = (score, index) => {
    return (score * 100) / data[index].max;
  };

  const getGradeDetails = (total) => {
     if (total >= 427.5) return { grade: 'A', color: 'text-red-500', bg: 'bg-red-500' };
     if (total >= 380) return { grade: 'B', color: 'text-pink-500', bg: 'bg-pink-500' };
     if (total >= 332.5) return { grade: 'C', color: 'text-red-700', bg: 'bg-red-700' };
     if (total >= 285) return { grade: 'D', color: 'text-green-600', bg: 'bg-green-600' };
     if (total >= 237.5) return { grade: 'E', color: 'text-blue-500', bg: 'bg-blue-500' };
     return { grade: 'F', color: isDark ? "text-gray-400" : "text-slate-600", bg: 'bg-slate-500' };
  };

  const gradeDetails = getGradeDetails(totalScore);

  return (
    <>
      <SEO pageTitle={t("social")} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          
          {/* Month & Summary Card */}
          <div className={`overflow-hidden rounded-3xl border shadow-lg backdrop-blur-md transition-all ${isDark ? "bg-dark-secondary/80 border-white/10" : "bg-white/80 border-white/50"}`}>
            <div className="p-2 sm:p-4 md:p-8">
              <div className="flex flex-col-reverse justify-between gap-4 md:gap-6 md:flex-row md:items-center">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-blue-200/60">
                      {t("currentTotal")}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2 sm:gap-3">
                      <span className="text-3xl font-black tracking-tight text-slate-800 dark:text-white font-mono sm:text-4xl md:text-5xl">
                        {totalScore}
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 sm:px-3 sm:py-1 sm:text-xs md:text-sm">
                        {t("average")}: {(totalScore / 7).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => document.getElementById('history-section').scrollIntoView({ behavior: 'smooth' })}
                    className={`flex md:hidden h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-95 ${
                      isDark ? "bg-white/5 text-blue-300" : "bg-accent/10 text-accent"
                    }`}
                    title={t("monthlyHistory")}
                  >
                    <FaHistory size={18} />
                  </button>
                </div>

                <div className="flex justify-between items-center gap-3 rounded-2xl ring-1 bg-slate-200/50 p-1 md:p-1.5 dark:bg-white/5 sm:p-2">
                  <div className="px-3">
                    <label className="block text-[8px] sm:text-[10px] font-bold uppercase text-slate-400 dark:text-blue-200/60">
                      {t("month")}
                    </label>
                    <input
                      type="month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="bg-transparent text-xs sm:text-sm font-bold text-slate-700 outline-none dark:text-blue-100"
                    />
                  </div>
                  <button
                    onClick={handleSaveMonth}
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-all hover:scale-105 active:scale-95 ${saveMessage ? "bg-green-500 text-white" : "bg-white shadow-sm text-slate-700 dark:bg-dark-primary dark:text-blue-100"}`}
                    title={t("saveMonth")}
                  >
                    {saveMessage ? <FaSave className="animate-bounce" /> : <FaSave size={18} className="sm:text-[20px]" />}
                  </button>
                  <button 
                    onClick={() => document.getElementById('history-section').scrollIntoView({ behavior: 'smooth' })}
                    className={`hidden md:flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-all hover:scale-105 active:scale-95 ${
                      isDark ? "bg-white/5 text-blue-300" : "bg-accent/10 text-accent"
                    }`}
                    title={t("monthlyHistory")}
                  >
                    <FaHistory size={18} className="sm:text-[20px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Input Grid - Responsive Grid */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.map((item, index) => (
              <div key={index} className="animate-scaleIn" style={{ animationDelay: `${index * 0.05}s` }}>
                <ScoreInputCard
                  {...item}
                  index={index}
                  score={scores[index]}
                  max={item.max}
                  error={validationErrors[index]}
                  onScoreChange={handleScoreChange}
                  percentage={getPercentage(scores[index], index)}
                  color={getBackgroundColor(index, scores[index])}
                />
              </div>
            ))}
          </div>

          {/* Action Area & History */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
            {/* Buttons on the Left */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleOpen}
                className={`group flex items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold shadow-md transition-all active:scale-95 ${
                  isDark 
                    ? "bg-blue-600/90 text-white hover:bg-blue-500" 
                    : "bg-accent/80 text-white hover:bg-accent shadow-accent/20"
                }`}
              >
                <FaCalculator className="transition-transform group-hover:rotate-12" size={18} />
                {t("calculate")}
              </button>
              <button
                onClick={() => { resetScores("social"); setValidationErrors({}); }}
                className={`group flex items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold transition-all active:scale-95 ${
                  isDark 
                    ? "text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10" 
                    : "text-red-500 border border-red-100 bg-white shadow-sm hover:bg-red-50"
                }`}
              >
                <FaRedo className="transition-transform group-hover:rotate-180" size={16} />
                {t("reset")}
              </button>
            </div>

            {/* History Panel - Now on the right with editing */}
            <div className="animate-slideUp" id="history-section">
              <ScoreHistoryPanel
                entries={history}
                track={track}
                language={language}
                t={t}
                onRemove={removeHistoryEntry}
                onClear={clearHistory}
                isDark={isDark}
                onEdit={(entry) => {
                  updateScores(track, entry.scores);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onView={(entry) => {
                  updateScores(track, entry.scores);
                  // Ensure context update reflects before opening modal
                  setTimeout(() => setOpen(true), 50);
                }}
              />
            </div>
          </div>
          
        </div>
      </div>

        {/* Improved Modal */}
        {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 animate-fadeIn bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />
            <div className={`relative w-full max-w-lg overflow-hidden rounded-[2rem] shadow-2xl animate-scaleIn ${isDark ? "bg-dark-secondary" : "bg-white"}`}>
                
                {/* Modal Header */}
                <div className="absolute right-4 top-4 z-10">
                    <button 
                        onClick={() => setOpen(false)}
                        className={`rounded-full p-2 transition-colors ${isDark ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-slate-500"}`}
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                <div className="p-8 text-center bg-pattern">
                    <p className={`text-sm font-bold uppercase tracking-widest ${isDark ? "text-blue-200/60" : "text-slate-400"}`}>
                        {t("score")}
                    </p>
                    <div className={`mt-2 text-8xl font-black tracking-tighter ${gradeDetails.color} drop-shadow-sm`}>
                         <span className="font-mono">{totalScore}</span>
                    </div>
                </div>

                <div className={`px-8 pb-8 pt-4 rounded-t-[2.5rem] -mt-6 relative z-10 border-t ${isDark ? "bg-dark-primary border-white/5" : "bg-slate-50 border-white"}`}>
                    <div className="flex flex-col items-center -mt-16 mb-6">
                        <div className={`flex h-24 w-24 items-center justify-center rounded-3xl text-6xl font-black text-white shadow-xl ${gradeDetails.bg}`}>
                            {gradeDetails.grade}
                        </div>
                        <div className="mt-3 flex flex-col items-center">
                            <p className={`text-lg font-bold ${isDark ? "text-white" : "text-slate-700"}`}>
                                {t("grade")}
                            </p>
                            <span className={`mt-1 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                gradeDetails.grade !== 'F' 
                                    ? "bg-emerald-500/20 text-emerald-500" 
                                    : "bg-red-500/20 text-red-500"
                            }`}>
                                {gradeDetails.grade !== 'F' ? "Passed" : "Failed"}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {data.map((item, idx) => {
                            const score = scores[idx];
                            const percentage = (score / item.max) * 100;
                            let grade = 'F';
                            let color = 'text-slate-400';
                            
                            if (percentage >= 90) { grade = 'A'; color = 'text-red-500'; }
                            else if (percentage >= 80) { grade = 'B'; color = 'text-pink-500'; }
                            else if (percentage >= 70) { grade = 'C'; color = 'text-red-700'; }
                            else if (percentage >= 60) { grade = 'D'; color = 'text-green-600'; }
                            else if (percentage >= 50) { grade = 'E'; color = 'text-blue-500'; }

                            return (
                                <div key={idx} className={`flex items-center justify-between rounded-xl px-4 py-3 ${isDark ? "bg-white/5" : "bg-white shadow-sm"}`}>
                                    <span className={`font-semibold ${isDark ? "text-blue-100" : "text-slate-700"}`}>{item.title}</span>
                                    <div className="flex items-center gap-4">
                                        <span className={`font-mono font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}>{score}</span>
                                        <span className={`font-mono w-6 text-center font-bold ${color}`}>{grade}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                    <button
                        onClick={() => setOpen(false)}
                        className={`mt-8 w-full rounded-2xl py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95 ${gradeDetails.bg}`}
                    >
                        {t("close")}
                    </button>
                </div>

            </div>
        </div>
        )}

      <FeedbackDialog
        open={showDialog}
        title={t("enterScores")}
        message={t("enterScores")}
        actionLabel={t("close")}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
}

export default SocialGradeCalculator;
