import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const campaignData = {
  'email-marketing': {
    title: 'Email Marketing Campaign',
    icon: '📧',
    description: 'Create personalized email campaigns that drive engagement and conversions',
    color: '#2563eb'
  },
  'social-media': {
    title: 'Social Media Marketing Campaign',
    icon: '📱',
    description: 'Engage your audience across all social media platforms',
    color: '#f97316'
  },
  'search-engine': {
    title: 'Search Engine Marketing Campaign',
    icon: '🔍',
    description: 'Get found on Google and drive qualified traffic',
    color: '#2563eb'
  },
  'content-marketing': {
    title: 'Content Marketing Campaign',
    icon: '📝',
    description: 'Build authority with valuable content that converts',
    color: '#f97316'
  },
  'influencer-marketing': {
    title: 'Influencer Marketing Campaign',
    icon: '🤳',
    description: 'Partner with influencers to expand your reach',
    color: '#2563eb'
  },
  'video-marketing': {
    title: 'Video Marketing Campaign',
    icon: '🎥',
    description: 'Create compelling video content that engages',
    color: '#f97316'
  }
};

export default function CampaignSetup() {
  const router = useRouter();
  const { campaignType } = router.query;
  
  const [formData, setFormData] = useState({
    campaignName: '',
    budget: '',
    duration: '30',
    targetAudience: '',
    goals: '',
    description: ''
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const campaign = campaignData[campaignType] || campaignData['email-marketing'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Campaign created:', { campaignType, ...formData });
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating campaign:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Set Up {campaign.title} - MarketPro</title>
        <meta name="description" content={campaign.description} />
      </Head>

      <div style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2563eb 0%, #f97316 100%)'
      }}>
        {/* Header */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '20px 0'
        }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/campaigns" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500'
            }}>
              ← Back to Campaigns
            </Link>
            <div style={{ flex: 1, textAlign: 'center', color: 'white' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
                {campaign.icon} {campaign.title}
              </h1>
              <p style={{ opacity: 0.9, marginTop: '5px' }}>{campaign.description}</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="container" style={{ padding: '30px 20px 0' }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: step >= 1 ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>1</div>
                <span style={{ fontWeight: step === 1 ? 'bold' : 'normal' }}>Basic Info</span>
              </div>
              
              <div style={{ flex: 1, height: '2px', background: 'rgba(255, 255, 255, 0.3)', margin: '0 20px' }}>
                <div style={{ 
                  width: step >= 2 ? '100%' : '0%',
                  height: '100%',
                  background: '#10b981',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: step >= 2 ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>2</div>
                <span style={{ fontWeight: step === 2 ? 'bold' : 'normal' }}>Target & Budget</span>
              </div>
              
              <div style={{ flex: 1, height: '2px', background: 'rgba(255, 255, 255, 0.3)', margin: '0 20px' }}>
                <div style={{ 
                  width: step >= 3 ? '100%' : '0%',
                  height: '100%',
                  background: '#10b981',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: step >= 3 ? '#10b981' : 'rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>3</div>
                <span style={{ fontWeight: step === 3 ? 'bold' : 'normal' }}>Review & Launch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="container" style={{ padding: '0 20px 40px' }}>
          <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '40px' }}>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px', color: '#1f2937' }}>
                    Campaign Basic Information
                  </h2>
                  
                  <div className="form-group">
                    <label htmlFor="campaignName" className="form-label">
                      Campaign Name *
                    </label>
                    <input
                      id="campaignName"
                      name="campaignName"
                      type="text"
                      className="form-input"
                      placeholder="Enter a memorable name for your campaign"
                      value={formData.campaignName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description" className="form-label">
                      Campaign Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-input"
                      rows="4"
                      placeholder="Describe what you want to achieve with this campaign"
                      value={formData.description}
                      onChange={handleChange}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="goals" className="form-label">
                      Primary Goal *
                    </label>
                    <select
                      id="goals"
                      name="goals"
                      className="form-input"
                      value={formData.goals}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your main goal</option>
                      <option value="brand-awareness">🎯 Increase Brand Awareness</option>
                      <option value="lead-generation">📈 Generate Leads</option>
                      <option value="sales">💰 Drive Sales</option>
                      <option value="engagement">💬 Boost Engagement</option>
                      <option value="traffic">🚀 Increase Website Traffic</option>
                      <option value="retention">🔄 Customer Retention</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Target & Budget */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px', color: '#1f2937' }}>
                    Target Audience & Budget
                  </h2>
                  
                  <div className="form-group">
                    <label htmlFor="targetAudience" className="form-label">
                      Target Audience *
                    </label>
                    <select
                      id="targetAudience"
                      name="targetAudience"
                      className="form-input"
                      value={formData.targetAudience}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your target audience</option>
                      <option value="18-25">👥 Young Adults (18-25)</option>
                      <option value="26-35">💼 Young Professionals (26-35)</option>
                      <option value="36-45">🏡 Established Adults (36-45)</option>
                      <option value="46-55">👨‍💼 Experienced Professionals (46-55)</option>
                      <option value="55+">👴 Mature Adults (55+)</option>
                      <option value="all">🌍 All Demographics</option>
                    </select>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                      <label htmlFor="budget" className="form-label">
                        Monthly Budget (USD) *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        className="form-input"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select budget range</option>
                        <option value="100-500">$100 - $500</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-2500">$1,000 - $2,500</option>
                        <option value="2500-5000">$2,500 - $5,000</option>
                        <option value="5000+">$5,000+</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="duration" className="form-label">
                        Campaign Duration (days) *
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        className="form-input"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                      >
                        <option value="7">1 Week</option>
                        <option value="14">2 Weeks</option>
                        <option value="30">1 Month</option>
                        <option value="60">2 Months</option>
                        <option value="90">3 Months</option>
                        <option value="365">1 Year</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ 
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '20px'
                  }}>
                    <h4 style={{ color: '#374151', marginBottom: '8px' }}>💡 Budget Recommendation</h4>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                      For {campaignType?.replace('-', ' ')} campaigns, we recommend starting with at least $500/month 
                      for optimal results. This allows for proper testing and scaling.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Launch */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '30px', color: '#1f2937' }}>
                    Review & Launch Campaign
                  </h2>
                  
                  <div style={{ 
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '30px'
                  }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
                      Campaign Summary
                    </h3>
                    
                    <div style={{ display: 'grid', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Campaign Type:</span>
                        <span style={{ fontWeight: '600' }}>{campaign.title}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Campaign Name:</span>
                        <span style={{ fontWeight: '600' }}>{formData.campaignName}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Primary Goal:</span>
                        <span style={{ fontWeight: '600' }}>{formData.goals}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Target Audience:</span>
                        <span style={{ fontWeight: '600' }}>{formData.targetAudience}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Monthly Budget:</span>
                        <span style={{ fontWeight: '600' }}>${formData.budget}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#6b7280' }}>Duration:</span>
                        <span style={{ fontWeight: '600' }}>{formData.duration} days</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ 
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '30px'
                  }}>
                    <h4 style={{ color: '#065f46', marginBottom: '8px' }}>🚀 Ready to Launch!</h4>
                    <p style={{ color: '#047857', fontSize: '0.9rem', margin: 0 }}>
                      Your campaign is configured and ready to go. Click "Launch Campaign" to start reaching your audience!
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '1px solid #e5e7eb'
              }}>
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={step === 1}
                  className="btn btn-secondary"
                  style={{ 
                    opacity: step === 1 ? 0.5 : 1,
                    cursor: step === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  ← Previous
                </button>

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-orange"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn btn-orange ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Launching Campaign... 🚀' : 'Launch Campaign 🚀'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
