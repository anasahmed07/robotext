import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './LanguageToggle.module.css';

/**
 * LanguageToggle component for switching between English and Urdu
 * Integrates with Docusaurus i18n system
 */
export default function LanguageToggle(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const location = useLocation();
  const currentLocale = i18n.currentLocale;

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ur' : 'en';
    const baseUrl = i18n.defaultLocale === newLocale ? '/robotext/' : `/robotext/${newLocale}/`;
    
    // Get the current path without locale prefix
    let currentPath = location.pathname;
    
    // Remove current locale from path
    const localePattern = new RegExp(`^/robotext/(${i18n.locales.join('|')})/`);
    currentPath = currentPath.replace(localePattern, '/robotext/');
    
    // Remove base URL to get relative path
    currentPath = currentPath.replace('/robotext/', '');
    
    // Construct new URL with new locale
    const newPath = currentPath ? `${baseUrl}${currentPath}` : baseUrl;
    
    window.location.href = newPath;
  };

  return (
    <button
      onClick={toggleLanguage}
      className={styles.languageToggle}
      aria-label={currentLocale === 'en' ? 'Switch to Urdu' : 'Switch to English'}
      title={currentLocale === 'en' ? 'اردو میں دیکھیں' : 'View in English'}
    >
      <span className={styles.languageIcon}>🌐</span>
      <span className={styles.languageText}>
        {currentLocale === 'en' ? 'اردو' : 'English'}
      </span>
    </button>
  );
}
