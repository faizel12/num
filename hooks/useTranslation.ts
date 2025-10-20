// // hooks/useTranslation.ts
// import { useLanguage } from '../contexts/LanguageContext';

// // Your translation strings
// const translations = {
//   en: {
//     home: 'Home',
//     settings: 'Settings',
//     save: 'Save',
//     cancel: 'Cancel',
//     delete: 'Delete',
//     edit: 'Edit',
//     // Add all your app strings here
//   },
//   am: {
//     home: 'መነሻ',
//     settings: 'ቅንብሮች',
//     save: 'አስቀምጥ',
//     cancel: 'ተወ',
//     delete: 'አጥፋ',
//     edit: 'አርትዕ',
//     // Amharic translations
//   },
// };

// export const useTranslation = () => {
//   const { language } = useLanguage();
  
//   const t = (key: keyof typeof translations.en) => {
//     return translations[language][key] || key;
//   };

//   return { t, language };
// };

// hooks/useTranslation.ts
import { useLanguage } from '../contexts/LanguageContext';
import { commonTranslations } from '../translations/common';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: keyof typeof commonTranslations.en, params?: Record<string, string>) => {
    let text = commonTranslations[language][key] || key;
    
    // Replace placeholders like {count}
    if (params) {
      Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
      });
    }
    
    return text;
  };

  return { t, language };
};