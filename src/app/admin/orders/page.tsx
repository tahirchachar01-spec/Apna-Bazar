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
  ChevronDown,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import defaultOrders from '@/data/orders.json';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(defaultOrders as Order[]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
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
      setSelectedOrder(null);
    } else {
      setSelectedOrder(order);
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        alert(data.error || 'Failed to update order status');
      }
    } catch {
      alert('Network error updating status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/orders?id=${encodeURIComponent(orderToDelete.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders((prev) =>
          prev.filter(
            (o) => o.id !== orderToDelete.id && o.orderNumber !== orderToDelete.orderNumber
          )
        );
        if (selectedOrder?.id === orderToDelete.id) {
          setSelectedOrder(null);
        }
        setToastMessage(
          `Order #${orderToDelete.orderNumber || orderToDelete.id} deleted successfully.`
        );
        setTimeout(() => setToastMessage(null), 4000);
        setOrderToDelete(null);
      } else {
        alert(data.error || 'Failed to delete order');
      }
    } catch {
      alert('Network error while deleting order');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100/70';
      case 'Confirmed':
      case 'Processing':
        return 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100/70';
      case 'Out for Delivery':
      case 'Shipped':
        return 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100/70';
      case 'Delivered':
      case 'Received':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/70';
      case 'Cancelled':
        return 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100/70';
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
      statusFilter === 'all' ||
      o.status.toLowerCase() === statusFilter.toLowerCase() ||
      (statusFilter === 'Confirmed' && o.status === 'Processing') ||
      (statusFilter === 'Out for Delivery' && o.status === 'Shipped') ||
      (statusFilter === 'Delivered' && o.status === 'Received');

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-brand-black tracking-tight">Customer Orders</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Change order status directly using dropdowns or click any row for detailed inspection
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
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'Pending', label: 'Pending' },
            { id: 'Confirmed', label: 'Confirmed' },
            { id: 'Out for Delivery', label: 'Out for Delivery' },
            { id: 'Delivered', label: 'Delivered / Received' },
            { id: 'Cancelled', label: 'Cancelled' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter.toLowerCase() === st.id.toLowerCase()
                  ? 'bg-brand-brown text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Master Table with Interactive Status Dropdowns */}
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
                <th className="py-3.5 px-4">Status (Click to Change)</th>
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
                  const isUpdating = updatingOrderId === o.id;

                  // Normalize display status for select value
                  let selectValue: OrderStatus = o.status;
                  if (o.status === 'Processing') selectValue = 'Confirmed';
                  if (o.status === 'Shipped') selectValue = 'Out for Delivery';
                  if (o.status === 'Received') selectValue = 'Delivered';

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

                      {/* Interactive Status Dropdown Column */}
                      <td
                        className="py-3.5 px-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative inline-flex items-center">
                          <select
                            value={selectValue}
                            disabled={isUpdating}
                            onChange={(e) =>
                              handleStatusChange(o.id, e.target.value as OrderStatus)
                            }
                            className={`cursor-pointer appearance-none pl-3 pr-7 py-1.5 rounded-full text-[11px] font-bold border outline-none shadow-sm transition-all focus:ring-2 focus:ring-brand-brown/30 disabled:opacity-60 ${getStatusBadge(
                              o.status
                            )}`}
                          >
                            <option value="Pending" className="bg-white text-gray-800">
                              Pending
                            </option>
                            <option value="Confirmed" className="bg-white text-gray-800">
                              Confirmed
                            </option>
                            <option value="Out for Delivery" className="bg-white text-gray-800">
                              Out for Delivery
                            </option>
                            <option value="Delivered" className="bg-white text-gray-800">
                              Delivered / Received
                            </option>
                            <option value="Cancelled" className="bg-white text-gray-800">
                              Cancelled
                            </option>
                          </select>
                          <div className="pointer-events-none absolute right-2.5 flex items-center">
                            {isUpdating ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-gray-500" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectOrder(o);
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              isSelected
                                ? 'bg-brand-brown text-white shadow-xs'
                                : 'text-gray-600 hover:text-brand-brown hover:bg-gray-100'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isSelected ? 'Viewing' : 'Details'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOrderToDelete(o);
                            }}
                            title="Delete Order"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 hover:text-white hover:bg-red-600 bg-red-50 border border-red-200 transition-colors shadow-2xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
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
                  `Hello ${selectedOrder.customer.fullName}! We are contacting you from APNA Bazar regarding your order ${selectedOrder.orderNumber} (Status: ${selectedOrder.status}).`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                title="Message customer directly on WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Customer</span>
              </a>

              {/* Delete Order Action */}
              <button
                type="button"
                onClick={() => setOrderToDelete(selectedOrder)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                title="Delete this order"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Order</span>
              </button>

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

          {/* Upper Section: Customer, Shipping, and Payment Cards */}
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

            {/* Order Status Dropdown & Payment Summary Card */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-brown font-bold text-xs uppercase tracking-wider">
                  <CreditCard className="w-4 h-4" />
                  <span>Update Order Status</span>
                </div>
                {updatingOrderId === selectedOrder.id && (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-brown" />
                )}
              </div>

              {/* Status Select Dropdown in Details Box */}
              <div>
                <label className="block text-[11px] text-gray-400 font-medium mb-1">
                  Change Current Status:
                </label>
                <select
                  value={
                    selectedOrder.status === 'Processing'
                      ? 'Confirmed'
                      : selectedOrder.status === 'Shipped'
                      ? 'Out for Delivery'
                      : selectedOrder.status === 'Received'
                      ? 'Delivered'
                      : selectedOrder.status
                  }
                  disabled={updatingOrderId === selectedOrder.id}
                  onChange={(e) =>
                    handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)
                  }
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-brand-black focus:outline-none focus:border-brand-brown"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered / Received</option>
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

          {/* Lower Section: Items Table */}
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
                                unoptimized
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

      {/* ======================================================== */}
      {/* DELETE ORDER CONFIRMATION MODAL                          */}
      {/* ======================================================== */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-5 animate-scaleUp">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-black">Delete Order Confirmation</h3>
                <p className="text-xs text-gray-500">This action will permanently remove this order.</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80 text-xs space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-bold text-brand-brown">#{orderToDelete.orderNumber || orderToDelete.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Customer:</span>
                <span className="font-semibold text-brand-black">{orderToDelete.customer.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="font-medium text-gray-700">{orderToDelete.customer.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">City / Address:</span>
                <span className="font-medium text-gray-700">{orderToDelete.customer.city}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200/60 pt-2">
                <span className="text-gray-500">Total Amount:</span>
                <span className="font-extrabold text-brand-black text-sm">{formatPrice(orderToDelete.total)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setOrderToDelete(null)}
                className="px-4 py-2.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteOrder}
                className="px-5 py-2.5 rounded-lg text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-2 shadow-sm disabled:opacity-75 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Deleting Order...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Yes, Delete Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUCCESS TOAST NOTIFICATION                               */}
      {/* ======================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-medium animate-fadeIn border border-emerald-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="p-1 hover:bg-white/10 rounded transition-colors ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
