import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Clock, ShieldCheck, CreditCard } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
        <h1 className="animate-fade-in" style={{ fontSize: '4rem', marginBottom: '1rem', background: 'linear-gradient(to right, #4f46e5, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Premium Vehicle Rental Experience
        </h1>
        <p className="animate-fade-in" style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '2rem', animationDelay: '0.2s', animationFillMode: 'both' }}>
          Drive your dreams today. Hourly or daily, we offer the most seamless and modern car rental management for all your needs.
        </p>
        <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', animationDelay: '0.4s', animationFillMode: 'both' }}>
          <Link to="/vehicles" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            Browse Vehicles
          </Link>
          <Link to="/signup" className="btn btn-secondary" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}>
            Join Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container" style={{ padding: '4rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
        {[
          { icon: <Car size={32} color="var(--primary-color)" />, title: 'Wide Selection', desc: 'From budget to luxury, choose a vehicle that fits your journey perfectly.' },
          { icon: <Clock size={32} color="var(--accent)" />, title: 'Dynamic Pricing', desc: 'Rent per hour or per day. Our pricing system auto-calculates the best rate.' },
          { icon: <ShieldCheck size={32} color="var(--warning)" />, title: 'Secure Booking', desc: 'Your bookings are securely managed and transparently tracked.' },
          { icon: <CreditCard size={32} color="var(--danger)" />, title: 'Instant Payments', desc: 'Hassle-free, secure online payment integration for quick checkouts.' }
        ].map((feature, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem', display: 'inline-block', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
