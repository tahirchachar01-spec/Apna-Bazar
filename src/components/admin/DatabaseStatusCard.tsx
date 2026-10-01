'use client';

import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertTriangle, RefreshCw, GitBranch, Key, ExternalLink, Copy, Check } from 'lucide-react';

interface DbStatusResponse {
  configured: boolean;
  connected: boolean;
  message: string;
  details?: {
    owner: string;
    repo: string;
    branch: string;
    filesFound: number;
    fileNames?: string[];
  };
}

export function DatabaseStatusCard() {
  const [status, setStatus] = useState<DbStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const checkConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/status', { cache: 'no-store' });
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus({
        configured: false,
        connected: false,
        message: 'Could not communicate with the database status endpoint.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const envSample = `GITHUB_TOKEN=ghp_yourTokenHere
GITHUB_OWNER=your-github-username
GITHUB_REPO=apna-bazar
GITHUB_BRANCH=main`;

  const copyEnvToClipboard = () => {
    navigator.clipboard.writeText(envSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-subtle p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center text-brand-brown">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-brand-black flex items-center gap-2">
              GitHub Cloud Database Connection
              {loading ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600">
                  Checking...
                </span>
              ) : status?.connected ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Live Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                  Local Fallback Mode
                </span>
              )}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Syncs products, orders, and settings directly with your GitHub repository on Vercel/Netlify
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="text-xs font-semibold text-brand-brown hover:text-brand-brown-hover hover:underline px-2 py-1"
          >
            {showGuide ? 'Hide Instructions' : 'Vercel/Netlify Setup Guide'}
          </button>
          <button
            onClick={checkConnection}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Test Connection</span>
          </button>
        </div>
      </div>

      {/* Current Connection Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span className="text-gray-400 block font-medium">Target Repository</span>
          <span className="font-semibold text-brand-black truncate block mt-0.5">
            {status?.details?.owner && status?.details?.repo
              ? `${status.details.owner}/${status.details.repo}`
              : 'Not Configured Yet'}
          </span>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span className="text-gray-400 block font-medium">Branch</span>
          <span className="font-semibold text-brand-black flex items-center gap-1.5 mt-0.5">
            <GitBranch className="w-3 h-3 text-gray-400" />
            {status?.details?.branch || 'main'}
          </span>
        </div>

        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span className="text-gray-400 block font-medium">Database Synced Files</span>
          <span className="font-semibold text-brand-black block mt-0.5">
            {status?.connected
              ? `${status.details?.filesFound || 0} JSON collections found`
              : 'Using local src/data/*.json'}
          </span>
        </div>
      </div>

      {/* Status message */}
      {status && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
            status.connected
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-100'
              : 'bg-amber-50 text-amber-800 border border-amber-100'
          }`}
        >
          {status.connected ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="font-semibold">{status.message}</span>
            {!status.connected && (
              <p className="mt-1 text-[11px] text-amber-700">
                To connect your live GitHub database on Vercel or Netlify, add your GitHub token and repo details in the deployment platform&apos;s <strong>Environment Variables</strong>.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Guide accordion */}
      {showGuide && (
        <div className="border border-brand-brown/20 bg-brand-cream/30 p-4 rounded-xl space-y-3 text-xs text-brand-black">
          <h4 className="font-bold text-brand-brown uppercase tracking-wider text-[11px]">
            How to Connect on Vercel or Netlify (3 Easy Steps)
          </h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
            <li>
              <strong>Create a GitHub Personal Access Token:</strong>
              <br />
              Go to GitHub &rarr; Settings &rarr; Developer Settings &rarr; Personal access tokens &rarr; Tokens (classic) &rarr; Generate new token. Check the <strong>&quot;repo&quot;</strong> permission box and click Generate.
            </li>
            <li>
              <strong>Add Variables to Vercel / Netlify:</strong>
              <br />
              In your Vercel/Netlify Project Settings &rarr; <strong>Environment Variables</strong>, add:
              <ul className="list-disc list-inside pl-4 mt-1 text-gray-600 font-mono text-[11px]">
                <li>GITHUB_TOKEN = (Your copied token, starts with ghp_)</li>
                <li>GITHUB_OWNER = (Your GitHub username or organization)</li>
                <li>GITHUB_REPO = (Your GitHub repository name e.g. apna-bazar)</li>
                <li>GITHUB_BRANCH = main</li>
              </ul>
            </li>
            <li>
              <strong>Deploy / Redeploy:</strong>
              <br />
              Once deployed, every change in products, orders, and store settings is automatically committed to your GitHub repository and persists indefinitely across all visitors!
            </li>
          </ol>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-gray-500 font-mono">Environment variables template:</span>
            <button
              onClick={copyEnvToClipboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-xs font-medium rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Template'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
