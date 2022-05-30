import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ru from './locales/ru.json';

const resources = {
  en,
  ru,
};
export const availableLanguages = Object.keys(resources);
i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    // логирование ошибок и изменений языка
    debug: false,
    // Стандартный язык
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    defaultNS: 'common',
    resources,
  });

export default i18n;
