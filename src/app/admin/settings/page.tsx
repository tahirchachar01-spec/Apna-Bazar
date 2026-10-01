'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Save, Sliders, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { DatabaseStatusCard } from '@/components/admin/DatabaseStatusCard';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [settings, setSettings] = useState({
    storeName: 'APNA Bazar',
    tagline: 'Shop Smarter • Live Better',
    currency: 'PKR',
    currencySymbol: 'Rs.',
    supportEmail: 'support@apnabazar.pk',
    supportPhone: '+92 300 1234567',
    address: 'Gulberg III, Lahore, Pakistan',
    deliveryCharges: 200,
    freeDeliveryThreshold: 2000,
    facebook: 'https://facebook.com/apnabazar.pk',
    instagram: 'https://instagram.com/apnabazar.pk',
    tiktok: 'https://tiktok.com/@apnabazar.pk',
    youtube: 'https://youtube.com/@apnabazar',
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Failed fetching settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ text: 'Settings successfully saved to database & GitHub!', type: 'success' });
      } else {
        setMessage({ text: data.error || 'Failed saving settings', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Network error saving settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-black tracking-tight">Store Settings</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Configure brand identity, shipping rates, and database synchronization
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/settings/whatsapp"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-brand-brown text-brand-brown hover:bg-brand-brown/5 text-xs font-semibold rounded-brand transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>WhatsApp Settings</span>
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-xs font-semibold rounded-brand shadow-sm transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      {/* GitHub Database Status Card */}
      <DatabaseStatusCard />

      {/* Status Feedback Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span className="font-semibold">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">
            General Brand Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Store Name
              </label>
              <input
                type="text"
                value={settings.storeName}
                onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Support Email
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Support Phone
              </label>
              <input
                type="text"
                value={settings.supportPhone}
                onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
              Headquarters / Fulfillment Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
            />
          </div>
        </div>

        {/* Delivery Settings */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">
            Delivery & Shipping Thresholds
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Standard Delivery Charge (PKR)
              </label>
              <input
                type="number"
                value={settings.deliveryCharges}
                onChange={(e) =>
                  setSettings({ ...settings, deliveryCharges: Number(e.target.value) })
                }
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Free Delivery Threshold (PKR)
              </label>
              <input
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    freeDeliveryThreshold: Number(e.target.value),
                  })
                }
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                Orders with subtotal at or above this amount receive free delivery.
              </span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">
            Social Media Links
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Facebook Page URL
              </label>
              <input
                type="url"
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                TikTok Profile URL
              </label>
              <input
                type="url"
                value={settings.tiktok}
                onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={settings.youtube}
                onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
