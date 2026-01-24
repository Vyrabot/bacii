import React from "react";

function FeedbackDialog({ open, title, message, actionLabel, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/90 p-5 text-slate-700 shadow-xl dark:bg-dark-secondary/90 dark:text-blue-100">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-blue-200/70">
          {message}
        </p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:text-accent dark:border-white/10 dark:text-blue-100"
            type="button"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackDialog;
