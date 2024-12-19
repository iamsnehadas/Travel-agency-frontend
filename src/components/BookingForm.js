// src/components/BookingForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookingForm({ packageId, pricePerTraveler }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequests: '',
  });

  const [totalPrice, setTotalPrice] = useState(pricePerTraveler); // Initialize total price

  // Update total price whenever the number of travelers changes
  useEffect(() => {
    setTotalPrice(formData.travelers * pricePerTraveler);
  }, [formData.travelers, pricePerTraveler]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { ...formData, packageId, totalPrice };
      await axios.post('http://localhost:5000/api/bookings', data);
      alert('Booking successful!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        travelers: 1,
        specialRequests: '',
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div className="booking-form-container">
      <h2 className="text-2xl font-semibold mb-4">Book Your Package</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Special Requests (Optional)"
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        ></textarea>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
