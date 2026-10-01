'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Order, OrderStatus } from '@/types/order';
import { formatPrice } from '@/lib/utils';
import {
  Search,
  Eye,
  X,
  Phone,
  MapPin,
  User,
  Mail,
  FileText,
  CheckCircle2,
  Clock,
  Truck,
  MessageSquare,
  Package,
  Calendar,
  CreditCard,
  RefreshCw,
  Loader2,
  Check,
} from 'lucide-react';
import defaultOrders from '@/data/orders.json';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(defaultOrders as Order[]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const detailsRef = useRef<HTMLDivElement>(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setOrders(data);
          // If selected order exists, update reference
          if (selectedOrder) {
            const updated = data.find((o: Order) => o.id === selectedOrder.id);
            if (updated) setSelectedOrder(updated);
          }
        }
      }
    } catch (err) {
      console.error('Failed fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSelectOrder = (order: Order) => {
    if (selectedOrder?.id === order.id) {
      // Toggle if already selected
      setSelectedOrder(null);
    } else {
      setSelectedOrder(order);
      // Smooth scroll into view
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!selectedOrder) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedOrder.id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        const updated = { ...selectedOrder, status: newStatus };
        setSelectedOrder(updated);
        setOrders((prev) =>
          prev.map((o) => (o.id === selectedOrder.id ? updated : o))
        );
      } else {
        alert(data.error || 'Failed to update order status');
      }
    } catch {
      alert('Network error updating status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Shipped':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      !search ||
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.phoneNumber.includes(search) ||
      o.customer.city.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-black tracking-tight">Customer Orders</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Click any order to inspect customer info and items breakdown below
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-brand shadow-sm transition-colors disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, Name, Phone, City..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs text-brand-black focus:outline-none focus:border-brand-brown"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['all', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter.toLowerCase() === st.toLowerCase()
                  ? 'bg-brand-brown text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {st === 'all' ? 'All Orders' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Master Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-400 font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Phone / City</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-brown" />
                    Loading orders from database...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    No orders found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const isSelected = selectedOrder?.id === o.id;
                  return (
                    <tr
                      key={o.id}
                      onClick={() => handleSelectOrder(o)}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-brand-cream/40 border-l-4 border-l-brand-brown'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-brand-brown block">{o.orderNumber}</span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(o.createdAt || Date.now()).toLocaleDateString('en-PK', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-brand-black">
                        {o.customer.fullName}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">
                        <span>{o.customer.phoneNumber}</span>
                        <span className="block text-[11px] text-gray-400">{o.customer.city}</span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 font-medium">
                        {o.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 0} items
                      </td>
                      <td className="py-3.5 px-4 font-bold text-brand-black">
                        {formatPrice(o.total)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(
                            o.status
                          )}`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectOrder(o);
                          }}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                            isSelected
                              ? 'bg-brand-brown text-white'
                              : 'text-gray-500 hover:text-brand-brown hover:bg-gray-100'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isSelected ? 'Viewing' : 'Details'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ORDER DETAILS SECTION (SLIDES OPEN BELOW UPON CLICK)   */}
      {/* ======================================================== */}
      {selectedOrder && (
        <div
          ref={detailsRef}
          className="bg-white rounded-2xl border-2 border-brand-brown/30 shadow-elevated p-6 space-y-6 animate-fadeIn transition-all"
        >
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-brand-brown/10 text-brand-brown flex items-center justify-center shrink-0">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-brand-black tracking-tight">
                    Order Details #{selectedOrder.orderNumber}
                  </h2>
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Placed on{' '}
                  {new Date(selectedOrder.createdAt || Date.now()).toLocaleDateString('en-PK', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* WhatsApp Customer Action */}
              <a
                href={`https://wa.me/${selectedOrder.customer.phoneNumber.replace(
                  /[^0-9]/g,
                  ''
                )}?text=${encodeURIComponent(
                  `Hello ${selectedOrder.customer.fullName}! We are contacting you from APNA Bazar regarding your order ${selectedOrder.orderNumber}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                title="Message customer directly on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Customer</span>
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg text-gray-400 hover:text-brand-black hover:bg-gray-100 transition-colors"
                title="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 1. UPPER SECTION: DETAILS CARDS (Customer, Financials) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Customer Information Card */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-3">
              <div className="flex items-center gap-2 text-brand-brown font-bold text-xs uppercase tracking-wider">
                <User className="w-4 h-4" />
                <span>Customer Information</span>
              </div>
              <div className="space-y-1.5 text-xs text-brand-black">
                <p className="text-sm font-bold">{selectedOrder.customer.fullName}</p>
                <p className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <a
                    href={`tel:${selectedOrder.customer.phoneNumber}`}
                    className="hover:text-brand-brown hover:underline font-medium"
                  >
                    {selectedOrder.customer.phoneNumber}
                  </a>
                </p>
                {selectedOrder.customer.email && (
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{selectedOrder.customer.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-3">
              <div className="flex items-center gap-2 text-brand-brown font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Shipping Address</span>
              </div>
              <div className="space-y-1.5 text-xs text-brand-black">
                <p className="font-semibold text-gray-800 leading-relaxed">
                  {selectedOrder.customer.address}
                </p>
                <p className="font-bold text-brand-brown text-sm">{selectedOrder.customer.city}</p>
                {selectedOrder.customer.notes && (
                  <div className="mt-2 pt-2 border-t border-gray-200 text-gray-500 italic flex items-start gap-1.5">
                    <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>Note: &ldquo;{selectedOrder.customer.notes}&rdquo;</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Status & Payment Summary Card */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-brown font-bold text-xs uppercase tracking-wider">
                  <CreditCard className="w-4 h-4" />
                  <span>Update Order Status</span>
                </div>
                {updatingStatus && <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-brown" />}
              </div>

              {/* Status Select Dropdown */}
              <div>
                <label className="block text-[11px] text-gray-400 font-medium mb-1">
                  Change Current Status:
                </label>
                <select
                  value={selectedOrder.status}
                  disabled={updatingStatus}
                  onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-brand-black focus:outline-none focus:border-brand-brown"
                >
                  <option value="Pending">Pending (New)</option>
                  <option value="Processing">Processing (Confirmed)</option>
                  <option value="Shipped">Shipped (On Way)</option>
                  <option value="Delivered">Delivered (Completed)</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Quick Summary */}
              <div className="pt-2 border-t border-gray-200 space-y-1 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal:</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Charges:</span>
                  <span>
                    {selectedOrder.deliveryCharges === 0
                      ? 'FREE'
                      : formatPrice(selectedOrder.deliveryCharges)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-brand-black text-sm pt-1 border-t border-gray-200">
                  <span>Grand Total:</span>
                  <span className="text-brand-brown">{formatPrice(selectedOrder.total)}</span>
                </div>
                <span className="text-[10px] text-gray-400 block pt-0.5">
                  Payment: Cash on Delivery (COD)
                </span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. LOWER SECTION: ITEMS IN TABLE FORM                   */}
          {/* ======================================================== */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-brown" />
                <span>Ordered Items Breakdown ({selectedOrder.items?.length || 0})</span>
              </h3>
              <span className="text-xs text-gray-400">
                Total Units:{' '}
                {selectedOrder.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 0}
              </span>
            </div>

            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Product Details</th>
                    <th className="py-3 px-4 text-center">Unit Price</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-right">Line Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, idx) => (
                      <tr key={`${item.productId}-${idx}`} className="hover:bg-gray-50/50">
                        <td className="py-3 px-4 text-gray-400 font-medium">{idx + 1}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-cream/60 shrink-0 border border-gray-100">
                              <Image
                                src={item.productImage || '/logo.jpg'}
                                alt={item.productName}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-bold text-brand-black block">
                                {item.productName}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                Product ID: {item.productId}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-gray-700">
                          {formatPrice(item.price)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-2.5 py-1 bg-gray-100 rounded-md font-bold text-brand-black">
                            × {item.quantity}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-brand-brown">
                          {formatPrice(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-400">
                        No items found in this order.
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50/70 border-t border-gray-200 font-semibold text-xs">
                    <td colSpan={3} className="py-3 px-4 text-gray-600">
                      Subtotal
                    </td>
                    <td className="py-3 px-4 text-center text-gray-600">
                      {selectedOrder.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 0} units
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-brand-black">
                      {formatPrice(selectedOrder.subtotal)}
                    </td>
                  </tr>
                  <tr className="bg-gray-50/70 text-xs">
                    <td colSpan={4} className="py-2 px-4 text-gray-500">
                      Standard Delivery Charges
                    </td>
                    <td className="py-2 px-4 text-right font-semibold text-emerald-600">
                      {selectedOrder.deliveryCharges === 0
                        ? 'FREE'
                        : formatPrice(selectedOrder.deliveryCharges)}
                    </td>
                  </tr>
                  <tr className="bg-brand-cream/50 border-t border-brand-brown/20 text-sm font-bold">
                    <td colSpan={4} className="py-3 px-4 text-brand-black">
                      Total Payable (COD)
                    </td>
                    <td className="py-3 px-4 text-right text-brand-brown font-extrabold text-base">
                      {formatPrice(selectedOrder.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
