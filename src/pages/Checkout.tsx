import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    setTimeout(() => navigate("/"), 2500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="mb-8">A confirmation email will be sent to you soon.</p>
        <div className="animate-fade-in text-6xl">🎉</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-black mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-card p-8 rounded-2xl shadow-lg space-y-6">
        <div>
          <label className="block mb-2 font-semibold" htmlFor="name">Name</label>
          <input
            className="w-full p-3 rounded-lg border border-border bg-muted/30 text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
          <input
            className="w-full p-3 rounded-lg border border-border bg-muted/30 text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold" htmlFor="address">Shipping Address</label>
          <textarea
            className="w-full p-3 rounded-lg border border-border bg-muted/30 text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
            name="address"
            id="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="border-t border-border pt-4">
          <h2 className="font-bold mb-2">Order Summary</h2>
          <ul className="mb-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name} x {item.quantity}</span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[hsl(45,33%,80%)] text-[hsl(0,0%,10%)] font-bold text-lg hover:bg-[hsl(45,33%,90%)] transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
