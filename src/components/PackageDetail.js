import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function PackageDetail() {
  const { id } = useParams();  // Get the package id from the URL using React Router

  const [pkg, setPkg] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: 1,
    specialRequests: '',
  });

  useEffect(() => {
    if (id) {
      // Corrected API URL (template literals)
      axios.get(`https://travel-agency-backend-3yhw.onrender.com/api/packages/${id}`)
        .then(response => setPkg(response.data))
        .catch(error => console.error('Error fetching package:', error));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { ...formData, packageId: id };
      await axios.post('https://travel-agency-backend-3yhw.onrender.com/api/bookings', data);
      alert('Booking successful!');
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  if (!pkg) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{pkg.title}</h1>
      <p className="mt-4">{pkg.description}</p>
      <p className="mt-4 font-bold">Price per traveler: ${pkg.price}</p>
      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Number of Travelers"
          required
          value={formData.travelers}
          onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Special Requests"
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        ></textarea>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Book Now
        </button>
      </form>
    </div>
  );
}
