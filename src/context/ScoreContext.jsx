import React, { createContext, useContext, useState, useEffect } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
    const defaultScores = [0, 0, 0, 0, 0, 0, 0];
    const [scoresByTrack, setScoresByTrack] = useState(() => {
        const saved = localStorage.getItem("scoresByTrack");
        return saved
            ? JSON.parse(saved)
            : { science: defaultScores, social: defaultScores };
    });

    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem("scoreHistory");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("scoresByTrack", JSON.stringify(scoresByTrack));
    }, [scoresByTrack]);

    useEffect(() => {
        localStorage.setItem("scoreHistory", JSON.stringify(history));
    }, [history]);

    const updateScores = (track, newScores) => {
        setScoresByTrack((prev) => ({ ...prev, [track]: newScores }));
    };

    const resetScores = (track) => {
        setScoresByTrack((prev) => ({ ...prev, [track]: defaultScores }));
    };

    const addHistoryEntry = ({ track, scores, totalScore, month }) => {
        const entry = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            track,
            scores,
            totalScore,
            month,
            date: new Date().toISOString(),
        };
        setHistory((prev) => [entry, ...prev]);
    };

    const removeHistoryEntry = (id) => {
        setHistory((prev) => prev.filter((entry) => entry.id !== id));
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <ScoreContext.Provider
            value={{
                scoresByTrack,
                updateScores,
                resetScores,
                history,
                addHistoryEntry,
                removeHistoryEntry,
                clearHistory,
            }}
        >
            {children}
        </ScoreContext.Provider>
    );
};

export const useScore = () => {
    const context = useContext(ScoreContext);
    if (!context) {
        throw new Error("useScore must be used within ScoreProvider");
    }
    return context;
};
