import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  console.log('send-order function invoked');
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderNumber, name, email, phone, address, items, total, date } = req.body;
  console.log('Order data received:', { orderNumber, name, email, phone, address, items, total, date });

  try {
    // Send to business
    const businessData = await resend.emails.send({
      from: 'FitForge <onboarding@resend.dev>',
      to: ['fitforge.pk@gmail.com'],
      subject: `New Order: ${orderNumber}`,
      html: `
        <h2>New Order Received</h2>
        <p><b>Order Number:</b> ${orderNumber}</p>
        <p><b>Date:</b> ${date}</p>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Address:</b> ${address}</p>
        <h3>Order Summary</h3>
        <ul>
          ${items.map(item => `<li>${item.name} x${item.quantity} - Rs${item.price * item.quantity}</li>`).join('')}
        </ul>
        <p><b>Total:</b> Rs${total}</p>
      `,
    });

    // Send to customer
    const customerData = await resend.emails.send({
      from: 'FitForge <onboarding@resend.dev>',
      to: [email],
      subject: `Your Order Confirmation: ${orderNumber}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order has been received and is being processed.</p>
        <p><b>Order Number:</b> ${orderNumber}</p>
        <p><b>Date:</b> ${date}</p>
        <h3>Order Summary</h3>
        <ul>
          ${items.map(item => `<li>${item.name} x${item.quantity} - Rs${item.price * item.quantity}</li>`).join('')}
        </ul>
        <p><b>Total:</b> Rs${total}</p>
        <p>We will contact you soon for confirmation and shipping details.</p>
        <p>If you have any questions, reply to this email or contact us at fitforge.pk@gmail.com.</p>
      `,
    });

    console.log('Resend email sent to business:', businessData);
    console.log('Resend email sent to customer:', customerData);
    res.status(200).json({ success: true, business: businessData, customer: customerData });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ error: error.message });
  }
} 