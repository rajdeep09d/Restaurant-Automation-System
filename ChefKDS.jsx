import React, { useState } from 'react';

export default function ChefKDS({ orders, onUpdateOrderStatus }) {
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((o) => o.status === filter);

  return (
    <section id="chef-dashboard">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Kitchen Display System (KDS)</h2>
          <p className="text-gray-600 text-sm">Real-time live kitchen preparation queue and order management</p>
        </div>

        <div className="flex space-x-2">
          {['all', 'Pending', 'Preparing', 'Ready'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`text-xs px-3 py-1.5 rounded-md ${
                filter === st ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {st === 'all' ? 'All Orders' : st}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredOrders.map((ord) => {
          let borderClass = 'border-amber-500';
          let badgeClass = 'bg-amber-100 text-amber-800';
          if (ord.status === 'Preparing') {
            borderClass = 'border-blue-500';
            badgeClass = 'bg-blue-100 text-blue-800';
          } else if (ord.status === 'Ready') {
            borderClass = 'border-emerald-500 opacity-75';
            badgeClass = 'bg-emerald-100 text-emerald-800';
          }

          return (
            <div key={ord.id} className={`bg-white rounded-xl shadow-md border-l-4 ${borderClass} p-4`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-base font-bold">Order #{ord.id}</span>
                <span className={`${badgeClass} text-xs px-2 py-0.5 rounded-full font-semibold`}>{ord.status}</span>
              </div>
              <p className="text-[11px] text-gray-500 mb-3">
                <i className="fa-regular fa-clock mr-1"></i> {ord.table} • {ord.time}
              </p>

              <ul className="divide-y divide-gray-100 mb-4 text-xs">
                {ord.items.map((it, idx) => (
                  <li key={idx} className="py-1.5 flex justify-between">
                    <span>1x {it.name}</span>
                    <span className="font-medium">${it.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              {ord.status === 'Pending' && (
                <button
                  onClick={() => onUpdateOrderStatus(ord.id, 'Preparing')}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white py-1.5 rounded-lg font-medium text-xs transition"
                >
                  Start Preparing
                </button>
              )}

              {ord.status === 'Preparing' && (
                <button
                  onClick={() => onUpdateOrderStatus(ord.id, 'Ready')}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-1.5 rounded-lg font-medium text-xs transition"
                >
                  Mark as Ready
                </button>
              )}

              {ord.status === 'Ready' && (
                <button disabled className="w-full bg-gray-300 text-gray-600 py-1.5 rounded-lg font-medium text-xs cursor-not-allowed">
                  Completed
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}