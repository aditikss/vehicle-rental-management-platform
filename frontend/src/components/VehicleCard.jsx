import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Fuel, Settings2, Users, DollarSign } from 'lucide-react';

const VehicleCard = ({ vehicle }) => {
  const isAvailable = vehicle.availability;

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', position: 'relative' }}>
      {/* Availability Badge */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
        <span className={`badge ${isAvailable ? 'badge-success' : 'badge-danger'}`} style={{ backgroundColor: isAvailable ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none' }}>
          {isAvailable ? 'Available' : 'Booked'}
        </span>
      </div>

      {/* Image Placeholder */}
      <div style={{ height: '200px', backgroundColor: 'rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Car size={64} color="rgba(255,255,255,0.1)" />
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{vehicle.brand} {vehicle.model}</h3>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{vehicle.type}</span>
          </div>
        </div>

        {/* Pricing */}
        <div style={{ margin: '1rem 0', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary-color)' }}>
            <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>${vehicle.price_per_hour}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>/hr</span>
          </div>
          <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent)' }}>
            <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>${vehicle.price_per_day}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>/day</span>
          </div>
        </div>

        {/* Specifications */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <Users size={16} /> 4 Seats
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <Settings2 size={16} /> Auto
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <Fuel size={16} /> Gas
          </div>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: 'auto' }}>
          <Link 
            to={isAvailable ? `/booking/${vehicle.vehicle_id}` : '#'} 
            className={`btn ${isAvailable ? 'btn-primary' : 'btn-secondary'}`} 
            style={{ width: '100%', opacity: isAvailable ? 1 : 0.5, cursor: isAvailable ? 'pointer' : 'not-allowed' }}
            onClick={(e) => !isAvailable && e.preventDefault()}
          >
            {isAvailable ? 'Book Now' : 'Unavailable'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
