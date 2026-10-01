'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-brand-brown uppercase tracking-wider">
            We&apos;re Here to Help
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-black tracking-tight">
            Contact APNA Bazar
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Have questions about an order or product? Reach out to our customer care team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Column */}
          <div className="lg:col-span-5 bg-brand-black text-white p-8 sm:p-10 rounded-3xl shadow-card space-y-8">
            <div>
              <h2 className="text-xl font-bold">Get In Touch</h2>
              <p className="text-xs text-gray-400 mt-1">
                Our support team is available 6 days a week to answer your inquiries.
              </p>
            </div>

            <div className="space-y-5 text-xs text-gray-300">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-brand-brown/20 text-brand-brown-light flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Fulfillment Hub</h4>
                  <p className="text-gray-400 mt-0.5">
                    Gulberg III, Main Boulevard, Lahore, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-brand-brown/20 text-brand-brown-light flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Call & WhatsApp Support</h4>
                  <p className="text-gray-400 mt-0.5">+92 300 1234567</p>
                  <p className="text-[11px] text-brand-brown-light">Mon - Sat (9:00 AM - 9:00 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-brand-brown/20 text-brand-brown-light flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email Inquiries</h4>
                  <p className="text-gray-400 mt-0.5">support@apnabazar.pk</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-brand-brown/20 text-brand-brown-light flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Response Time</h4>
                  <p className="text-gray-400 mt-0.5">
                    Within 2 hours on WhatsApp; within 24 hours on Email
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-card">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-black">Message Sent Successfully</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Thank you for reaching out! Our team will get back to your contact details promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-brand-brown text-white text-xs font-semibold rounded-brand hover:bg-brand-brown-hover"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-brand-black mb-4">Send Us a Direct Message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Mehmood"
                      className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0300 1234567"
                      className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Order inquiry, partnership, question..."
                    className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-sm text-brand-black focus:outline-none focus:border-brand-brown resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-brand-brown hover:bg-brand-brown-hover text-white font-bold text-sm rounded-brand shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
