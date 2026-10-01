'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Download,
  Smartphone,
  Monitor,
  Apple,
  X,
  CheckCircle2,
  Share2,
  PlusSquare,
  Sparkles,
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface DownloadAppButtonProps {
  className?: string;
  variant?: 'header' | 'drawer' | 'banner';
}

export function DownloadAppButton({ className, variant = 'header' }: DownloadAppButtonProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'android' | 'desktop' | 'ios'>('android');

  useEffect(() => {
    // Detect if already running in standalone mode (PWA installed)
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsInstalled(true);
    }

    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor;
    if (/android/i.test(userAgent)) {
      setActivePlatform('android');
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setActivePlatform('ios');
    } else {
      setActivePlatform('desktop');
    }

    // Capture PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch {
        setModalOpen(true);
      }
    } else {
      // If browser doesn't have prompt or iOS, open the guide modal
      setModalOpen(true);
    }
  };

  if (isInstalled && variant === 'header') {
    return null;
  }

  return (
    <>
      {/* Button styles based on placement */}
      {variant === 'header' ? (
        <button
          type="button"
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-gradient-to-r from-brand-brown to-brand-brown-hover hover:brightness-110 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 animate-pulse-subtle shrink-0 ${
            className || ''
          }`}
          title="Install APNA Bazar as an App on Mobile or Desktop"
        >
          <Download className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden sm:inline">Download App</span>
          <span className="sm:hidden">Get App</span>
        </button>
      ) : variant === 'drawer' ? (
        <button
          type="button"
          onClick={() => {
            handleInstallClick();
          }}
          className={`w-full py-2.5 px-3 bg-brand-brown/10 text-brand-brown hover:bg-brand-brown hover:text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            className || ''
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Download APNA Bazar App / APK</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleInstallClick}
          className={`inline-flex items-center gap-2 px-5 py-2.5 bg-brand-brown hover:bg-brand-brown-hover text-white rounded-xl text-xs font-bold transition-all shadow-sm ${
            className || ''
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Install APNA Bazar App</span>
        </button>
      )}

      {/* ======================================================== */}
      {/* APP DOWNLOAD / INSTALL MODAL                             */}
      {/* ======================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-brand-cream border border-brand-brown/20 p-1 shrink-0">
                  <Image
                    src="/logo-transparent.png"
                    alt="APNA Bazar Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-black flex items-center gap-1.5">
                    Download APNA Bazar App
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </h3>
                  <p className="text-[11px] text-gray-500">Fast, lightweight, works offline</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-brand-black rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Platform Selector Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActivePlatform('android')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activePlatform === 'android'
                    ? 'bg-white text-brand-black shadow-sm font-bold'
                    : 'text-gray-500 hover:text-brand-black'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android (APK)</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePlatform('desktop')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activePlatform === 'desktop'
                    ? 'bg-white text-brand-black shadow-sm font-bold'
                    : 'text-gray-500 hover:text-brand-black'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop (PC)</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePlatform('ios')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  activePlatform === 'ios'
                    ? 'bg-white text-brand-black shadow-sm font-bold'
                    : 'text-gray-500 hover:text-brand-black'
                }`}
              >
                <Apple className="w-3.5 h-3.5" />
                <span>iPhone (iOS)</span>
              </button>
            </div>

            {/* Platform Specific Content */}
            <div className="space-y-4">
              {activePlatform === 'android' && (
                <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl space-y-3 text-xs text-gray-700">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Android Mobile App / WebAPK</span>
                  </div>
                  <p className="leading-relaxed">
                    Install APNA Bazar directly onto your phone&apos;s home screen. It functions
                    exactly like a native Android APK: full screen, push notifications, and fast loading.
                  </p>
                  {deferredPrompt ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleInstallClick();
                        setModalOpen(false);
                      }}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Install Android App Now</span>
                    </button>
                  ) : (
                    <div className="p-2.5 bg-white/90 rounded-lg text-[11px] space-y-1 text-gray-600 border border-emerald-100">
                      <p className="font-semibold text-gray-800">Manual 2-Step Android Install:</p>
                      <p>1. Open Chrome menu (tap the 3 dots <strong>⋮</strong> at top right).</p>
                      <p>2. Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.</p>
                    </div>
                  )}
                </div>
              )}

              {activePlatform === 'desktop' && (
                <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-xl space-y-3 text-xs text-gray-700">
                  <div className="flex items-center gap-2 font-bold text-blue-800">
                    <Monitor className="w-4 h-4 text-blue-600" />
                    <span>Desktop App (Windows / Mac)</span>
                  </div>
                  <p className="leading-relaxed">
                    Install APNA Bazar as a standalone Windows / Mac desktop app. It will appear on your
                    desktop, start menu, and taskbar with its own window!
                  </p>
                  {deferredPrompt ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleInstallClick();
                        setModalOpen(false);
                      }}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Install Desktop App Now</span>
                    </button>
                  ) : (
                    <div className="p-2.5 bg-white/90 rounded-lg text-[11px] space-y-1 text-gray-600 border border-blue-100">
                      <p className="font-semibold text-gray-800">In Chrome or Edge on PC:</p>
                      <p>1. Look at your browser address bar on the right side.</p>
                      <p>2. Click the <strong>&quot;Install APNA Bazar&quot;</strong> icon (looks like a monitor or download arrow) &rarr; Click <strong>Install</strong>.</p>
                    </div>
                  )}
                </div>
              )}

              {activePlatform === 'ios' && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3 text-xs text-gray-700">
                  <div className="flex items-center gap-2 font-bold text-gray-800">
                    <Apple className="w-4 h-4" />
                    <span>iPhone & iPad (Safari)</span>
                  </div>
                  <p className="leading-relaxed">
                    Apple iOS allows you to install APNA Bazar directly onto your iPhone home screen in 2 quick taps:
                  </p>
                  <div className="p-3 bg-white rounded-lg space-y-2 text-[11px] border border-gray-200">
                    <div className="flex items-start gap-2">
                      <Share2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>
                        1. Tap the <strong>Share</strong> button at the bottom of Safari (square with arrow).
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <PlusSquare className="w-4 h-4 text-brand-black shrink-0 mt-0.5" />
                      <span>
                        2. Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong> &rarr; Tap <strong>Add</strong>.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Features */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                No App Store login needed
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Only ~1 MB size
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
