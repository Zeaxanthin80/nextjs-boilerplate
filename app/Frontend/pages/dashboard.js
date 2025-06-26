import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    activeCampaigns: 12,
    totalClicks: 2847,
    conversionRate: 3.2,
    revenue: 4250
  });

  const [recentCampaigns] = useState([
    { id: 1, name: 'Summer Sale Email', type: 'Email Marketing', status: 'Active', performance: '+15%' },
    { id: 2, name: 'Social Media Boost', type: 'Social Media', status: 'Paused', performance: '+8%' },
    { id: 3, name: 'Google Ads Campaign', type: 'Search Engine', status: 'Active', performance: '+22%' },
  ]);

  return (
    <>
      <Head>
        <title>Dashboard - MarketPro</title>
        <meta name="description" content="Your marketing dashboard" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
        {/* Header */}
        <header style={{ 
          background: 'linear-gradient(135deg, #2563eb 0%, #f97316 100%)',
          color: 'white',
          padding: '20px 0'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>📈 MarketPro Dashboard</h1>
              <p style={{ opacity: 0.9, marginTop: '4px' }}>Welcome back! Here's your marketing overview</p>
            </div>
            <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Link href="/campaigns" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
                📋 Campaigns
              </Link>
              <Link href="/analytics" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
                📈 Analytics
              </Link>
              <Link href="/settings" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
                ⚙️ Settings
              </Link>
              <Link href="/auth/login" className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                🚪 Logout
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container" style={{ padding: '40px 20px' }}>
          {/* Quick Actions */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
              Quick Actions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <Link href="/campaigns" className="btn btn-primary" style={{ 
                padding: '20px', 
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: '12px'
              }}>
                🚀 Create New Campaign
              </Link>
              <Link href="/analytics" className="btn btn-orange" style={{ 
                padding: '20px', 
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: '12px'
              }}>
                📊 View Analytics
              </Link>
              <Link href="/audience" className="btn btn-secondary" style={{ 
                padding: '20px', 
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: '12px'
              }}>
                👥 Manage Audience
              </Link>
            </div>
          </div>

          {/* Metrics Grid */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
              Performance Overview
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                borderRadius: '16px',
                padding: '30px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📊</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '5px' }}>Active Campaigns</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{metrics.activeCampaigns}</div>
              </div>

              <div style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '16px',
                padding: '30px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>👆</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '5px' }}>Total Clicks</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{metrics.totalClicks.toLocaleString()}</div>
              </div>

              <div style={{ 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '16px',
                padding: '30px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🎯</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '5px' }}>Conversion Rate</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{metrics.conversionRate}%</div>
              </div>

              <div style={{ 
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                borderRadius: '16px',
                padding: '30px',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>💰</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '5px' }}>Revenue</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>${metrics.revenue.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Recent Campaigns */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
              Recent Campaigns
            </h2>
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ 
                background: 'linear-gradient(90deg, #2563eb 0%, #f97316 100%)',
                padding: '20px',
                color: 'white'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '20px', fontWeight: 'bold' }}>
                  <div>Campaign Name</div>
                  <div>Type</div>
                  <div>Status</div>
                  <div>Performance</div>
                </div>
              </div>
              {recentCampaigns.map((campaign) => (
                <div key={campaign.id} style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '2fr 1fr 1fr 1fr', 
                  gap: '20px',
                  padding: '20px',
                  borderBottom: '1px solid #e5e7eb',
                  alignItems: 'center'
                }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>{campaign.name}</div>
                  <div style={{ color: '#6b7280' }}>{campaign.type}</div>
                  <div>
                    <span style={{ 
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      background: campaign.status === 'Active' ? '#d1fae5' : '#fef3c7',
                      color: campaign.status === 'Active' ? '#065f46' : '#92400e'
                    }}>
                      {campaign.status}
                    </span>
                  </div>
                  <div style={{ 
                    color: '#10b981',
                    fontWeight: '600'
                  }}>
                    {campaign.performance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips & Recommendations */}
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
              💡 Tips & Recommendations
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div className="card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📧</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
                  Optimize Email Open Rates
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Try A/B testing your subject lines. Personalized subjects increase open rates by 26%.
                </p>
                <Link href="/tips/email" style={{ 
                  color: '#2563eb', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}>
                  Learn more →
                </Link>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📱</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
                  Social Media Engagement
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Post during peak hours (6-9 PM) to maximize engagement with your audience.
                </p>
                <Link href="/tips/social" style={{ 
                  color: '#f97316', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}>
                  Learn more →
                </Link>
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
                  SEO Opportunity
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Add location-based keywords to improve local search visibility by 35%.
                </p>
                <Link href="/tips/seo" style={{ 
                  color: '#2563eb', 
                  textDecoration: 'none', 
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}>
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
