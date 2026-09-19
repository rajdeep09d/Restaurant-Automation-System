import React, { useState } from 'react';

export default function OwnerDashboard({ 
  activityLogs, 
  onRestockLowInventory, 
  onVacateTable, 
  onSendSupplyRequest,
  onAddNewMenuItem,
  kpiMetrics
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '', desc: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    
    onAddNewMenuItem({
      name: newItem.name,
      price: parseFloat(newItem.price),
      desc: newItem.desc,
      category: 'sides',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'
    });

    setNewItem({ name: '', price: '', desc: '' });
    setIsModalOpen(false);
  };

  return (
    <section id="owner-dashboard">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Owner Analytics & Dashboard</h2>
          <p className="text-gray-600 text-sm">Real-time business performance, table layouts, and inventory control</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg font-medium shadow-sm transition flex items-center"
          >
            <i className="fa-solid fa-plus mr-1.5"></i> Add Menu Item
          </button>
          <button 
            onClick={onRestockLowInventory}
            className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-2 rounded-lg font-medium shadow-sm transition flex items-center"
          >
            <i className="fa-solid fa-truck-ramp-box mr-1.5"></i> Auto-Restock Low Inventory
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="text-gray-400 text-xs font-semibold uppercase">Gross Revenue</span>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">${kpiMetrics.grossRevenue.toFixed(2)}</h3>
          <span className="text-emerald-500 text-xs font-semibold"><i className="fa-solid fa-arrow-up"></i> +14.2% vs yesterday</span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="text-gray-400 text-xs font-semibold uppercase">Estimated Net Profit</span>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">${kpiMetrics.netProfit.toFixed(2)}</h3>
          <span className="text-gray-400 text-xs font-semibold">Food Cost Est: ~32%</span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="text-gray-400 text-xs font-semibold uppercase">Low Stock Alerts</span>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">{kpiMetrics.lowStockCount} Items</h3>
          <span className="text-rose-500 text-xs font-semibold">Action needed</span>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <span className="text-gray-400 text-xs font-semibold uppercase">Customer Rating</span>
          <h3 className="text-2xl font-bold text-amber-500 mt-1">4.9 / 5.0</h3>
          <span className="text-gray-400 text-xs font-semibold">142 Reviews today</span>
        </div>
      </div>

      {/* Floor Plan & Tables */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 flex items-center">
            <i className="fa-solid fa-chair text-indigo-600 mr-2"></i> Real-time Table Occupancy & Seating
          </h3>
          <span className="text-xs text-gray-500">Updates live when customers order</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {kpiMetrics.tables.map((tbl) => {
            const isOccupied = tbl.status.startsWith('Occupied');
            const isReserved = tbl.status === 'Reserved';
            let bgClass = "bg-emerald-50 border-emerald-300 text-emerald-700";
            if (isOccupied) bgClass = "bg-amber-50 border-amber-300 text-amber-700";
            if (isReserved) bgClass = "bg-indigo-50 border-indigo-300 text-indigo-700";

            return (
              <div key={tbl.id} className={`border p-3 rounded-lg text-center relative ${bgClass}`}>
                <span className="text-xs font-bold block text-gray-700">{tbl.id}</span>
                <span className="text-[11px] font-semibold block my-1">{tbl.status}</span>
                <button 
                  onClick={() => onVacateTable(tbl.id)} 
                  className="text-[10px] bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-2 py-0.5 rounded shadow-xs"
                >
                  Reset Table
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Inventory & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Raw Ingredient Inventory</h3>
            <span className="text-xs text-indigo-600 font-medium">Auto-deducts on customer order</span>
          </div>
          <div className="space-y-4">
            {kpiMetrics.inventory.map((inv) => {
              let colorClass = "bg-emerald-500 text-emerald-600";
              if (inv.qty <= 20) colorClass = "bg-rose-500 text-rose-600";
              else if (inv.qty <= 40) colorClass = "bg-amber-500 text-amber-600";

              return (
                <div key={inv.id}>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>{inv.name}</span>
                    <span className={`font-bold ${colorClass.split(' ')[1]}`}>{inv.qty}% Left</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className={`${colorClass.split(' ')[0]} h-2 rounded-full transition-all duration-500`} style={{ width: `${inv.qty}%` }}></div>
                  </div>
                  <button 
                    onClick={() => onSendSupplyRequest(inv.name, '30 Kg', inv.id)} 
                    className="text-[11px] bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium px-2.5 py-1 rounded"
                  >
                    Send Order Request (+50%)
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Logs */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Live System Activity Log</h3>
            </div>
            <ul className="space-y-3 text-xs text-gray-600 max-h-64 overflow-y-auto pr-1">
              {activityLogs.map((log) => (
                <li key={log.id} className="flex items-center space-x-2">
                  <i className={`fa-solid ${log.iconClass || 'fa-circle-check text-emerald-500'}`}></i>
                  <span>{log.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="font-bold text-lg text-gray-800">Add New Menu Item</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Item Name</label>
                <input 
                  type="text" 
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Crispy Veg Tacos" 
                  required 
                  className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Price ($)</label>
                <input 
                  type="number" 
                  step="0.01" 
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  placeholder="10.99" 
                  required 
                  className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea 
                  rows="2" 
                  value={newItem.desc}
                  onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })}
                  placeholder="Item details and ingredients..." 
                  required 
                  className="w-full text-sm border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-2 border-t pt-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border text-sm rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg">Save & Add Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}