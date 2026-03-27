import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Try to get amount from state if routed from Booking, else fallback
  const bookingAmount = location.state?.amount || 0;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Redirect to dashboard after showing success message
      setTimeout(() => {
        navigate('/dashboard', { state: { message: 'Payment Successful!' } });
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <CheckCircle size={80} color="var(--accent)" style={{ marginBottom: '1rem', display: 'inline-block' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Payment Successful!</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Your booking #{bookingId} is confirmed.</p>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem', display: 'flex', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in" style={{ padding: '3rem', width: '100%', maxWidth: '600px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <ShieldCheck color="var(--primary-color)" /> Secure Checkout
        </h2>
        
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Total Amount Due</p>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent)' }}>
            ${bookingAmount > 0 ? bookingAmount.toFixed(2) : '0.00'}
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '0.875rem' }}>Booking Ref: #{bookingId}</p>
        </div>

        <form onSubmit={handlePaymentSubmit}>
          <div className="input-group">
            <label>Name on Card</label>
            <input type="text" className="input-field" placeholder="John Doe" required />
          </div>

          <div className="input-group">
            <label>Card Number</label>
            <div style={{ position: 'relative' }}>
              <CreditCard size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                className="input-field" 
                style={{ paddingLeft: '2.5rem', fontFamily: 'monospace', letterSpacing: '2px' }} 
                placeholder="0000 0000 0000 0000" 
                maxLength="19"
                required 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group">
              <label>Expiry Date</label>
              <input type="text" className="input-field" placeholder="MM/YY" maxLength="5" required />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input type="password" className="input-field" placeholder="123" maxLength="4" required />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '2rem', fontSize: '1.25rem', padding: '1rem' }} 
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="spinner" style={{ width: '24px', height: '24px', borderWidth: '2px' }}></span>
            ) : (
              `Pay $${bookingAmount > 0 ? bookingAmount.toFixed(2) : '0.00'}`
            )}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
           <ShieldCheck size={14} /> Payments are 100% secure and encrypted.
        </p>
      </div>
    </div>
  );
};

export default Payment;
