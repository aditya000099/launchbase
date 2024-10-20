import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = (amount, currency = 'INR') => {
  return new Promise((resolve, reject) => {
    razorpay.orders.create({ amount, currency }, (err, order) => {
      if (err) {
        reject(err);
      } else {
        resolve(order);
      }
    });
  });
};

export const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  return generated_signature === razorpay_signature;
};
