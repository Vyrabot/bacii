import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const SEO = ({ pageTitle }) => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${pageTitle ? pageTitle + " | " : ""}${t("appTitle")}`;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }
    metaDescription.content = t("appSubtitle");

  }, [pageTitle, t]);

  return null;
};

export default SEO;
