import React, { useState } from 'react';
import { Search, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { getOrdersByPhone } from '../../utils/api';
import toast from 'react-hot-toast';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  .uz-orders { background: #faf8f5; padding: 48px 0 80px; min-height: 70vh; }

  .uz-orders-inner { max-width: 700px; margin: 0 auto; padding: 0 24px; }

  .uz-orders-header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 32px;
    border-bottom: 1px solid #ede7da;
    position: relative;
  }

  .uz-orders-header::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 48px;
    height: 2px;
    background: #d4af37;
  }

  .uz-orders-header h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2rem;
    font-weight: 400;
    color: #1a1a1a;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }

  .uz-orders-header p {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: #888;
    letter-spacing: 0.3px;
  }

  .uz-phone-form { margin-bottom: 40px; }

  .uz-phone-input-row {
    display: flex;
    gap: 0;
    border: 1px solid #ddd;
    border-radius: 2px;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }

  .uz-phone-input-row input {
    flex: 1;
    padding: 14px 18px;
    border: none;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: #1a1a1a;
    background: white;
  }

  .uz-phone-input-row input::placeholder { color: #bbb; }

  .uz-phone-search-btn {
    padding: 14px 28px;
    background: #d4af37;
    color: #1a0a00;
    border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .uz-phone-search-btn:hover { background: #c9a632; }
  .uz-phone-search-btn:disabled { background: #ccc; cursor: not-allowed; }

  .uz-results-count {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    color: #aaa;
    margin-bottom: 16px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .uz-orders-list { display: flex; flex-direction: column; gap: 12px; }

  .uz-order-card {
    border: 1px solid #ede7da;
    border-radius: 2px;
    overflow: hidden;
    background: white;
    transition: box-shadow 0.2s;
  }

  .uz-order-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }

  .uz-order-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    cursor: pointer;
    transition: background 0.15s;
    gap: 16px;
    flex-wrap: wrap;
  }

  .uz-order-card-header:hover { background: #faf9f6; }

  .uz-order-meta { flex: 1; }

  .uz-order-num {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 3px;
  }

  .uz-order-date {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    color: #aaa;
    letter-spacing: 0.3px;
  }

  .uz-order-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .uz-order-status {
    padding: 4px 12px;
    border-radius: 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .uz-order-status.pending { background: #fff8e1; color: #b8860b; }
  .uz-order-status.shipped { background: #e3f2fd; color: #1565c0; }
  .uz-order-status.delivered { background: #e8f5e9; color: #2e7d32; }

  .uz-order-amount {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  .uz-order-expand {
    background: none;
    border: none;
    cursor: pointer;
    color: #d4af37;
    padding: 2px;
    display: flex;
  }

  .uz-order-body {
    border-top: 1px solid #ede7da;
    padding: 24px 20px;
    background: #faf9f6;
  }

  /* Tracker */
  .uz-tracker {
    display: flex;
    align-items: center;
    margin-bottom: 28px;
    padding: 0 8px;
  }

  .uz-track-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
    position: relative;
  }

  .uz-track-dot {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ddd;
    border: 2px solid white;
    box-shadow: 0 0 0 2px #ddd;
    z-index: 1;
    transition: all 0.3s;
  }

  .uz-track-step.done .uz-track-dot {
    background: #d4af37;
    box-shadow: 0 0 0 2px #d4af37;
  }

  .uz-track-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem;
    color: #bbb;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.5px;
  }

  .uz-track-step.done .uz-track-label { color: #1a1a1a; font-weight: 600; }

  .uz-track-line {
    position: absolute;
    top: 9px;
    left: 50%;
    width: 100%;
    height: 2px;
    background: #ddd;
    z-index: 0;
    transition: background 0.3s;
  }

  .uz-track-line.done { background: #d4af37; }

  .uz-order-items-title {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 12px;
  }

  .uz-order-item-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #ede7da;
  }

  .uz-order-item-row:last-child { border-bottom: none; }

  .uz-order-item-img {
    width: 44px;
    height: 44px;
    border-radius: 2px;
    overflow: hidden;
    background: #f7f3ed;
    border: 1px solid #ede7da;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .uz-order-item-img img { width: 100%; height: 100%; object-fit: cover; }

  .uz-oi-name { flex: 1; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #1a1a1a; }
  .uz-oi-qty { font-family: 'DM Sans', sans-serif; font-size: 0.78rem; color: #aaa; }
  .uz-oi-price { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 600; color: #1a1a1a; }

  .uz-order-info { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }

  .uz-oi-group label {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #d4af37;
    margin-bottom: 6px;
  }

  .uz-oi-group p { font-family: 'DM Sans', sans-serif; font-size: 0.82rem; color: #1a1a1a; line-height: 1.6; }

  .uz-no-orders {
    text-align: center;
    padding: 60px 20px;
  }

  .uz-no-orders h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 400;
    margin: 20px 0 8px;
    color: #1a1a1a;
  }

  .uz-no-orders p { font-family: 'DM Sans', sans-serif; font-size: 0.85rem; color: #888; }

  @media (max-width: 600px) {
    .uz-phone-input-row { flex-direction: column; border: none; gap: 10px; }
    .uz-phone-input-row input { border: 1px solid #ddd; border-radius: 2px; }
    .uz-phone-search-btn { width: 100%; justify-content: center; border-radius: 2px; }
    .uz-order-info { grid-template-columns: 1fr; }
  }
`;

const statusClass = (s) => s === 'Pending' ? 'pending' : s === 'Shipped' ? 'shipped' : 'delivered';

const MyOrders = () => {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    try {
      const res = await getOrdersByPhone(phone.trim());
      setOrders(res.data);
      setSearched(true);
    } catch {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="uz-orders">
        <div className="uz-orders-inner">
          <div className="uz-orders-header">
            <h1>My Orders</h1>
            <p>Enter your phone number to track your orders</p>
          </div>

          <form onSubmit={handleSearch} className="uz-phone-form">
            <div className="uz-phone-input-row">
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                maxLength={15}
              />
              <button type="submit" className="uz-phone-search-btn" disabled={loading}>
                <Search size={15} />
                {loading ? 'Searching…' : 'Track Orders'}
              </button>
            </div>
          </form>

          {searched && (
            <>
              {orders.length === 0 ? (
                <div className="uz-no-orders">
                  <Package size={56} color="#d4af37" />
                  <h3>No orders found</h3>
                  <p>No orders found for this phone number.</p>
                </div>
              ) : (
                <>
                  <p className="uz-results-count">{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
                  <div className="uz-orders-list">
                    {orders.map(order => (
                      <div key={order.id} className="uz-order-card">
                        <div
                          className="uz-order-card-header"
                          onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                        >
                          <div className="uz-order-meta">
                            <div className="uz-order-num">{order.order_number}</div>
                            <div className="uz-order-date">
                              {new Date(order.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className="uz-order-right">
                            <span className={`uz-order-status ${statusClass(order.status)}`}>
                              {order.status}
                            </span>
                            <span className="uz-order-amount">
                              Rs. {parseFloat(order.total_amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                            <span style={{
                              fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem',
                              color: '#888', background: '#f7f3ed', padding: '3px 10px',
                              borderRadius: 20, border: '1px solid #ede7da', letterSpacing: '0.5px'
                            }}>
                              {order.payment_method}
                            </span>
                          </div>
                          <button className="uz-order-expand">
                            {expandedId === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                        </div>

                        {expandedId === order.id && (
                          <div className="uz-order-body">
                            {/* Tracker */}
                            <div className="uz-tracker">
                              {['Pending', 'Shipped', 'Delivered'].map((step, i) => {
                                const idx = ['Pending', 'Shipped', 'Delivered'].indexOf(order.status);
                                return (
                                  <div key={step} className={`uz-track-step ${i <= idx ? 'done' : ''}`}>
                                    <div className="uz-track-dot" />
                                    <span className="uz-track-label">{step}</span>
                                    {i < 2 && <div className={`uz-track-line ${i < idx ? 'done' : ''}`} />}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="uz-order-items-title">Items Ordered</div>
                            {order.items?.map(item => (
                              <div key={item.id} className="uz-order-item-row">
                                <div className="uz-order-item-img">
                                  {item.product_image
                                    ? <img src={item.product_image} alt={item.product_name} />
                                    : <Package size={18} color="#d4af37" />}
                                </div>
                                <span className="uz-oi-name">{item.product_name}</span>
                                <span className="uz-oi-qty">× {item.quantity}</span>
                                <span className="uz-oi-price">
                                  Rs. {(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </span>
                              </div>
                            ))}

                            <div className="uz-order-info">
                              <div className="uz-oi-group">
                                <label>Delivery Address</label>
                                <p>{order.customer_address}</p>
                              </div>
                              {order.upi_reference && (
                                <div className="uz-oi-group">
                                  <label>UPI Reference</label>
                                  <p>{order.upi_reference}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyOrders;