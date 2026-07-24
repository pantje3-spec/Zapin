import React, { useState } from 'react';
import { User, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LoginPage: React.FC = () => {
  const { loginUser, setCurrentPage, setIsAdmin } = useStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const cleanEmail = email.trim().toLowerCase();
      loginUser(email, name || email.split('@')[0]);

      if (cleanEmail === 'pantje3@gmail.com') {
        setIsAdmin(true);
        setCurrentPage('admin');
      } else {
        setCurrentPage('my-account');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="bg-white max-w-md w-full rounded-xl shadow-2xl p-8 border border-neutral-200 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
            ZAPIN SEOUL MEMBER PORTAL
          </span>
          <h1 className="text-2xl font-light font-serif uppercase tracking-tight text-neutral-950">
            {mode === 'login' ? 'Welcome Back' : 'Create Zapin Account'}
          </h1>
          <p className="text-xs text-neutral-500 font-mono">
            Access your order history, saved wishlist, and exclusive drop passes.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex border-b border-neutral-200 text-xs font-mono">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-center uppercase tracking-wider font-bold ${
              mode === 'login' ? 'border-b-2 border-black text-black' : 'text-neutral-400'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-3 text-center uppercase tracking-wider font-bold ${
              mode === 'register' ? 'border-b-2 border-black text-black' : 'text-neutral-400'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {mode === 'register' && (
            <div>
              <label className="block text-neutral-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Min-jun Kim"
                className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
              />
            </div>
          )}

          <div>
            <label className="block text-neutral-600 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@zapin.com"
              className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-neutral-600 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-950 text-white py-3.5 text-xs font-mono font-bold tracking-widest uppercase rounded shadow-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            {mode === 'login' ? 'Sign In To Account' : 'Complete Registration'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
