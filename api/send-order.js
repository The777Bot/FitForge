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
    const data = await resend.emails.send({
      from: 'FitForge <onboarding@resend.dev>',
      to: ['fitforge.pk@gmail.com', email], // send to both business and customer
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
    console.log('Resend email sent:', data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ error: error.message });
  }
} 