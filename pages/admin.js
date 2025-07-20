import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Admin() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false); // Changed from true to false
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');

  const fetchSubmissions = async (key) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting admin authentication with key length:', key.length);
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      // Use Authorization header instead of URL parameter for security
      const response = await fetch('/.netlify/functions/contact', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      console.log('Admin response status:', response.status);
      
      if (response.status === 401) {
        setAccessDenied(true);
        setError('Invalid admin credentials');
        setIsAuthenticated(false);
        return;
      }
      
      if (response.status === 429) {
        setError('Too many requests. Please wait a moment and try again.');
        return;
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Admin response error:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Admin authentication successful, submissions count:', data.submissions?.length || 0);
      setSubmissions(data.submissions || []);
      setLastUpdated(data.lastUpdated);
      setAccessDenied(false);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Admin fetch error:', err);
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminKey.trim()) {
      fetchSubmissions(adminKey);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey('');
    setSubmissions([]);
    setAccessDenied(false);
    setError(null);
  };

  // Test function connectivity
  const testFunction = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Testing function connectivity...');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('/.netlify/functions/contact?test=true', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Function test successful:', data);
        setError(`Function is working! Environment variable set: ${data.envVarSet}`);
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      console.error('Function test error:', err);
      if (err.name === 'AbortError') {
        setError('Function test timed out. Function may not be accessible.');
      } else {
        setError(`Function test failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh when authenticated
  useEffect(() => {
    if (isAuthenticated && adminKey) {
      const interval = setInterval(() => {
        fetchSubmissions(adminKey);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, adminKey]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="w-full max-w-md">
            <div className="glass p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
              
              {accessDenied && (
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
                  <p className="text-red-300">Access Denied: {error}</p>
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="adminKey" className="block text-sm font-medium text-gray-300 mb-2">
                    Admin Key
                  </label>
                  <input
                    type="password"
                    id="adminKey"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter admin key"
                    required
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 btn-apple-primary py-3"
                    disabled={loading}
                  >
                    {loading ? 'Authenticating...' : 'Access Admin Panel'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={testFunction}
                    className="btn-apple-secondary px-4 py-3"
                    disabled={loading}
                  >
                    Test
                  </button>
                </div>
              </form>
              
              <p className="text-sm text-gray-400 mt-4 text-center">
                Enter your admin key to view contact form submissions
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading && submissions.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading submissions...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-8 pt-24">
        <div className="container-premium">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-4xl font-bold text-white">Contact Form Submissions</h1>
              <button
                onClick={handleLogout}
                className="btn-apple-secondary text-sm px-4 py-2"
              >
                Logout
              </button>
            </div>
            <p className="text-gray-300">
              {submissions.length} total submissions
              {lastUpdated && (
                <span className="ml-4 text-sm text-gray-400">
                  Last updated: {formatDate(lastUpdated)}
                </span>
              )}
            </p>
            <button
              onClick={() => fetchSubmissions(adminKey)}
              className="btn-apple-primary mt-4"
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {/* Error Message */}
          {error && !accessDenied && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-300">Error: {error}</p>
            </div>
          )}

          {/* Submissions List */}
          {submissions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No submissions yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {submissions.map((submission) => (
                <div key={submission.id} className="glass p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {submission.name}
                      </h3>
                      <p className="text-blue-300 text-sm">{submission.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">
                        {formatDate(submission.timestamp)}
                      </p>
                      <span className="inline-block bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs mt-1">
                        {submission.projectType}
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-4">
                    <p className="text-gray-300 leading-relaxed">{submission.message}</p>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {submission.business && (
                      <div>
                        <span className="text-gray-400">Business:</span>
                        <span className="text-white ml-2">{submission.business}</span>
                      </div>
                    )}
                    {submission.phone && (
                      <div>
                        <span className="text-gray-400">Phone:</span>
                        <span className="text-white ml-2">{submission.phone}</span>
                      </div>
                    )}
                    {submission.website && (
                      <div>
                        <span className="text-gray-400">Website:</span>
                        <a 
                          href={submission.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-300 ml-2 hover:underline"
                        >
                          {submission.website}
                        </a>
                      </div>
                    )}
                    {submission.idealClient && (
                      <div>
                        <span className="text-gray-400">Ideal Client:</span>
                        <span className="text-white ml-2">{submission.idealClient}</span>
                      </div>
                    )}
                    {submission.hearAbout && (
                      <div>
                        <span className="text-gray-400">Heard About:</span>
                        <span className="text-white ml-2">{submission.hearAbout}</span>
                      </div>
                    )}
                    {submission.leadGoal && (
                      <div>
                        <span className="text-gray-400">Lead Goal:</span>
                        <span className="text-white ml-2">{submission.leadGoal}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                    <button
                      onClick={() => copyToClipboard(submission.email)}
                      className="btn-apple-secondary text-sm px-3 py-1"
                    >
                      Copy Email
                    </button>
                    <button
                      onClick={() => copyToClipboard(submission.phone || 'No phone provided')}
                      className="btn-apple-secondary text-sm px-3 py-1"
                    >
                      Copy Phone
                    </button>
                    <a
                      href={`mailto:${submission.email}?subject=Re: Your inquiry about ${submission.projectType}`}
                      className="btn-apple-primary text-sm px-3 py-1"
                    >
                      Reply via Email
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
} 