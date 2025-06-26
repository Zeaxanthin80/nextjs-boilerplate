import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally call your registration API
      console.log('Registration data:', formData);
      
      // Redirect to campaigns page on successful registration
      router.push('/campaigns');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - MarketPro</title>
        <meta name="description" content="Create your MarketPro account" />
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '20px',
        background: 'linear-gradient(135deg, #2563eb 0%, #f97316 100%)'
      }}>
        <div style={{ maxWidth: '450px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
              📈 MarketPro
            </Link>
            <h2 style={{ 
              marginTop: '20px', 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              color: 'white',
              marginBottom: '10px'
            }}>
              Create Your Account
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}>
              Start your marketing journey today
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {errors.submit && (
                <div style={{ 
                  background: '#fef2f2', 
                  border: '1px solid #fecaca', 
                  color: '#dc2626', 
                  padding: '12px 16px', 
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  {errors.submit}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{ fontSize: '16px' }}
                />
                {errors.name && (
                  <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#dc2626' }}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ fontSize: '16px' }}
                />
                {errors.email && (
                  <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#dc2626' }}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ fontSize: '16px' }}
                />
                {errors.phone && (
                  <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#dc2626' }}>
                    {errors.phone}
                  </p>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ fontSize: '16px' }}
                  />
                  {errors.password && (
                    <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#dc2626' }}>
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{ fontSize: '16px' }}
                  />
                  {errors.confirmPassword && (
                    <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#dc2626' }}>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  style={{ marginTop: '2px' }}
                />
                <label htmlFor="terms" style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.4' }}>
                  I agree to the{' '}
                  <Link href="/terms" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                    Terms and Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Business Type Selection */}
              <div className="form-group">
                <label htmlFor="businessType" className="form-label">
                  Business Type (Optional)
                </label>
                <select 
                  id="businessType" 
                  name="businessType"
                  className="form-input"
                  style={{ fontSize: '16px' }}
                >
                  <option value="">Select your business type</option>
                  <option value="ecommerce">🛍️ E-commerce</option>
                  <option value="restaurant">🍕 Restaurant</option>
                  <option value="service">💼 Service Business</option>
                  <option value="healthcare">🏥 Healthcare</option>
                  <option value="real-estate">🏠 Real Estate</option>
                  <option value="education">📚 Education</option>
                  <option value="fitness">💪 Fitness</option>
                  <option value="other">🔧 Other</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-orange ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ 
                  width: '100%',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '700',
                  marginTop: '10px'
                }}
              >
                {isLoading ? (
                  <span>
                    Creating Account... 🚀
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                Already have an account?{' '}
                <Link href="/auth/login" style={{ 
                  fontWeight: '600', 
                  color: '#2563eb', 
                  textDecoration: 'none'
                }}>
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Social Signup Options */}
            <div style={{ marginTop: '30px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
                <span style={{ padding: '0 16px', fontSize: '0.8rem', color: '#6b7280' }}>
                  Or sign up with
                </span>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <button className="btn btn-secondary" style={{ padding: '12px', fontSize: '14px' }}>
                  🔍 Google
                </button>
                <button className="btn btn-secondary" style={{ padding: '12px', fontSize: '14px' }}>
                  📘 Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
