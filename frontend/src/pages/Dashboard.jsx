import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import bookingService from '../services/bookingService';
import { Calendar, CheckCircle, RotateCcw, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let data;
        if (user?.role === 'Admin' || user?.role === 'Fleet Manager') {
          // Managers see all
          data = await bookingService.getAllBookings();
        } else {
          // Customers see theirs
          data = await bookingService.getUserBookings();
        }
        setBookings(data);
      } catch (error) {
        console.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);

  const handleReturn = async (bookingId) => {
    setProcessingId(bookingId);
    try {
      await bookingService.returnVehicle(bookingId);
      // Update local state to reflect change
      setBookings(prev => 
        prev.map(b => b.booking_id === bookingId ? { ...b, status: 'Completed' } : b)
      );
    } catch (error) {
      alert("Failed to return vehicle");
    } finally {
       setProcessingId(null);
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'Active');
  const pastBookings = bookings.filter(b => b.status === 'Completed');

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
        <h1 className="animate-fade-in" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Dashboard</h1>
        <p className="animate-fade-in" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', animationDelay: '0.1s' }}>
          Welcome back, <span style={{ color: 'white' }}>{user?.name || 'User'}</span>
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '3rem' }}>
          {/* Active Bookings Section */}
          <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RotateCcw size={24} color="var(--primary-color)" /> Active Rentals
            </h3>
            
            {activeBookings.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {activeBookings.map(booking => (
                  <div key={booking.booking_id} className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                       <h4 style={{ fontSize: '1.25rem' }}>{booking.brand} {booking.model}</h4>
                       <span className="badge badge-warning">Active</span>
                    </div>

                    {user?.role !== 'Customer' && booking.email && (
                      <div style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Customer: {booking.email}
                      </div>
                    )}
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Pickup</div>
                        <div style={{ fontWeight: 500 }}>{new Date(booking.start_time).toLocaleDateString()}</div>
                        <div style={{ color: 'var(--primary-color)' }}>{new Date(booking.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </div>
                      <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '8px' }}>
                        <div style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Return By</div>
                        <div style={{ fontWeight: 500 }}>{new Date(booking.end_time).toLocaleDateString()}</div>
                        <div style={{ color: 'var(--accent)' }}>{new Date(booking.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                       <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>${booking.total_cost.toFixed(2)}</div>
                       <button 
                         className="btn btn-primary" 
                         style={{ padding: '0.5rem 1rem' }} 
                         onClick={() => handleReturn(booking.booking_id)}
                         disabled={processingId === booking.booking_id}
                       >
                         {processingId === booking.booking_id ? 'Wait...' : 'Return Vehicle'}
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                You have no active rentals. <a href="/vehicles" style={{ color: 'var(--primary-color)' }}>Book a vehicle today.</a>
              </div>
            )}
          </section>

          {/* Past Bookings Section */}
          <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <CheckCircle size={24} color="var(--accent)" /> Rental History
            </h3>

            {pastBookings.length > 0 ? (
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                 {pastBookings.map(booking => (
                    <div key={booking.booking_id} className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--text-muted)', opacity: 0.8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                         <h4 style={{ fontSize: '1.125rem' }}>{booking.brand} {booking.model}</h4>
                         <span className="badge badge-success" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>Completed</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        <span><Calendar size={14} style={{ display: 'inline', marginRight: '4px', position: 'relative', top: '2px' }}/> {new Date(booking.start_time).toLocaleDateString()}</span>
                        <span style={{ fontWeight: 600 }}>${booking.total_cost.toFixed(2)}</span>
                      </div>
                    </div>
                 ))}
               </div>
            ) : (
              <div style={{ padding: '1rem', color: 'var(--text-muted)' }}>No completed rentals found.</div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
