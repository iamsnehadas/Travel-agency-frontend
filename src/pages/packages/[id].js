// src/pages/packages/[id].js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookingForm from '../../components/BookingForm.js'; 
import './booking.css';

export default function PackageDetail() {
  const { id } = useParams(); // Get the package id from the URL using React Router
  const [pkg, setPkg] = useState(null);
  const [travelers, setTravelers] = useState(1); // Default to 1 traveler
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch the package details from the backend
  useEffect(() => {
    if (id) {
      axios
        .get(`https://travel-agency-backend-3yhw.onrender.com/api/packages/${id}`)
        .then((response) => {
          setPkg(response.data);
          setTotalPrice(response.data.price); // Initialize total price
        })
        .catch((error) => console.error('Error fetching package:', error));
    }
  }, [id]);

  // Update total price when the number of travelers changes
  useEffect(() => {
    if (pkg) {
      setTotalPrice(pkg.price * travelers);
    }
  }, [travelers, pkg]);

  // Handle traveler input changes
  const handleTravelersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setTravelers(value > 0 ? value : 1); // Ensure at least 1 traveler
  };

  if (!pkg) return <div className="loading">Loading...</div>;

  return (
    <div className="package-detail-container">
      <div className="package-info">
        <h1>{pkg.title}</h1>
        <p>{pkg.description}</p>
        <p className="price">Price per traveler: ${pkg.price}</p>

        {/* Input for Number of Travelers */}
        <div className="travelers-input">
          <label htmlFor="travelers">Number of Travelers:</label>
          <input
            type="number"
            id="travelers"
            min="1"
            value={travelers}
            onChange={handleTravelersChange}
          />
        </div>

        {/* Display Total Price */}
        <p className="total-price">
          Total Amount: <strong>${totalPrice}</strong>
        </p>
      </div>

      {/* Use the BookingForm Component */}
      <BookingForm packageId={pkg._id} travelers={travelers} totalPrice={totalPrice} />
    </div>
  );
}
