import { createContext, FC, useContext, useMemo, useState } from 'react';
import Languages from 'features/language/language.types';
// We shouldn't have this strong dependencies here that
// What happen if we want to pull from a external service instead?
// How do we apply our solid D principle to improve this and make this context simpler but still using these data files
import esTranslations from 'data/i18n.es';
import enTranslations from 'data/i18n.en';
import ptTranslations from 'data/i18n.pt';

export interface LanguageState {
  language: Languages;
  setLanguage: (language: Languages) => void;
  t: (key: string) => string;
}

const initialState = {
  language: 'ENGLISH' as Languages
} as LanguageState;

const LanguageContext = createContext<LanguageState | undefined>(undefined);

export const LanguageProvider: FC = ({ children }) => {
  const [language, setLanguage] = useState<Languages>(initialState.language);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key: string) => {
        switch (language) {
          case 'SPANISH':
            return esTranslations[key];
          case 'ENGLISH':
            return enTranslations[key];
          case 'PORTUGUESE':
            return ptTranslations[key];
          default:
            return key;
        }
      }
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

const useLanguage = (): LanguageState => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default useLanguage;
