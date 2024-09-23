import i18n from "i18next";

import en from "@translations/en";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: en,
  },
};

i18n
  // pass the i18n instance to react-i18next
  .use(initReactI18next)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(LanguageDetector)
  .init({
    resources,
    lng: "en",

    // we do not use keys in form messages.welcome
    keySeparator: ".",

    interpolation: {
      // react already safes from xss
      escapeValue: false,
    },
  });
