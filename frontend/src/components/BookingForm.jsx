import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CreditCard } from 'lucide-react';

const BookingForm = ({ vehicle, onSubmit, isSubmitting }) => {
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  // Pricing Logic (Core requirement)
  // ≤ 24 hrs → hourly pricing
  // > 24 hrs → daily pricing
  useEffect(() => {
    if (startDate && startTime && endDate && endTime) {
      const start = new Date(`${startDate}T${startTime}`);
      const end = new Date(`${endDate}T${endTime}`);
      
      const diffMs = end - start;
      const diffHrs = diffMs / (1000 * 60 * 60);

      if (diffHrs > 0) {
        if (diffHrs <= 24) {
          setTotalCost(diffHrs * vehicle.price_per_hour);
        } else {
          // Calculate complete days + remaining hours or just daily rate.
          // Using simplified daily rate based on exact 24h intervals plus partial days
          const days = Math.ceil(diffHrs / 24);
          setTotalCost(days * vehicle.price_per_day);
        }
      } else {
        setTotalCost(0);
      }
    }
  }, [startDate, startTime, endDate, endTime, vehicle]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalCost > 0) {
      onSubmit({
        vehicle_id: vehicle.vehicle_id,
        start_time: `${startDate}T${startTime}`,
        end_time: `${endDate}T${endTime}`,
        total_cost: totalCost
      });
    } else {
      alert("Please select valid times. End time must be after start time.");
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem', flex: '1 1 400px' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        Booking Details
      </h3>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Pickup Details */}
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
              <Calendar size={18} /> Pickup
            </h4>
            <div className="input-group">
              <label>Date</label>
              <input type="date" className="input-field" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Time</label>
              <input type="time" className="input-field" required value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
          </div>

          {/* Return Details */}
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent)' }}>
              <Clock size={18} /> Return
            </h4>
            <div className="input-group">
              <label>Date</label>
              <input type="date" className="input-field" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Time</label>
              <input type="time" className="input-field" required value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Pricing Calculation Summary */}
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h4 style={{ marginBottom: '1rem' }}>Cost Estimate</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            <span>Hourly Rate</span>
            <span>${vehicle.price_per_hour}/hr</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
            <span>Daily Rate</span>
            <span>${vehicle.price_per_day}/day</span>
          </div>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--primary-color)' }}>${totalCost > 0 ? totalCost.toFixed(2) : '0.00'}</span>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem', fontSize: '1.125rem' }} disabled={isSubmitting || totalCost <= 0}>
          {isSubmitting ? <span className="spinner" style={{ width: '24px', height: '24px', borderWidth: '2px' }}></span> : <><CreditCard size={20} /> Proceed to Booking</>}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
