import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import vehicleService from '../services/vehicleService';
import bookingService from '../services/bookingService';
import BookingForm from '../components/BookingForm';
import { Car, ChevronLeft } from 'lucide-react';

const Booking = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const data = await vehicleService.getVehicleById(vehicleId);
        setVehicle(data);
      } catch (error) {
        console.error('Failed to load vehicle');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleDetails();
  }, [vehicleId]);

  const handleBookingSubmit = async (bookingData) => {
    setIsSubmitting(true);
    try {
      const result = await bookingService.createBooking(bookingData);
      if (result.success) {
        navigate(`/payment/${result.booking_id || Math.floor(Math.random() * 10000)}`, { state: { amount: bookingData.total_cost } });
      }
    } catch (error) {
       console.error('Booking failed', error);
       alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!vehicle) {
     return (
       <div className="container" style={{ marginTop: '5rem', textAlign: 'center' }}>
         <h2>Vehicle not found</h2>
         <button className="btn btn-secondary" onClick={() => navigate('/vehicles')} style={{ marginTop: '1rem' }}>Back to Vehicles</button>
       </div>
     );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <button 
        className="btn btn-secondary animate-fade-in" 
        style={{ marginBottom: '2rem', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }} 
        onClick={() => navigate('/vehicles')}
      >
        <ChevronLeft size={18} /> Back
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Vehicle Summary Side */}
        <div className="glass-card animate-fade-in" style={{ padding: '2rem', flex: '1 1 300px', animationDelay: '0.1s' }}>
          <div style={{ height: '150px', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <Car size={64} color="var(--primary-color)" />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{vehicle.brand} {vehicle.model}</h2>
          <span className="badge badge-success" style={{ marginBottom: '1.5rem' }}>{vehicle.type}</span>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1rem' }}>
            <h4 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Pricing Information</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
               <span>Rate per Hour</span>
               <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${vehicle.price_per_hour}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span>Rate per Day</span>
               <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${vehicle.price_per_day}</span>
            </div>
          </div>
        </div>

        {/* Booking Form Side */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s', flex: '2 1 500px' }}>
           <BookingForm vehicle={vehicle} onSubmit={handleBookingSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
