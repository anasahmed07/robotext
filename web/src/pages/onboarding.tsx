import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useHistory, useLocation } from '@docusaurus/router';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';
import styles from './onboarding.module.css';

interface OnboardingFormData {
  programmingLanguages: string[];
  rosFamiliarity: 'Beginner' | 'Intermediate' | 'Advanced';
  roboticsKnowledge: 'Beginner' | 'Intermediate' | 'Advanced';
  hardwareSpecs: {
    hasRobot: boolean;
    robotType?: string;
    hasGPU: boolean;
    gpuType?: string;
  };
}

interface ValidationErrors {
  programmingLanguages?: string;
  rosFamiliarity?: string;
  roboticsKnowledge?: string;
  general?: string;
}

const PROGRAMMING_LANGUAGES = [
  'Python',
  'C++',
  'JavaScript/TypeScript',
  'Java',
  'MATLAB',
  'Other',
];

const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export default function Onboarding(): JSX.Element {
  const history = useHistory();
  const location = useLocation();
  const locale = location.pathname.startsWith('/ur/') ? '/ur' : '';
  const { user, profile, loading, checkSession } = useAuth();
  const [formData, setFormData] = useState<OnboardingFormData>({
    programmingLanguages: [],
    rosFamiliarity: 'Beginner',
    roboticsKnowledge: 'Beginner',
    hardwareSpecs: {
      hasRobot: false,
      hasGPU: false,
    },
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      history.push(`/robotext${locale}/signup`);
    }
  }, [loading, user, history, locale]);

  // Redirect if onboarding already completed
  useEffect(() => {
    if (!loading && user && profile) {
      history.push(`/robotext${locale}/docs/intro`);
    }
  }, [loading, user, profile, history, locale]);

  // Show loading state while checking auth
  if (loading || !user) {
    return (
      <Layout title="Complete Your Profile">
        <div className={styles.onboardingContainer}>
          <div className={styles.onboardingCard}>
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const handleLanguageToggle = (language: string) => {
    setFormData((prev) => ({
      ...prev,
      programmingLanguages: prev.programmingLanguages.includes(language)
        ? prev.programmingLanguages.filter((lang) => lang !== language)
        : [...prev.programmingLanguages, language],
    }));
    // Clear error when user selects a language
    if (errors.programmingLanguages) {
      setErrors((prev) => ({ ...prev, programmingLanguages: undefined }));
    }
  };

  const handleProficiencyChange = (
    field: 'rosFamiliarity' | 'roboticsKnowledge',
    value: 'Beginner' | 'Intermediate' | 'Advanced'
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleHardwareToggle = (field: 'hasRobot' | 'hasGPU') => {
    setFormData((prev) => ({
      ...prev,
      hardwareSpecs: {
        ...prev.hardwareSpecs,
        [field]: !prev.hardwareSpecs[field],
        // Clear related text field when toggling off
        ...(field === 'hasRobot' && prev.hardwareSpecs[field] ? { robotType: undefined } : {}),
        ...(field === 'hasGPU' && prev.hardwareSpecs[field] ? { gpuType: undefined } : {}),
      },
    }));
  };

  const handleHardwareTextChange = (field: 'robotType' | 'gpuType', value: string) => {
    setFormData((prev) => ({
      ...prev,
      hardwareSpecs: {
        ...prev.hardwareSpecs,
        [field]: value,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (formData.programmingLanguages.length === 0) {
      newErrors.programmingLanguages = 'Please select at least one programming language';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

  const API_URL = typeof window !== 'undefined' 
    ? (window as any).REACT_APP_API_URL || 'http://localhost:4000'
    : 'http://localhost:4000';    try {
      const response = await axios.post(
        `${API_URL}/api/user/onboarding`,
        formData,
        { withCredentials: true }
      );

      // Refresh session to get updated profile
      await checkSession();
      // Redirect to course introduction
      history.push(`/robotext${locale}/docs/intro`);
    } catch (error: any) {
      console.error('Onboarding error:', error);

      if (error.response?.status === 401) {
        setErrors({ general: 'Session expired. Please login again.' });
        setTimeout(() => history.push(`/robotext${locale}/login`), 2000);
      } else if (error.response?.data?.error) {
        setErrors({ general: error.response.data.error });
      } else if (error.response?.data?.details) {
        // Zod validation errors
        const zodErrors: ValidationErrors = {};
        error.response.data.details.forEach((detail: any) => {
          const field = detail.path?.[0];
          if (field) {
            zodErrors[field as keyof ValidationErrors] = detail.message;
          }
        });
        setErrors(zodErrors);
      } else {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout
      title="Complete Your Profile"
      description="Set up your learning profile to personalize your Robotext experience"
    >
      <div className={styles.onboardingContainer}>
        <div className={styles.onboardingCard}>
          <h1 className={styles.onboardingTitle}>Complete Your Profile</h1>
          <p className={styles.onboardingSubtitle}>
            Help us personalize your learning experience
          </p>

          {errors.general && (
            <div className={styles.errorAlert} role="alert">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.onboardingForm}>
            {/* Programming Languages */}
            <div className={styles.formSection}>
              <label className={styles.sectionLabel}>
                Programming Languages <span className={styles.required}>*</span>
              </label>
              <p className={styles.sectionDescription}>
                Which programming languages are you comfortable with?
              </p>
              <div className={styles.checkboxGrid}>
                {PROGRAMMING_LANGUAGES.map((lang) => (
                  <label key={lang} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.programmingLanguages.includes(lang)}
                      onChange={() => handleLanguageToggle(lang)}
                      className={styles.checkbox}
                      disabled={isLoading}
                    />
                    <span className={styles.checkboxText}>{lang}</span>
                  </label>
                ))}
              </div>
              {errors.programmingLanguages && (
                <span className={styles.errorText}>{errors.programmingLanguages}</span>
              )}
            </div>

            {/* ROS Familiarity */}
            <div className={styles.formSection}>
              <label className={styles.sectionLabel}>ROS Familiarity</label>
              <p className={styles.sectionDescription}>
                How familiar are you with Robot Operating System (ROS)?
              </p>
              <div className={styles.radioGroup}>
                {PROFICIENCY_LEVELS.map((level) => (
                  <label key={level} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="rosFamiliarity"
                      value={level}
                      checked={formData.rosFamiliarity === level}
                      onChange={(e) =>
                        handleProficiencyChange('rosFamiliarity', e.target.value as any)
                      }
                      className={styles.radio}
                      disabled={isLoading}
                    />
                    <span className={styles.radioText}>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Robotics Knowledge */}
            <div className={styles.formSection}>
              <label className={styles.sectionLabel}>Robotics Knowledge</label>
              <p className={styles.sectionDescription}>
                What's your overall experience with robotics?
              </p>
              <div className={styles.radioGroup}>
                {PROFICIENCY_LEVELS.map((level) => (
                  <label key={level} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="roboticsKnowledge"
                      value={level}
                      checked={formData.roboticsKnowledge === level}
                      onChange={(e) =>
                        handleProficiencyChange('roboticsKnowledge', e.target.value as any)
                      }
                      className={styles.radio}
                      disabled={isLoading}
                    />
                    <span className={styles.radioText}>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Hardware Specs */}
            <div className={styles.formSection}>
              <label className={styles.sectionLabel}>Hardware Availability</label>
              <p className={styles.sectionDescription}>
                Tell us about your hardware setup (optional)
              </p>

              <div className={styles.hardwareGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.hardwareSpecs.hasRobot}
                    onChange={() => handleHardwareToggle('hasRobot')}
                    className={styles.checkbox}
                    disabled={isLoading}
                  />
                  <span className={styles.checkboxText}>I have access to a robot</span>
                </label>
                {formData.hardwareSpecs.hasRobot && (
                  <input
                    type="text"
                    placeholder="Robot type (e.g., TurtleBot3, Franka Emika)"
                    value={formData.hardwareSpecs.robotType || ''}
                    onChange={(e) => handleHardwareTextChange('robotType', e.target.value)}
                    className={styles.textInput}
                    disabled={isLoading}
                  />
                )}
              </div>

              <div className={styles.hardwareGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.hardwareSpecs.hasGPU}
                    onChange={() => handleHardwareToggle('hasGPU')}
                    className={styles.checkbox}
                    disabled={isLoading}
                  />
                  <span className={styles.checkboxText}>I have access to a GPU</span>
                </label>
                {formData.hardwareSpecs.hasGPU && (
                  <input
                    type="text"
                    placeholder="GPU type (e.g., NVIDIA RTX 3080)"
                    value={formData.hardwareSpecs.gpuType || ''}
                    onChange={(e) => handleHardwareTextChange('gpuType', e.target.value)}
                    className={styles.textInput}
                    disabled={isLoading}
                  />
                )}
              </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Complete Profile'}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
