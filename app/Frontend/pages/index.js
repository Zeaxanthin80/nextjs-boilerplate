import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/components.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>MarketPro - Transform Your Digital Marketing</title>
        <meta name="description" content="AI-powered digital marketing platform for entrepreneurs and growing businesses" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.landingPage}>
        {/* Hero Section */}
        <header className={styles.hero}>
          <div className="container">
            <nav className={styles.navigation}>
              <div className={styles.logo}>
                <div className={styles.logoContainer}>
                  <div className={styles.logoIcon}>MP</div>
                  <span className={styles.logoText}>MarketPro</span>
                </div>
              </div>
              <div className={styles.navLinks}>
                <Link href="/auth/login" className="btn btn-glass">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn btn-premium">
                  Get Started Free
                </Link>
              </div>
            </nav>

            <div className={styles.heroContent}>
              <div className={styles.badge}>
                <span className={styles.badgeText}>⭐ #1 Marketing Platform for SMBs</span>
              </div>
              
              <h1 className={styles.heroTitle}>
                Transform Your Business with
                <span className={styles.highlight}> AI-Powered Marketing</span>
              </h1>
              
              <p className={styles.heroSubtitle}>
                Launch data-driven campaigns that convert visitors into customers. 
                Join 50,000+ entrepreneurs scaling their businesses with MarketPro.
              </p>
              
              <div className={styles.heroButtons}>
                <Link href="/campaigns" className="btn btn-premium btn-large">
                  <span className={styles.buttonIcon}>⚡</span>
                  Start Your Campaign
                </Link>
                <Link href="#demo" className="btn btn-glass btn-large">
                  <span className={styles.buttonIcon}>▶</span>
                  Watch Demo
                </Link>
              </div>

              <div className={styles.socialProof}>
                <p className={styles.proofText}>Trusted by industry leaders</p>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>50K+</span>
                    <span className={styles.statLabel}>Active Users</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>300%</span>
                    <span className={styles.statLabel}>Avg. ROI Increase</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>4.9★</span>
                    <span className={styles.statLabel}>User Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section id="features" className={styles.features}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Powerful Features for Modern Marketing</h2>
              <p className={styles.sectionSubtitle}>
                Everything you need to create, launch, and optimize successful marketing campaigns
              </p>
            </div>
            
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>📊</div>
                </div>
                <h3>Advanced Analytics</h3>
                <p>Real-time insights and performance tracking with AI-powered recommendations for optimization.</p>
                <div className={styles.featureStats}>
                  <span>+45% better insights</span>
                </div>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>🎯</div>
                </div>
                <h3>Smart Targeting</h3>
                <p>AI-driven audience segmentation and targeting that reaches the right customers at the right time.</p>
                <div className={styles.featureStats}>
                  <span>+60% conversion rate</span>
                </div>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>🚀</div>
                </div>
                <h3>Multi-Channel Automation</h3>
                <p>Seamlessly manage email, social media, and paid ads from one unified dashboard.</p>
                <div className={styles.featureStats}>
                  <span>Save 10+ hours/week</span>
                </div>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>⚡</div>
                </div>
                <h3>Lightning Fast Setup</h3>
                <p>Launch your first campaign in under 5 minutes with our intuitive campaign builder.</p>
                <div className={styles.featureStats}>
                  <span>5-minute setup</span>
                </div>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>🔒</div>
                </div>
                <h3>Enterprise Security</h3>
                <p>Bank-level security with SOC 2 compliance and GDPR protection for your data.</p>
                <div className={styles.featureStats}>
                  <span>SOC 2 Certified</span>
                </div>
              </div>
              
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>💎</div>
                </div>
                <h3>Premium Support</h3>
                <p>24/7 expert support and dedicated success manager for enterprise customers.</p>
                <div className={styles.featureStats}>
                  <span>24/7 availability</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaContent}>
              <h2>Ready to Scale Your Business?</h2>
              <p>Join thousands of successful entrepreneurs who've transformed their marketing with MarketPro</p>
              <div className={styles.ctaButtons}>
                <Link href="/campaigns" className="btn btn-premium btn-large">
                  Start Free Trial
                </Link>
                <Link href="/demo" className="btn btn-glass btn-large">
                  Schedule Demo
                </Link>
              </div>
              <p className={styles.ctaNote}>No credit card required • 14-day free trial • Cancel anytime</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className="container">
            <div className={styles.footerContent}>
              <div className={styles.footerLogo}>
                <div className={styles.logoContainer}>
                  <div className={styles.logoIcon}>MP</div>
                  <span className={styles.logoText}>MarketPro</span>
                </div>
                <p>Empowering entrepreneurs with AI-powered marketing solutions.</p>
              </div>
              <div className={styles.footerLinks}>
                <div className={styles.footerColumn}>
                  <h4>Product</h4>
                  <Link href="/features">Features</Link>
                  <Link href="/pricing">Pricing</Link>
                  <Link href="/integrations">Integrations</Link>
                </div>
                <div className={styles.footerColumn}>
                  <h4>Company</h4>
                  <Link href="/about">About Us</Link>
                  <Link href="/careers">Careers</Link>
                  <Link href="/contact">Contact</Link>
                </div>
                <div className={styles.footerColumn}>
                  <h4>Resources</h4>
                  <Link href="/blog">Blog</Link>
                  <Link href="/help">Help Center</Link>
                  <Link href="/api">API Docs</Link>
                </div>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p>&copy; 2025 MarketPro. All rights reserved.</p>
              <div className={styles.footerBottomLinks}>
                <Link href="/privacy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
