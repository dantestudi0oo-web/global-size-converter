import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 1. locales 폴더에 있는 파일들을 import 하세요 (경로는 실제 폴더 위치에 맞게 수정)
import en from './locales/en.json'; // 또는 './public/locales/en.json'
import ko from './locales/ko.json';
import ja from './locales/ja.json';
import zh from './locales/zh.json';
import ru from './locales/ru.json';

// 2. resources 객체를 이렇게 간단하게 바꿉니다
const resources = {
  en: { translation: en },
  ko: { translation: ko },
  ja: { translation: ja },
  zh: { translation: zh },
  ru: { translation: ru },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['navigator', 'htmlTag'],
      caches: [],
    }
  });

export default i18n;