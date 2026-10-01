'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-16 bg-brand-cream border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-brand-brown/10 text-brand-brown mx-auto flex items-center justify-center">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-black tracking-tight">
          Join the APNA Bazar Club
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Subscribe to receive private flash sale alerts, restock updates, and exclusive discount codes directly to your inbox.
        </p>

        {subscribed ? (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 inline-flex items-center gap-2 text-sm font-medium">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Thank you for subscribing! Check your email for special welcome perks.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 mt-4">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-brand border border-gray-300 text-sm text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-brown focus:ring-1 focus:ring-brand-brown bg-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-brown hover:bg-brand-brown-hover text-white text-sm font-semibold rounded-brand transition-colors shadow-sm"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
