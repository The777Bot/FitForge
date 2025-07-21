import { useState } from "react";

const OrderHistory = () => {
  const [identifier, setIdentifier] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [touched, setTouched] = useState(false);

  const handleFetch = () => {
    if (!identifier) return;
    const key = `order-history-${identifier}`;
    const history = localStorage.getItem(key);
    setOrders(history ? JSON.parse(history) : []);
    setTouched(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-black mb-8 mt-12">Order History</h1>
      <div className="w-full max-w-lg bg-card p-8 rounded-2xl shadow-lg space-y-6 mb-8">
        <label className="block mb-2 font-semibold" htmlFor="identifier">
          Enter your email or phone number
        </label>
        <input
          className="w-full p-3 rounded-lg border border-border bg-muted/30 text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
          type="text"
          id="identifier"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          placeholder="Email or phone number"
        />
        <button
          className="w-full py-3 rounded-lg bg-[hsl(0,0%,10%)] text-[hsl(45,33%,90%)] font-bold text-lg hover:bg-[hsl(0,0%,0%)] hover:text-[hsl(45,33%,100%)] transition shadow-lg border border-[hsl(45,33%,90%)]"
          onClick={handleFetch}
        >
          View Order History
        </button>
      </div>
      {touched && orders.length === 0 && (
        <div className="text-lg text-red-500 mb-8">No orders found for this identifier.</div>
      )}
      {orders.length > 0 && (
        <div className="w-full max-w-2xl space-y-8">
          {orders.map((order, idx) => (
            <div key={order.orderNumber + idx} className="bg-card p-6 rounded-2xl shadow space-y-2 border border-border">
              <div className="font-bold text-lg mb-1">Order #{order.orderNumber}</div>
              <div className="text-sm text-muted-foreground mb-2">Placed on {new Date(order.date).toLocaleString()}</div>
              <div><span className="font-semibold">Name:</span> {order.name}</div>
              <div><span className="font-semibold">Email:</span> {order.email}</div>
              <div><span className="font-semibold">Phone:</span> {order.phone}</div>
              <div><span className="font-semibold">Address:</span> {order.address}</div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="font-bold mb-1">Order Summary</div>
                <ul className="mb-2">
                  {order.items.map((item: any) => (
                    <li key={item.id} className="flex justify-between text-sm mb-1">
                      <span>{item.name} x {item.quantity}</span>
                      <span>Rs {item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-bold text-lg">
                                      <span>Total:</span>
                    <span>Rs {order.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 