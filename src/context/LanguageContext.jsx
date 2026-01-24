import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
    en: {
        appTitle: "Bacii Score",
        science: "Science",
        social: "Social",
        khmerLang: "Khmer",
        math: "Mathematics",
        chemistry: "Chemistry",
        physics: "Physics",
        biology: "Biology",
        history: "History",
        civics: "Civics & Ethics",
        geography: "Geography",
        earthScience: "Earth Science",
        foreignLang: "Foreign Language",
        calculate: "Calculate",
        reset: "Reset",
        close: "Close",
        score: "Score",
        grade: "Grade",
        month: "Month",
        saveMonth: "Save Month",
        saved: "Saved.",
        currentTotal: "Current Total",
        average: "Average / Subject",
        monthlyHistory: "Monthly History",
        clearHistory: "Clear History",
        noHistory: "No history yet.",
        remove: "Remove",
        enterScorePlaceholder: "Enter your score...",
        enterScores: "Please enter all scores correctly!",
        theme: "Theme",
        language: "Language",
        view: "View",
        edit: "Edit",
    },
    km: {
        appTitle: "ពិន្ទុបាក់ឌុប",
        science: "វិទ្យាសាស្រ្ដ",
        social: "សង្គម",
        khmerLang: "អក្សរសាសន៍ខ្មែរ",
        math: "គណិតវិទ្យា",
        chemistry: "គីមីវិទ្យា",
        physics: "រូបវិទ្យា",
        biology: "ជីវះវិទ្យា",
        history: "ប្រវត្ដវិទ្យា",
        civics: "សីលធម៌ និងពលរដ្ឋ",
        geography: "ភូមិវិទ្យា",
        earthScience: "ផែនដីវិទ្យា",
        foreignLang: "ភាសាបរទេស",
        calculate: "គណនា",
        reset: "សម្អាត",
        close: "បិទ",
        score: "ពិន្ទុ",
        grade: "និទ្ទេស",
        month: "ខែ",
        saveMonth: "រក្សាទុកខែនេះ",
        saved: "បានរក្សាទុករួចរាល់។",
        currentTotal: "ពិន្ទុបច្ចុប្បន្ន",
        average: "មធ្យម / មុខវិជ្ជា",
        monthlyHistory: "ប្រវត្តិប្រចាំខែ",
        clearHistory: "លុបប្រវត្តិ",
        noHistory: "មិនមានប្រវត្តិនៅឡើយទេ។",
        remove: "លុប",
        enterScorePlaceholder: "បញ្ចូលពិន្ទុរបស់អ្នក...",
        enterScores: "សូមធ្វើការបញ្ចូលពិន្ទុរបស់អ្នក​ឪ្យបានត្រឹមត្រូវ!",
        theme: "ប្រធានបទ",
        language: "ភាសា",
        view: "មើល",
        edit: "កែប្រែ",
    },
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem("language");
        return saved || "km";
    });

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("lang-en", "lang-km");
        root.classList.add(language === "km" ? "lang-km" : "lang-en");
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(language === "km" ? "en" : "km");
    };

    const t = (key) => translations[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
};
