import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import Link from '@docusaurus/Link';
import styles from './UserNav.module.css';
import clsx from 'clsx';

export default function UserNav(): JSX.Element {
  const { user, signOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/robotext/docs/intro';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div className={styles.loadingPlaceholder} />;
  }

  if (!user) {
    return (
      <div className={styles.authButtons}>
        <Link to="/login" className={clsx(styles.authButton, styles.loginButton)}>
          Login
        </Link>
        <Link to="/signup" className={clsx(styles.authButton, styles.signupButton)}>
          Sign Up
        </Link>
      </div>
    );
  }

  const displayName = user.name || user.email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className={styles.userMenu} ref={dropdownRef}>
      <button 
        className={styles.userTrigger} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className={styles.avatar}>
          {initial}
        </div>
        <span className={styles.userName}>{displayName}</span>
        <svg className={clsx(styles.chevron, isOpen && styles.chevronOpen)} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <div className={styles.dropdownUserEmail}>{user.email}</div>
          </div>
          <div className={styles.dropdownDivider} />
          <button onClick={handleLogout} className={styles.dropdownItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.logoutIcon}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
