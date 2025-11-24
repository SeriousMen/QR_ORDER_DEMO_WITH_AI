import { useTranslation } from 'react-i18next';

export const languages = [
  { code: 'ko', name: '한국어', flag: 'KR' },
  { code: 'en', name: 'English', flag: 'US' },
  { code: 'zh', name: '中文', flag: 'CN' },
  { code: 'ja', name: '日本語', flag: 'JP' }
];

export const useLanguage = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };
  
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };
  
  return {
    currentLanguage: i18n.language,
    languages,
    changeLanguage,
    getCurrentLanguage
  };
};