import React, { useState } from 'react';

export default function GuestMenu({ menuItems, onPlaceOrder }) {
  const [filter, setFilter] = useState('all');
  const [selectedTable, setSelectedTable] = useState('Table 04');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const handleOrderSubmit = () => {
    if (cart.length === 0) return;
    onPlaceOrder(cart, selectedTable);
    setCart([]);
    setIsCartOpen(false);
  };

  const totalCartPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

  const filteredItems = filter === 'all' 
    ? menuItems 
    : menuItems.filter((i) => i.category === filter);

  return (
    <section id="guest-dashboard">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Scan & Order (Self-Service POS)</h2>
          <p className="text-gray-600 text-sm">Select your table, add delicious items to cart, and send directly to the kitchen!</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between">
          <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
            <i className="fa-solid fa-chair text-indigo-600 text-sm"></i>
            <span className="text-xs font-semibold text-gray-600">Your Table:</span>
            <select 
              value={selectedTable} 
              onChange={(e) => setSelectedTable(e.target.value)} 
              className="text-sm font-bold text-indigo-900 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Table 01">Table 01</option>
              <option value="Table 02">Table 02</option>
              <option value="Table 03">Table 03</option>
              <option value="Table 04">Table 04</option>
              <option value="Table 05">Table 05</option>
              <option value="Table 06">Table 06</option>
            </select>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition flex items-center"
          >
            <i className="fa-solid fa-cart-shopping mr-2"></i> View Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {['all', 'mains', 'pizza', 'sides'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs font-semibold px-4 py-2 rounded-full transition ${
              filter === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            {cat === 'all' ? 'All Items' : cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <img src={item.image} className="w-full h-40 object-cover" alt={item.name} />
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <span className="text-indigo-600 font-bold">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              <button 
                onClick={() => addToCart(item)}
                className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg font-medium transition flex items-center justify-center"
              >
                <i className="fa-solid fa-plus mr-2"></i> Add to Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="font-bold text-lg text-gray-800">Your Selected Order</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto mb-4">
              {cart.length === 0 ? (
                <p className="text-sm text-gray-500 italic py-2">Your cart is currently empty.</p>
              ) : (
                cart.map((c, i) => (
                  <div key={i} className="flex justify-between items-center py-2 text-sm">
                    <span>{c.name}</span>
                    <span className="font-semibold">${c.price.toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-3 mb-4">
              <span>Total Amount:</span>
              <span>${totalCartPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsCartOpen(false)} className="px-4 py-2 border text-sm rounded-lg text-gray-600 hover:bg-gray-50">Continue Browsing</button>
              <button onClick={handleOrderSubmit} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">Confirm & Send Order</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}