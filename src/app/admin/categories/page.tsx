'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import categoriesData from '@/data/categories.json';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories] = useState(categoriesData);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-black tracking-tight">Categories</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Organize catalog taxonomies and collection display orders
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Add category modal/drawer foundation ready!')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-brown hover:bg-brand-brown-hover text-white text-xs font-semibold rounded-brand shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

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
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-brand-cream/60 shrink-0 border border-gray-200">
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <span className="font-semibold text-brand-black">{cat.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-500">/{cat.slug}</td>
                  <td className="py-3.5 px-4 font-semibold text-gray-700">#{cat.displayOrder}</td>
                  <td className="py-3.5 px-4 text-gray-600">{cat.productCount || 0} products</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => alert(`Edit category: ${cat.name}`)}
                        className="p-1.5 text-gray-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => alert(`Delete category: ${cat.name}`)}
                        className="p-1.5 text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
