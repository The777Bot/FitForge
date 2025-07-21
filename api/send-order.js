import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderNumber, name, email, phone, address, items, total, date } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FITFORGE_EMAIL || 'fitforge.pk@gmail.com',
      pass: process.env.FITFORGE_EMAIL_PASS || 'YOUR_APP_PASSWORD',
    },
  });

  const mailOptions = {
    from: 'fitforge.pk@gmail.com',
    to: 'fitforge.pk@gmail.com',
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
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 