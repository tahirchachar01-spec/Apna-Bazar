'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import { Product } from '@/types/product';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    id: params.id,
    name: '',
    slug: '',
    description: '',
    category: 'Watches',
    categorySlug: 'watches',
    price: '',
    salePrice: '',
    stock: '',
    sku: '',
    imageUrl: '',
    isFeatured: false,
    isDeal: false,
    isActive: true,
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const products: Product[] = await res.json();
          const target = products.find((p) => p.id === params.id);
          if (target) {
            setFormData({
              id: target.id,
              name: target.name,
              slug: target.slug,
              description: target.description,
              category: target.category,
              categorySlug: target.categorySlug,
              price: target.price.toString(),
              salePrice: target.salePrice ? target.salePrice.toString() : '',
              stock: target.stock.toString(),
              sku: target.sku,
              imageUrl: target.images?.[0] || '',
              isFeatured: target.isFeatured || false,
              isDeal: target.isDeal || false,
              isActive: target.isActive !== false,
            });
          } else {
            setError('Product not found in database.');
          }
        }
      } catch (err) {
        setError('Failed loading product details.');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.sku) {
      setError('Please fill in product name, price, and SKU.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = {
        id: formData.id,
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        category: formData.category,
        categorySlug: formData.categorySlug,
        price: Number(formData.price),
        salePrice: formData.salePrice ? Number(formData.salePrice) : undefined,
        stock: Number(formData.stock),
        sku: formData.sku,
        images: [formData.imageUrl || '/logo.jpg'],
        isFeatured: formData.isFeatured,
        isDeal: formData.isDeal,
        isActive: formData.isActive,
      };

      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push('/admin/products');
      } else {
        setError(data.error || 'Failed updating product');
      }
    } catch {
      setError('Network error saving updates');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-brand-brown" />
        <p className="text-xs text-gray-500">Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-lg text-gray-500 hover:text-brand-black hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-brand-black tracking-tight">
              Edit Product: {formData.name}
            </h1>
            <p className="text-xs text-gray-400">ID: {params.id}</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-xs font-semibold rounded-brand shadow-sm transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{saving ? 'Updating...' : 'Update Product'}</span>
        </button>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl text-xs bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">
            General Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
              Description *
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
              Product Image URL
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">
            Pricing & Inventory
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Price (PKR) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Sale Price (Optional)
              </label>
              <input
                type="number"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-subtle space-y-4">
          <h2 className="text-sm font-bold text-brand-black uppercase tracking-wider">
            Category & Visibility
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={formData.categorySlug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    categorySlug: e.target.value,
                    category: e.target.options[e.target.selectedIndex].text,
                  })
                }
                className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown bg-white"
              >
                <option value="watches">Watches</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="shoes">Shoes</option>
                <option value="beauty">Beauty & Fragrances</option>
                <option value="home-living">Home & Living</option>
                <option value="accessories">Accessories</option>
                <option value="gadgets">Gadgets</option>
              </select>
            </div>

            <div className="flex items-center gap-4 sm:col-span-2 pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded text-brand-brown"
                />
                <span>Feature on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.isDeal}
                  onChange={(e) => setFormData({ ...formData, isDeal: e.target.checked })}
                  className="rounded text-brand-brown"
                />
                <span>Include in Super Deals</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-brand-brown"
                />
                <span>Active Status</span>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
