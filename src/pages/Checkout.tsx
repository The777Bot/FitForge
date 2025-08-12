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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal < 2000 ? 150 : 0;
  const total = subtotal + deliveryFee;

  
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

  const saveOrderToDatabase = async (order: any) => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save order');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to save order to database:', error);
      throw error;
    }
  };

  const sendOrderEmail = async (order: any) => {
    try {
      console.log('📧 Attempting to send order email:', order);
      
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }
      
      console.log('✅ Email result:', result);
      
      // Check if customer email was successful
      if (result.customerSuccess) {
        console.log('✅ Customer email sent successfully');
      } else {
        console.warn('⚠️ Customer email failed, but order was processed');
      }
      
      // You can add a toast notification here
      // if (result.customerSuccess) {
      //   toast.success('Order confirmation email sent!');
      // } else {
      //   toast.warning('Order processed, but email delivery may be delayed');
      // }
      
    } catch (err) {
      console.error('❌ Failed to send order email:', err);
      
      // Try backup email service
      try {
        console.log('🔄 Trying backup email service...');
        const backupResponse = await fetch('/api/send-order-backup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order),
        });
        
        const backupResult = await backupResponse.json();
        console.log('✅ Backup email service result:', backupResult);
        
      } catch (backupErr) {
        console.error('❌ Backup email service also failed:', backupErr);
      }
      
      // You can add a toast notification here
      // toast.error('Email service temporarily unavailable. Your order is still processed.');
    }
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
    setOrderTotal(total);
    setSubmitted(true);
    
    // Save order to database
    const orderObj = {
      orderNumber: orderNum,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      items: cartItems,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
      date: now.toISOString(),
    };
    
    saveOrderToDatabase(orderObj);
    sendOrderEmail(orderObj);
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
                  <span>Rs {item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-lg">
                              <span>Total:</span>
                <span>Rs {orderTotal}</span>
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
      {/* Moving Red Banner */}
      <div className="w-full flex overflow-hidden py-2 bg-red-600 mb-8">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="text-white font-bold text-lg tracking-wide py-2 px-12">
            Free shipping over 2000-Rs (for Lahore only)
            <span className="mx-12">|</span>
            Free shipping over 2000-Rs (for Lahore only)
            <span className="mx-12">|</span>
            Free shipping over 2000-Rs (for Lahore only)
          </span>
          <span className="text-white font-bold text-lg tracking-wide py-2 px-12">
            Free shipping over 2000-Rs (for Lahore only)
            <span className="mx-12">|</span>
            Free shipping over 2000-Rs (for Lahore only)
            <span className="mx-12">|</span>
            Free shipping over 2000-Rs (for Lahore only)
          </span>
        </div>
      </div>
      <h1 className="text-4xl font-black mb-8 mt-12">Checkout</h1>
      
      {/* Order Summary */}
      <div className="w-full max-w-lg bg-card p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} x {item.quantity}</span>
              <span>Rs {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t border-border pt-3">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>Rs {subtotal}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Delivery Fee:</span>
                <span>Rs {deliveryFee}</span>
              </div>
            )}
               <div className="flex justify-between font-bold text-xl mt-3">
              <span>Total:</span>
              <span>Rs {total}</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-card p-8 rounded-2xl shadow-lg space-y-6">
        {/* ... existing form fields ... */}
        <div className="border-t border-border pt-4">
          <h2 className="font-bold mb-2">Order Summary</h2>
          <ul className="mb-2">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name} x {item.quantity}</span>
                <span>PKR {item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>Rs {total}</span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[hsl(0,0%,10%)] text-[hsl(45,33%,90%)] font-bold text-lg hover:bg-[hsl(0,0%,0%)] hover:text-[hsl(45,33%,100%)] transition shadow-lg border border-[hsl(45,33%,90%)]"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;