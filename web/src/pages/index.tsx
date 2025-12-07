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
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    // Try to play with audio, fallback to muted if blocked
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay with audio was blocked, try muted
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play()
                .then(() => {
                  setIsPlaying(true);
                })
                .catch(() => {
                  setIsPlaying(false);
                });
            }
          });
      }
    }
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <div className={styles.heroVideoContainer}>
      <video
        ref={videoRef}
        className={styles.heroVideo}
        src="/img/How_to_Build_an_AI_Robot (1).mp4"
        loop
        playsInline
        onClick={handleVideoClick}
        aria-label="Promotional video: How to Build an AI Robot. Click to play or pause."
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleVideoClick();
          }
        }}
      />
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

