'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Category } from '@/types/category';
import { ImageUploader } from '@/components/admin/ImageUploader';
import {
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Loader2,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  FolderPlus,
} from 'lucide-react';
import defaultCategories from '@/data/categories.json';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(
    defaultCategories as unknown as Category[]
  );
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    description: '',
    image: '',
    displayOrder: 1,
    isActive: true,
  });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/categories', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data.sort((a, b) => a.displayOrder - b.displayOrder));
        }
      }
    } catch (err) {
      console.error('Failed fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setFormData({
      id: `cat-${Date.now()}`,
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      displayOrder: categories.length + 1,
      isActive: true,
    });
    setEditingCategory(null);
    setModalMode('create');
    setMessage(null);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormData({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      displayOrder: cat.displayOrder,
      isActive: cat.isActive !== false,
    });
    setModalMode('edit');
    setMessage(null);
  };

  const closeModal = () => {
    setModalMode(null);
    setEditingCategory(null);
    setSaving(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please provide a category name.');
      return;
    }

    setSaving(true);
    setMessage(null);

    const payload: Category = {
      id: formData.id,
      name: formData.name,
      slug:
        formData.slug ||
        formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: formData.description,
      image: formData.image || '/logo.jpg',
      displayOrder: Number(formData.displayOrder) || 1,
      isActive: formData.isActive,
      productCount: editingCategory?.productCount || 0,
    };

    try {
      const res = await fetch('/api/categories', {
        method: modalMode === 'edit' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (modalMode === 'edit') {
          setCategories((prev) =>
            prev.map((c) => (c.id === payload.id ? payload : c)).sort((a, b) => a.displayOrder - b.displayOrder)
          );
        } else {
          setCategories((prev) => [...prev, payload].sort((a, b) => a.displayOrder - b.displayOrder));
        }
        closeModal();
      } else {
        setMessage({ text: data.error || 'Failed to save category', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Network error saving category', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete category "${name}"? This change will commit to your GitHub database.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(data.error || 'Failed deleting category');
      }
    } catch {
      alert('Network error deleting category');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-black tracking-tight">Categories</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Organize catalog taxonomies and collection display orders synced to GitHub cloud database
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCategories}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-brand transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-xs font-semibold rounded-brand shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Categories Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Display Order</th>
                <th className="py-3.5 px-4">Items Count</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && categories.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-brown" />
                    Loading categories from database...
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-brand-cream/60 shrink-0 border border-gray-200">
                          <Image
                            src={cat.image || '/logo.jpg'}
                            alt={cat.name}
                            fill
                            sizes="40px"
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-brand-black block">{cat.name}</span>
                          {cat.description && (
                            <span className="text-[10px] text-gray-400 line-clamp-1">
                              {cat.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500">/{cat.slug}</td>
                    <td className="py-3.5 px-4 font-semibold text-gray-700">#{cat.displayOrder}</td>
                    <td className="py-3.5 px-4 text-gray-600">{cat.productCount || 0} products</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          cat.isActive !== false
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {cat.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          disabled={deletingId === cat.id}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete Category"
                        >
                          {deletingId === cat.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================================== */}
      {/* EDIT / CREATE CATEGORY MODAL                            */}
      {/* ======================================================== */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-elevated max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-brown/10 text-brand-brown flex items-center justify-center">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-black">
                    {modalMode === 'edit' ? `Edit Category: ${editingCategory?.name}` : 'Add New Category'}
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Changes persist directly to your GitHub cloud database
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 rounded-lg text-gray-400 hover:text-brand-black hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message if any */}
            {message && (
              <div className="p-3 rounded-xl text-xs bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{message.text}</span>
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Watches"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        slug:
                          modalMode === 'create'
                            ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                            : formData.slug,
                      })
                    }
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
                    placeholder="e.g. watches"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Short description of this product category..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown resize-none"
                />
              </div>

              {/* Device Image Uploader Component */}
              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Category Cover Image"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-brand-black uppercase tracking-wider mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 rounded-brand border border-gray-200 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded text-brand-brown"
                    />
                    <span>Active in Store Navigation</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 rounded-brand text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-xs font-semibold rounded-brand shadow-sm transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{saving ? 'Saving...' : modalMode === 'edit' ? 'Update Category' : 'Create Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
