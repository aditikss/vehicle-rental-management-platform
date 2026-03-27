import React, { useState, useEffect } from 'react';
import vehicleService from '../services/vehicleService';
import VehicleCard from '../components/VehicleCard';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getVehicles();
        setVehicles(data);
      } catch (error) {
        console.error('Failed to load vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter(v => filter === 'All' || v.type === filter);
  const categories = ['All', ...new Set(vehicles.map(v => v.type))];

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 className="animate-fade-in" style={{ fontSize: '3rem' }}>Our Fleet</h1>
        <p className="animate-fade-in" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', animationDelay: '0.1s' }}>
          Select the perfect vehicle for your next adventure.
        </p>
      </div>

      {/* Filter Options */}
      <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', animationDelay: '0.2s', flexWrap: 'wrap' }}>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setFilter(cat)}
            className={`btn ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '9999px', padding: '0.5rem 1.5rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle, index) => (
               <div key={vehicle.vehicle_id} className="animate-fade-in" style={{ animationDelay: `${0.1 * (index + 3)}s` }}>
                 <VehicleCard vehicle={vehicle} />
               </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <h3>No vehicles found for this category.</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Vehicles;
