import React, { useState } from 'react';

export default function SupplierPortal({ poRequests, onDispatchSupply }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? poRequests
    : poRequests.filter((r) => r.status === filter);

  return (
    <section id="supplier-dashboard">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Food Supplier Supply Portal</h2>
          <p className="text-gray-600 text-sm">Manage incoming restock purchase orders sent by the Restaurant Owner</p>
        </div>

        <div className="flex space-x-2">
          {['all', 'Requested', 'Dispatched'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`text-xs px-3 py-1.5 rounded-md ${
                filter === st ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {st === 'all' ? 'All Supply Orders' : st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-4">PO Code</th>
              <th className="p-4">Item Requested</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filtered.map((req) => (
              <tr key={req.id}>
                <td className="p-4 font-semibold">#PO-{req.id}</td>
                <td className="p-4">{req.itemName}</td>
                <td className="p-4">{req.qty}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    req.status === 'Dispatched' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {req.status === 'Requested' ? (
                    <button
                      onClick={() => onDispatchSupply(req.id, req.itemName)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded font-medium"
                    >
                      Accept & Dispatch
                    </button>
                  ) : (
                    <button disabled className="bg-gray-300 text-gray-600 text-xs px-3 py-1.5 rounded font-medium cursor-not-allowed">
                      Dispatched
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}