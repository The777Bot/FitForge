import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", address: "", phone: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderCart, setOrderCart] = useState<typeof cartItems>([]);
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Name is required.";
    if (!form.email) newErrors.email = "Email is required.";
    if (!form.phone) newErrors.phone = "Phone number is required.";
    if (!form.address) newErrors.address = "Address is required.";
    return newErrors;
  };

  const saveOrderToHistory = (order: any) => {
    const key = `order-history-${form.email || form.phone}`;
    const prev = localStorage.getItem(key);
    const history = prev ? JSON.parse(prev) : [];
    history.push(order);
    localStorage.setItem(key, JSON.stringify(history));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Generate a unique order number (e.g., YYMMDD + random 4 digits)
    const now = new Date();
    const datePart = `${now.getFullYear().toString().slice(2)}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}`;
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const orderNum = `FF-${datePart}-${randomPart}`;
    setOrderNumber(orderNum);
    setOrderCart(cartItems);
    setOrderTotal(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0));
    setSubmitted(true);
    // Save order to localStorage for this customer
    saveOrderToHistory({
      orderNumber: orderNum,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: now.toISOString(),
    });
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="mb-2">A confirmation email will be sent to you soon.</p>
        <p className="mb-8 font-semibold text-lg">Your Order Number: <span className="text-brand-purple">{orderNumber}</span></p>
        <div className="w-full max-w-lg bg-card p-6 rounded-2xl shadow space-y-4 mb-8">
          <h2 className="font-bold text-lg mb-2">Order Details</h2>
          <div className="text-left space-y-1">
            <div><span className="font-semibold">Name:</span> {form.name}</div>
            <div><span className="font-semibold">Email:</span> {form.email}</div>
            <div><span className="font-semibold">Phone:</span> {form.phone}</div>
            <div><span className="font-semibold">Address:</span> {form.address}</div>
          </div>
          <div className="border-t border-border pt-4 mt-4">
            <h3 className="font-bold mb-2">Order Summary</h3>
            <ul className="mb-2">
              {orderCart.map((item) => (
                <li key={item.id} className="flex justify-between text-sm mb-1">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${orderTotal}</span>
            </div>
          </div>
        </div>
        <button
          className="px-6 py-2 rounded-lg bg-[hsl(0,0%,10%)] text-[hsl(45,33%,90%)] font-semibold hover:bg-[hsl(0,0%,0%)] hover:text-[hsl(45,33%,100%)] transition mb-8 shadow-lg border border-[hsl(45,33%,90%)]"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
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
      <h1 className="text-4xl font-black mb-8 mt-12">Checkout</h1>
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
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-2 font-semibold" htmlFor="phone">Phone Number</label>
          <input
            className="w-full p-3 rounded-lg border border-border bg-muted/30 text-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
            type="tel"
            name="phone"
            id="phone"
            value={form.phone}
            onChange={handleChange}
            required
            pattern="[0-9\-\+\s\(\)]{7,15}"
            placeholder="e.g. 0300-1234567"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
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
          className="w-full py-3 rounded-lg bg-[hsl(45,33%,90%)] text-[hsl(0,0%,10%)] font-bold text-lg hover:bg-[hsl(45,33%,95%)] transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
