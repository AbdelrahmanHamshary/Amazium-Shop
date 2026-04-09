import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Lock, Check, ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import {
  formatCardNumber,
  formatExpiry,
  isValidCardNumber,
  isValidCvv,
  isValidExpiry,
  isValidPhone,
  sanitizeAddress,
  sanitizeCvv,
  sanitizeName,
  sanitizePhone
} from '../utils/validation';

export default function CheckoutPage() {
  const { cart, getCartTotal, placeOrder, user } = useStore();
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl mb-4">🔐</p>
        <h2 className="text-2xl font-bold mb-2">Sign in required</h2>
        <p className="text-gray-500 mb-6">You must sign in before placing any order.</p>
        <Link to="/auth" className="btn-amazon text-base px-8 py-3 inline-block">Go to Sign In</Link>
      </div>
    );
  }

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(user?.address || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');
  const total = getCartTotal();

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-7xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold mb-2">No items to checkout</h2>
        <Link to="/" className="btn-amazon text-base px-8 py-3 inline-block mt-4">Go Shopping</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in-up">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-green-700">Order Placed Successfully! 🎉</h2>
        <p className="text-gray-600 mb-6">Thank you for shopping with Amazium</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link to="/orders" className="btn-amazon px-8 py-3">View Orders</Link>
          <Link to="/" className="btn-orange px-8 py-3">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const validateShipping = () => {
    if (sanitizeName(cardName).length < 3) return 'Please enter your full name.';
    if (!isValidPhone(phone)) return 'Please enter a valid phone number.';
    if (sanitizeAddress(address).length < 10) return 'Please enter a full shipping address.';
    return '';
  };

  const validatePayment = () => {
    if (!isValidCardNumber(cardNumber)) return 'Card number must be 16 digits.';
    if (!isValidExpiry(expiry)) return 'Expiry must be a valid future month.';
    if (!isValidCvv(cvv)) return 'CVV must be 3 or 4 digits.';
    return '';
  };

  const handlePlaceOrder = async () => {
    if (!user) return;
    const shippingErr = validateShipping();
    const paymentErr = validatePayment();
    if (shippingErr || paymentErr) {
      setError(shippingErr || paymentErr);
      return;
    }
    setError('');
    setProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));
      await placeOrder(address, { phone });
      setOrderPlaced(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Order failed. Check API and try again.');
    } finally {
      setProcessing(false);
    }
  };

  const steps = [
    { num: 1, label: 'Shipping' },
    { num: 2, label: 'Payment' },
    { num: 3, label: 'Review' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Checkout</h1>

      {/* Steps */}
      <div className="flex items-center justify-center mb-8 gap-2">
        {steps.map(({ num, label }, i) => (
          <div key={num} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= num ? 'bg-amazon-orange text-amazon' : 'bg-gray-200 text-gray-500'}`}>
              {step > num ? <Check size={16} /> : num}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${step >= num ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
            {i < steps.length - 1 && <ChevronRight size={16} className="text-gray-300 mx-1 sm:mx-3" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Step 1 - Shipping */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Full Name</label>
                    <input type="text" value={cardName} onChange={(e) => setCardName(sanitizeName(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2.5" placeholder="John Doe" autoComplete="name" maxLength={80} />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Phone</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(sanitizePhone(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2.5" placeholder="+1 555 000 0000" autoComplete="tel" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1">Address</label>
                  <textarea value={address} onChange={(e) => setAddress(sanitizeAddress(e.target.value))} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2.5" placeholder="123 Main St, City, State, ZIP" autoComplete="street-address" maxLength={300} />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button onClick={() => {
                  const shippingErr = validateShipping();
                  if (shippingErr) {
                    setError(shippingErr);
                    return;
                  }
                  setError('');
                  setStep(2);
                }} className="btn-amazon w-full py-3 text-base font-semibold">
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Payment */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard size={22} /> Payment Method
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Card Number</label>
                  <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 font-mono" placeholder="4242 4242 4242 4242" inputMode="numeric" autoComplete="cc-number" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Expiry</label>
                    <input type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2.5" placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">CVV</label>
                    <input type="password" value={cvv} onChange={(e) => setCvv(sanitizeCvv(e.target.value))} className="w-full border border-gray-300 rounded-lg px-3 py-2.5" placeholder="•••" inputMode="numeric" autoComplete="cc-csc" />
                  </div>
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Lock size={14} /> Your payment info is encrypted and secure
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-3 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Back</button>
                  <button onClick={() => {
                    const paymentErr = validatePayment();
                    if (paymentErr) {
                      setError(paymentErr);
                      return;
                    }
                    setError('');
                    setStep(3);
                  }} className="btn-amazon flex-1 py-3 text-base font-semibold">Review Order</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Review */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 animate-fade-in-up">
              <h2 className="text-xl font-bold mb-4">Review Your Order</h2>
              <div className="space-y-3 mb-6">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                    <img src={product.image} alt="" className="w-12 h-12 object-contain" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.title}</p>
                      <p className="text-xs text-gray-500">Qty: {quantity}</p>
                    </div>
                    <p className="font-bold text-sm">${(product.price * quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm"><span className="font-medium">Ship to:</span> {address}</p>
                <p className="text-sm mt-1"><span className="font-medium">Phone:</span> {phone}</p>
                <p className="text-sm mt-1"><span className="font-medium">Payment:</span> •••• {cardNumber.replace(/\D/g, '').slice(-4) || '4242'}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-3 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Back</button>
                <button onClick={handlePlaceOrder} disabled={processing} className="btn-orange flex-1 py-3 text-base disabled:opacity-50">
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Place Order — $${(total * 1.08).toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Summary */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 h-fit sticky top-32">
          <h3 className="font-bold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Items:</span><span>${total.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Shipping:</span><span className="text-amazon-green">FREE</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Tax:</span><span>${(total * 0.08).toFixed(2)}</span></div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span><span className="text-red-700">${(total * 1.08).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
