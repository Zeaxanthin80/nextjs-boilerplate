import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/components.module.css';

export default function Campaigns() {
  const router = useRouter();
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaignTypes = [
    {
      id: 'email-marketing',
      name: 'Email Marketing',
      icon: '📧',
      description: 'Build and nurture customer relationships through targeted email campaigns.',
      features: [
        'Automated email sequences',
        'Advanced segmentation',
        'A/B testing capabilities',
        'Detailed analytics & reporting'
      ],
      bestFor: 'Customer retention, lead nurturing, product announcements',
      pricing: 'Starting at $29/month'
    },
    {
      id: 'social-media',
      name: 'Social Media Marketing',
      icon: '📱',
      description: 'Engage your audience across all major social media platforms.',
      features: [
        'Multi-platform posting',
        'Content calendar management',
        'Social media analytics',
        'Influencer collaboration tools'
      ],
      bestFor: 'Brand awareness, community building, engagement',
      pricing: 'Starting at $39/month'
    },
    {
      id: 'search-engine-marketing',
      name: 'Search Engine Marketing (SEM)',
      icon: '🔍',
      description: 'Drive targeted traffic through Google Ads and search optimization.',
      features: [
        'Google Ads management',
        'Keyword research & optimization',
        'Landing page optimization',
        'ROI tracking & reporting'
      ],
      bestFor: 'Immediate traffic, lead generation, sales',
      pricing: 'Starting at $49/month'
    },
    {
      id: 'content-marketing',
      name: 'Content Marketing',
      icon: '📝',
      description: 'Create valuable content that attracts and converts your target audience.',
      features: [
        'Content strategy planning',
        'Blog post optimization',
        'Video marketing tools',
        'Content performance analytics'
      ],
      bestFor: 'SEO, thought leadership, long-term growth',
      pricing: 'Starting at $35/month'
    },
    {
      id: 'influencer-marketing',
      name: 'Influencer Marketing',
      icon: '👥',
      description: 'Partner with influencers to expand your reach and credibility.',
      features: [
        'Influencer discovery platform',
        'Campaign management tools',
        'Performance tracking',
        'ROI measurement'
      ],
      bestFor: 'Brand awareness, credibility, reaching new audiences',
      pricing: 'Starting at $59/month'
    },
    {
      id: 'affiliate-marketing',
      name: 'Affiliate Marketing',
      icon: '🤝',
      description: 'Build a network of partners to promote your products and services.',
      features: [
        'Affiliate recruitment tools',
        'Commission tracking',
        'Performance dashboards',
        'Automated payouts'
      ],
      bestFor: 'Sales growth, partnership building, scalable revenue',
      pricing: 'Starting at $45/month'
    },
    {
      id: 'video-marketing',
      name: 'Video Marketing',
      icon: '🎬',
      description: 'Create compelling video content that drives engagement and conversions.',
      features: [
        'Video creation tools',
        'Multi-platform distribution',
        'Video analytics',
        'Live streaming capabilities'
      ],
      bestFor: 'Product demos, storytelling, high engagement',
      pricing: 'Starting at $55/month'
    },
    {
      id: 'retargeting',
      name: 'Retargeting Campaigns',
      icon: '🎯',
      description: 'Re-engage visitors who showed interest but didn\'t convert.',
      features: [
        'Pixel-based retargeting',
        'Dynamic product ads',
        'Cross-platform campaigns',
        'Conversion optimization'
      ],
      bestFor: 'Recovering lost sales, increasing conversions',
      pricing: 'Starting at $42/month'
    }
  ];

  const handleCampaignSelect = (campaignType) => {
    setSelectedCampaign(campaignType);
    // Navigate to campaign setup page
    router.push(`/campaign-setup/${campaignType.id}`);
  };

  return (
    <>
      <Head>
        <title>Choose Your Campaign Type - MarketPro</title>
        <meta name="description" content="Select the perfect digital marketing campaign for your business goals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.campaignSelectionPage}>
        {/* Header */}
        <div className="container">
          <Link href="/" className="btn btn-secondary mb-6">
            ← Back to Home
          </Link>
          
          <div className={styles.campaignHeader}>
            <h1 className={styles.campaignTitle}>
              Choose Your
              <span style={{color: '#fbbf24'}}> Marketing Campaign</span>
            </h1>
            <p className={styles.campaignSubtitle}>
              Select the perfect campaign type for your business goals. 
              Each campaign is designed to maximize your ROI and grow your business.
            </p>
          </div>

          {/* Campaign Grid */}
          <div className={styles.campaignGrid}>
            {campaignTypes.map((campaign) => (
              <div
                key={campaign.id}
                className={styles.campaignCard}
                onClick={() => handleCampaignSelect(campaign)}
              >
                <div className={styles.campaignIcon}>
                  {campaign.icon}
                </div>
                
                <h3 className={styles.campaignName}>
                  {campaign.name}
                </h3>
                
                <p className={styles.campaignDescription}>
                  {campaign.description}
                </p>
                
                <ul className={styles.campaignFeatures}>
                  {campaign.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                
                <div className="mt-4 mb-4">
                  <p style={{fontSize: '0.9rem', color: '#64748b', marginBottom: '8px'}}>
                    <strong>Best for:</strong> {campaign.bestFor}
                  </p>
                  <p style={{fontSize: '1rem', color: '#f97316', fontWeight: '600'}}>
                    {campaign.pricing}
                  </p>
                </div>
                
                <button className={styles.campaignButton}>
                  Get Started with {campaign.name}
                </button>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="text-center mt-8">
            <div className="card" style={{maxWidth: '800px', margin: '0 auto'}}>
              <h3 style={{color: '#1e293b', marginBottom: '16px'}}>
                🎯 Not Sure Which Campaign Is Right for You?
              </h3>
              <p style={{color: '#64748b', lineHeight: '1.6', marginBottom: '20px'}}>
                Our marketing experts can help you choose the perfect campaign type based on your 
                business goals, target audience, and budget. Get a free consultation today!
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/consultation" className="btn btn-primary">
                  📞 Free Consultation
                </Link>
                <Link href="/quiz" className="btn btn-orange">
                  🧠 Take Our Quiz
                </Link>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="mt-8 text-center">
            <h3 style={{color: 'white', fontSize: '2rem', marginBottom: '32px'}}>
              Success Stories from Our Clients
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div style={{fontSize: '2rem', marginBottom: '16px'}}>🛍️</div>
                <h4 style={{color: '#1e293b', marginBottom: '8px'}}>Sarah's Boutique</h4>
                <p style={{color: '#64748b', fontSize: '0.9rem'}}>
                  "Email marketing increased our repeat purchases by 340% in just 3 months!"
                </p>
              </div>
              <div className="card">
                <div style={{fontSize: '2rem', marginBottom: '16px'}}>🍕</div>
                <h4 style={{color: '#1e293b', marginBottom: '8px'}}>Tony's Pizza</h4>
                <p style={{color: '#64748b', fontSize: '0.9rem'}}>
                  "Social media campaigns brought 200+ new customers last month."
                </p>
              </div>
              <div className="card">
                <div style={{fontSize: '2rem', marginBottom: '16px'}}>💼</div>
                <h4 style={{color: '#1e293b', marginBottom: '8px'}}>Tech Solutions Inc</h4>
                <p style={{color: '#64748b', fontSize: '0.9rem'}}>
                  "SEM campaigns generated $50K in new business within 6 weeks."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
