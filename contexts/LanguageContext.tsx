// contexts/LanguageContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'am';

interface LanguageContextType {
  language: Language;
  isAmharic: boolean;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    loadLanguageSetting();
  }, []);

  const loadLanguageSetting = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('app_language');
      if (savedLanguage) {
        setLanguage(savedLanguage as Language);
      }
    } catch (error) {
      console.error('Error loading language setting:', error);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'am' : 'en';
    setLanguage(newLanguage);
    AsyncStorage.setItem('app_language', newLanguage);
  };

  const updateLanguage = (lang: Language) => {
    setLanguage(lang);
    AsyncStorage.setItem('app_language', lang);
  };

  const value = {
    language,
    isAmharic: language === 'am',
    toggleLanguage,
    setLanguage: updateLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};