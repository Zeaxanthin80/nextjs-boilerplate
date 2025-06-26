import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would normally call your authentication API
      console.log('Login attempt:', formData);
      
      // Redirect to dashboard on successful login
      router.push('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Invalid username or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - MarketPro</title>
        <meta name="description" content="Login to your MarketPro account" />
      </Head>

      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '12px',
        background: 'linear-gradient(135deg, #2563eb 0%, #f97316 100%)'
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
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
              Welcome Back
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem' }}>
              Sign in to your account
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
                <label htmlFor="username" className="form-label">
                  Username or Email
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className={`form-input ${errors.username ? 'border-red-500' : ''}`}
                  placeholder="Enter your username or email"
                  value={formData.username}
                  onChange={handleChange}
                  style={{ fontSize: '16px' }}
                />
                {errors.username && (
                  <p style={{ marginTop: '4px', fontSize: '0.8rem', color: '#dc2626' }}>
                    {errors.username}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Enter your password"
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

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    style={{ marginRight: '8px' }}
                  />
                  <label htmlFor="remember-me" style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    Remember me
                  </label>
                </div>
                <Link href="/auth/forgot-password" style={{ 
                  fontSize: '0.9rem', 
                  color: '#2563eb', 
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ 
                  width: '100%',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '700',
                  marginTop: '10px'
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                Don't have an account?{' '}
                <Link href="/auth/signup" style={{ 
                  fontWeight: '600', 
                  color: '#f97316', 
                  textDecoration: 'none'
                }}>
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Social Login Options */}
            <div style={{ marginTop: '30px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
                <span style={{ padding: '0 16px', fontSize: '0.8rem', color: '#6b7280' }}>
                  Or continue with
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
