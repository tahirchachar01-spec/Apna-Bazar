'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Link2, X, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = 'Product Image' }: ImageUploaderProps) {
  const [activeTab, setActiveTab] = useState<'device' | 'url'>('device');
  const [urlInput, setUrlInput] = useState(value && !value.startsWith('data:') ? value : '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Optimizes and compresses device images using an HTML5 Canvas
   * so they are crisp, lightweight (~50KB-90KB), and save permanently
   * into GitHub JSON database on Vercel/Netlify.
   */
  const processAndCompressImage = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setIsProcessing(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        // Max dimensions for crisp web display
        const MAX_WIDTH = 1000;
        const MAX_HEIGHT = 1000;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          setError('Canvas processing not supported in your browser.');
          setIsProcessing(false);
          return;
        }

        // Draw and compress image
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to high quality, compressed JPEG data URL
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.84);
        onChange(compressedDataUrl);
        setIsProcessing(false);
      };

      img.onerror = () => {
        setError('Failed to read image data.');
        setIsProcessing(false);
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setError('Error reading file from your device.');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processAndCompressImage(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndCompressImage(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setError('Please paste a valid image URL.');
      return;
    }
    setError(null);
    onChange(urlInput.trim());
  };

  const handleRemoveImage = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider">
          {label} *
        </label>
        {/* Switch mode tabs */}
        <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('device')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              activeTab === 'device'
                ? 'bg-white text-brand-black shadow-sm'
                : 'text-gray-500 hover:text-brand-black'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Mobile / Camera / PC</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
              activeTab === 'url'
                ? 'bg-white text-brand-black shadow-sm'
                : 'text-gray-500 hover:text-brand-black'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Web URL Link</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl text-xs bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* When an image is already selected / uploaded: Preview Card */}
      {value ? (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50/70">
          <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-brand-cream/80 border border-gray-200 shadow-sm shrink-0">
            <Image
              src={value}
              alt="Selected Preview"
              fill
              unoptimized
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-2 text-xs w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Image Ready</span>
            </div>
            <p className="text-gray-500 text-[11px] line-clamp-1 break-all font-mono">
              {value.startsWith('data:')
                ? `Uploaded from Device (${Math.round((value.length * 3) / 4 / 1024)} KB)`
                : value}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 transition-colors shadow-sm"
              >
                Change Image
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-semibold transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Upload Zone */
        <div>
          {activeTab === 'device' ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-brand-brown bg-brand-brown/5 scale-[0.99]'
                  : 'border-gray-200 hover:border-brand-brown/50 bg-gray-50/60 hover:bg-brand-cream/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-brand-brown/10 text-brand-brown flex items-center justify-center mx-auto mb-2">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-brand-black">
                {isProcessing ? 'Optimizing Image...' : 'Click to Upload or Drag & Drop'}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                PNG, JPG, or WEBP from your phone or PC (Auto-optimized for cloud database)
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or any image link"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-xs font-semibold rounded-brand transition-colors shrink-0"
                >
                  Set Image
                </button>
              </div>
              <p className="text-[11px] text-gray-400">
                You can paste direct image links from Unsplash, Google Images, or your CDN.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Hidden file input when image is already set */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
