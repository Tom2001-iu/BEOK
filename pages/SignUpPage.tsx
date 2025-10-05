import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/account');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif">Create Account</h1>
          <p className="text-brand-gray mt-2">Join the world of BEOK.</p>
        </div>

        {error && <p className="bg-red-100 text-red-700 p-3 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-brand-dark mb-1">Full Name</label>
            <input 
              type="text" 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-dark" 
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-dark" 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-brand-dark mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-dark" 
            />
          </div>
          <div>
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-brand-gray">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-dark hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
