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

  // ... existing code ...

if (submitted) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-brand-surface/20 to-background text-foreground relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-purple/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#e7dbc7]/20 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-brand-purple/5 rounded-full animate-spin"></div>
      </div>
      
      {/* Main content with animations */}
      <div className="relative z-10 text-center space-y-6 animate-fade-in">
        {/* Success icon with animation */}
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div className="absolute inset-0 w-24 h-24 bg-green-400/30 rounded-full animate-ping"></div>
        </div>
        
        {/* Title with gradient and animation */}
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-brand-purple via-green-500 to-brand-purple bg-clip-text text-transparent animate-pulse">
          Order Confirmed! 🎉
        </h1>
        
        <p className="text-lg text-muted-foreground animate-fade-in-delay">
          A confirmation email will be sent to you soon.
        </p>
        
        {/* Order number with special styling */}
        <div className="bg-gradient-to-r from-brand-purple/10 to-green-500/10 p-4 rounded-2xl border border-brand-purple/20 animate-fade-in-delay2">
          <p className="text-sm text-muted-foreground mb-1">Your Order Number:</p>
          <p className="text-2xl font-bold text-brand-purple tracking-wider">{orderNumber}</p>
        </div>
        
        {/* Order details card with slide-in animation */}
        <div className="w-full max-w-lg bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-border/50 animate-slide-in-up space-y-4">
          <h2 className="font-bold text-xl mb-4 text-center">Order Details</h2>
          <div className="grid grid-cols-2 gap-4 text-left">
            <div><span className="font-semibold text-brand-purple">Name:</span> {form.name}</div>
            <div><span className="font-semibold text-brand-purple">Email:</span> {form.email}</div>
            <div><span className="font-semibold text-brand-purple">Phone:</span> {form.phone}</div>
            <div><span className="font-semibold text-brand-purple">Address:</span> {form.address}</div>
          </div>
          
          <div className="border-t border-border pt-4 mt-4">
            <h3 className="font-bold mb-3 text-center">Order Summary</h3>
            <div className="space-y-2">
              {orderCart.map((item, index) => (
                <div key={item.id} className="flex justify-between text-sm animate-fade-in-delay3" style={{ animationDelay: `${index * 100}ms` }}>
                  <span>{item.name} x {item.quantity}</span>
                  <span className="font-semibold">Rs {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-xl mt-4 pt-3 border-t border-border">
              <span>Total:</span>
              <span className="text-brand-purple">Rs {orderTotal}</span>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay4">
          <button
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-purple-600 text-white font-bold hover:from-purple-600 hover:to-brand-purple transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => navigate("/")}
          >
            🏠 Back to Home
          </button>
          <button
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#e7dbc7] to-beige-400 text-black font-bold hover:from-beige-400 hover:to-[#e7dbc7] transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => navigate("/order-history")}
          >
            📋 View Orders
          </button>
        </div>
      </div>
    </div>
  );
}

// ... existing code ...

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
      <div className="w-full py-6 bg-red-600 mb-2 shadow-lg">
      <div className="text-center">
        <span className="text-white font-bold text-xl tracking-wide">
          �� Free shipping over 2000-Rs (for Lahore only) 🚚
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