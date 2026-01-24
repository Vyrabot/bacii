import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ScoreProvider } from "./context/ScoreContext";
import MainNavigation from "./components/MainNavigation";
import ScienceGradeCalculator from "./components/ScienceGradeCalculator";
import SocialGradeCalculator from "./components/SocialGradeCalculator";
import AppFooter from "./components/AppFooter";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ScoreProvider>
          <BrowserRouter>
            <MainNavigation />
            <Routes>
              <Route path="/" index element={<ScienceGradeCalculator />} />
              <Route path="/home2" element={<SocialGradeCalculator />} />
            </Routes>
            <AppFooter />
          </BrowserRouter>
        </ScoreProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
