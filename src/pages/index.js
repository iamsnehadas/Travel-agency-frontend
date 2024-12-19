import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './index.css';

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages from the backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/packages')
      .then((response) => {
        console.log('API Response:', response.data);
        setPackages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching packages:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <header className="hero-section">
        <h1>Explore Our Exclusive Tour Packages</h1>
        <p>Discover unforgettable adventures tailored for you.</p>
      </header>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading packages...</p>
        </div>
      ) : packages.length > 0 ? (
        <div className="package-grid">
          {packages.map((pkg) => (
            <div key={pkg._id} className="package-card">
              <img
                src={pkg.image || 'https://via.placeholder.com/300x200'}
                alt={pkg.title}
                className="package-image"
              />
              <div className="package-content">
                <h2>{pkg.title}</h2>
                <p className="description">{pkg.description}</p>
                <p className="package-price">From ${pkg.price}</p>
                <Link to={`/packages/${pkg._id}`}>
                  <button className="details-btn">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-packages">No packages available.</p>
      )}
    </div>
  );
}
