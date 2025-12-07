import type {ReactNode} from 'react';
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';
import { useAuth } from '../components/AuthContext';
import { FaRobot, FaNetworkWired, FaBrain, FaEye } from 'react-icons/fa';

import styles from './index.module.css';

function HeroAnimation() {
  return (
    <div className={styles.heroAnimation}>
      <div className={styles.brainContainer}>
        <div className={styles.brain}>
          <div className={styles.brainParticle}></div>
          <div className={styles.brainParticle}></div>
          <div className={styles.brainParticle}></div>
          <div className={styles.brainConnection}></div>
        </div>
        <div className={styles.robotArm}></div>
      </div>
    </div>
  );
}

function HeroVideo() {
  const {siteConfig} = useDocusaurusContext();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    // Try to play muted (autoplay requirement)
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log('Video autoplay failed:', error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error('Video play error:', err);
            setIsPlaying(false);
          });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video load error:', e);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={styles.heroVideoContainer}>
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          background: 'var(--ifm-background-surface-color)',
          borderRadius: '16px'
        }}>
          <p>Video currently unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.heroVideoContainer}>
      <video
        ref={videoRef}
        className={styles.heroVideo}
        src={`${siteConfig.baseUrl}img/How_to_Build_an_AI_Robot (1).mp4`}
        loop
        playsInline
        muted
        onError={handleError}
      />
      <div className={styles.videoControls}>
        <button
          className={styles.controlButton}
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        <button
          className={styles.controlButton}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const { user } = useAuth();
  
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.heroTitle}>
              <Translate id="homepage.title">Robotext</Translate>
            </Heading>
            <p className={styles.heroSubtitle}>
              <Translate id="homepage.subtitle">
                Master Physical AI, Robotics, and Embodied Intelligence
              </Translate>
            </p>
            <p className={styles.heroDescription}>
              <Translate id="homepage.description">
                From foundational concepts to cutting-edge Vision-Language-Action models.
                Learn by building real robotic systems with hands-on projects.
              </Translate>
            </p>
            <div className={styles.buttons}>
              <Link
                className={clsx('button button--lg', styles.buttonPrimary)}
                to="/docs/intro">
                <Translate id="homepage.getStarted">Get Started 🚀</Translate>
              </Link>
              {!user && (
                <Link
                  className={clsx('button button--lg', styles.buttonSecondary)}
                  to="/signup">
                  <Translate id="homepage.signUp">Sign Up</Translate>
                </Link>
              )}
              {user && (
                <Link
                  className={clsx('button button--lg', styles.buttonSecondary)}
                  to="/dashboard">
                  <Translate id="homepage.dashboard">Go to Dashboard</Translate>
                </Link>
              )}
            </div>
          </div>
          <div className={styles.heroVisual}>
            <HeroAnimation />
            <HeroVideo />
          </div>
        </div>
      </div>
    </header>
  );
}

function FeatureSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          <Translate id="features.title">Why Robotext?</Translate>
        </Heading>
        <div className="row">
          <div className={clsx('col col--3', styles.feature)}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><FaRobot /></div>
              <Heading as="h3"><Translate id="feature.nervousSystem.title">Robotic Nervous System</Translate></Heading>
              <p>
                <Translate id="feature.nervousSystem.desc">
                  Build the foundation - learn how robots sense, process, and respond to their environment.
                </Translate>
              </p>
            </div>
          </div>
          <div className={clsx('col col--3', styles.feature)}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><FaNetworkWired /></div>
              <Heading as="h3"><Translate id="feature.digitalTwin.title">Digital Twin</Translate></Heading>
              <p>
                <Translate id="feature.digitalTwin.desc">
                  Create virtual replicas for safe testing and simulation before deploying to real hardware.
                </Translate>
              </p>
            </div>
          </div>
          <div className={clsx('col col--3', styles.feature)}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><FaBrain /></div>
              <Heading as="h3"><Translate id="feature.brain.title">AI Robot Brain</Translate></Heading>
              <p>
                <Translate id="feature.brain.desc">
                  Implement machine learning and neural networks to give robots intelligent decision-making.
                </Translate>
              </p>
            </div>
          </div>
          <div className={clsx('col col--3', styles.feature)}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><FaEye /></div>
              <Heading as="h3"><Translate id="feature.vla.title">VLA Models</Translate></Heading>
              <p>
                <Translate id="feature.vla.desc">
                  Master the future - multimodal AI that combines vision, language, and physical actions.
                </Translate>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LearningPathSection() {
  return (
    <section className={styles.learningPath}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          <Translate id="learningPath.title">Your Learning Journey</Translate>
        </Heading>
        <div className={styles.pathSteps}>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>1</div>
            <Heading as="h3"><Translate id="learningPath.step1.title">Learn Fundamentals</Translate></Heading>
            <p><Translate id="learningPath.step1.desc">Master robotic systems architecture and sensory processing</Translate></p>
          </div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>2</div>
            <Heading as="h3"><Translate id="learningPath.step2.title">Build Digital Twins</Translate></Heading>
            <p><Translate id="learningPath.step2.desc">Simulate robots in physics engines like MuJoCo and Isaac Sim</Translate></p>
          </div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>3</div>
            <Heading as="h3"><Translate id="learningPath.step3.title">Train AI Brains</Translate></Heading>
            <p><Translate id="learningPath.step3.desc">Deploy Reinforcement Learning and Imitation Learning models</Translate></p>
          </div>
          <div className={styles.pathStep}>
            <div className={styles.stepNumber}>4</div>
            <Heading as="h3"><Translate id="learningPath.step4.title">Deploy to Real World</Translate></Heading>
            <p><Translate id="learningPath.step4.desc">Transfer your policies to physical robots and handle real-world noise</Translate></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Physical AI Education Platform - Master robotics, embodied intelligence, and Vision-Language-Action models">
      <HomepageHeader />
      <main>
        <FeatureSection />
        <LearningPathSection />
      </main>
    </Layout>
  );
}

