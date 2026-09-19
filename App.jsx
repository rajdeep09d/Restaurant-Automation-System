import React, { useState } from 'react';
import OwnerDashboard from './components/OwnerDashboard';
import GuestMenu from './components/GuestMenu';
import ChefKDS from './components/ChefKDS';
import SupplierPortal from './components/SupplierPortal';

export default function App() {
  const [activeRole, setActiveRole] = useState('owner');

  // Shared State
  const [logs, setLogs] = useState([
    { id: 1, text: 'System initialized & operational across all modules.', iconClass: 'fa-circle-check text-emerald-500' }
  ]);

  const [tables, setTables] = useState([
    { id: 'Table 01', status: 'Occupied (4 Guests)' },
    { id: 'Table 02', status: 'Available' },
    { id: 'Table 03', status: 'Reserved' },
    { id: 'Table 04', status: 'Occupied (2 Guests)' },
    { id: 'Table 05', status: 'Available' },
    { id: 'Table 06', status: 'Available' },
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, name: 'Cheese Mozzarella', qty: 15 },
    { id: 2, name: 'Fresh Tomatoes', qty: 35 },
    { id: 3, name: 'Fresh Paneer & Tofu Stock', qty: 75 },
    { id: 4, name: 'French Fries Stock', qty: 60 },
  ]);

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Grilled Paneer Burger', price: 11.99, desc: 'Marinated grilled cottage cheese patty with mint mayo.', category: 'mains', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500' },
    { id: 2, name: 'Margherita Pizza', price: 14.50, desc: 'Fresh mozzarella, organic tomatoes, basil.', category: 'pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500' },
    { id: 3, name: 'Crispy Golden Fries', price: 4.99, desc: 'Hand-cut golden fries seasoned with sea salt.', category: 'sides', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500' },
    { id: 4, name: 'Truffle Mushroom Risotto', price: 15.75, desc: 'Creamy Arborio rice with wild mushrooms, truffle oil.', category: 'mains', image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=500' },
  ]);

  const [chefOrders, setChefOrders] = useState([
    { id: '100', table: 'Table 01', time: '15 mins ago', status: 'Ready', items: [{ name: 'Margherita Pizza', price: 14.50 }] },
    { id: '101', table: 'Table 04', time: '4 mins ago', status: 'Pending', items: [{ name: 'Grilled Paneer Burger', price: 11.99 }] },
    { id: '102', table: 'Table 02', time: '2 mins ago', status: 'Preparing', items: [{ name: 'Truffle Mushroom Risotto', price: 15.75 }] },
    { id: '103', table: 'Table 05', time: 'Just Now', status: 'Pending', items: [{ name: 'Margherita Pizza', price: 14.50 }] },
  ]);

  const [poRequests, setPoRequests] = useState([
    { id: '891', itemName: 'Organic Fresh Milk', qty: '50 L', status: 'Requested' },
    { id: '892', itemName: 'Fresh Cottage Cheese (Paneer)', qty: '35 Kg', status: 'Requested' },
    { id: '893', itemName: 'Garlic & Herb Seasoning Packs', qty: '150 Units', status: 'Dispatched' },
  ]);

  // Log Helper
  const logActivity = (text, iconClass) => {
    setLogs((prev) => [{ id: Date.now(), text, iconClass }, ...prev]);
  };

  // State Handlers
  const handleVacateTable = (tableId) => {
    setTables((prev) => prev.map((t) => t.id === tableId ? { ...t, status: 'Available' } : t));
    logActivity(`Table ${tableId} reset to Available.`, 'fa-sparkles text-emerald-500');
  };

  const handleSendSupplyRequest = (itemName, qty) => {
    const newId = (poRequests.length + 894).toString();
    setPoRequests((prev) => [{ id: newId, itemName, qty, status: 'Requested' }, ...prev]);
    logActivity(`Purchase request #PO-${newId} sent for ${itemName}.`, 'fa-truck text-indigo-500');
  };

  const handleDispatchSupply = (poId, itemName) => {
    setPoRequests((prev) => prev.map((p) => p.id === poId ? { ...p, status: 'Dispatched' } : p));
    setInventory((prev) => prev.map((inv) => ({ ...inv, qty: 85 })));
    logActivity(`Supplier dispatched #PO-${poId} (${itemName}). Inventory refilled!`, 'fa-box text-emerald-500');
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    setChefOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status } : o));
    logActivity(`Order #${orderId} marked as ${status}.`, 'fa-fire text-amber-500');
  };

  const handlePlaceOrder = (cartItems, tableNum) => {
    const newOrderId = (chefOrders.length + 104).toString();
    setChefOrders((prev) => [
      ...prev,
      { id: newOrderId, table: tableNum, time: 'Just now', status: 'Pending', items: cartItems }
    ]);
    setTables((prev) => prev.map((t) => t.id === tableNum ? { ...t, status: 'Occupied (2 Guests)' } : t));
    logActivity(`New Guest Order #${newOrderId} from ${tableNum}.`, 'fa-bell text-amber-500');
  };

  const handleAddNewMenuItem = (newItem) => {
    setMenuItems((prev) => [...prev, { ...newItem, id: Date.now() }]);
    logActivity(`Owner added menu item: ${newItem.name}.`, 'fa-circle-plus text-indigo-500');
  };

  // Calculated Metrics
  const grossRevenue = 2845.50 + chefOrders.length * 15;
  const netProfit = grossRevenue * 0.40;

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800 pb-12">
      <header className="bg-indigo-900 text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <i className="fa-solid fa-utensils text-2xl text-amber-400"></i>
            <div>
              <h1 className="text-xl font-bold tracking-wide">DineTech Pro</h1>
              <p className="text-[10px] text-indigo-300">Automated Restaurant Management System</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-indigo-800 p-1.5 rounded-lg border border-indigo-700">
            <label className="text-xs font-semibold text-gray-300 ml-2">Active View Role:</label>
            <select 
              value={activeRole} 
              onChange={(e) => setActiveRole(e.target.value)} 
              className="bg-indigo-900 text-white text-sm font-medium rounded-md px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="owner">Restaurant Owner</option>
              <option value="guest">Guest User / Customer</option>
              <option value="chef">Kitchen Chef (KDS)</option>
              <option value="supplier">Food Supplier</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6">
        {activeRole === 'owner' && (
          <OwnerDashboard 
            activityLogs={logs}
            onVacateTable={handleVacateTable}
            onSendSupplyRequest={handleSendSupplyRequest}
            onRestockLowInventory={() => handleSendSupplyRequest('Cheese Mozzarella', '20 Kg')}
            onAddNewMenuItem={handleAddNewMenuItem}
            kpiMetrics={{
              grossRevenue,
              netProfit,
              lowStockCount: inventory.filter(i => i.qty <= 20).length,
              tables,
              inventory
            }}
          />
        )}

        {activeRole === 'guest' && (
          <GuestMenu menuItems={menuItems} onPlaceOrder={handlePlaceOrder} />
        )}

        {activeRole === 'chef' && (
          <ChefKDS orders={chefOrders} onUpdateOrderStatus={handleUpdateOrderStatus} />
        )}

        {activeRole === 'supplier' && (
          <SupplierPortal poRequests={poRequests} onDispatchSupply={handleDispatchSupply} />
        )}
      </main>
    </div>
  );
}