// src/pages/admin.js
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Admin() {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    title: '',
    description: '',
    price: 0,
    availableDates: '',
    image: '',
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = () => {
    axios.get('https://travel-agency-backend-3yhw.onrender.com/api/packages')
      .then((response) => setPackages(response.data))
      .catch((error) => console.error('Error fetching packages:', error));
  };

  const addPackage = () => {
    axios.post('https://travel-agency-backend-3yhw.onrender.com/api/packages', newPackage)
      .then(() => {
        fetchPackages();
        setNewPackage({ title: '', description: '', price: 0, availableDates: '', image: '' });
      })
      .catch((error) => console.error('Error adding package:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Add Package</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPackage.title}
          onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={newPackage.description}
          onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        ></textarea>
        <input
          type="number"
          placeholder="Price"
          value={newPackage.price}
          onChange={(e) => setNewPackage({ ...newPackage, price: parseFloat(e.target.value) })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Available Dates (comma-separated)"
          value={newPackage.availableDates}
          onChange={(e) => setNewPackage({ ...newPackage, availableDates: e.target.value })}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button onClick={addPackage} className="px-4 py-2 bg-green-500 text-white rounded">
          Add Package
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Manage Packages</h2>
        {packages.map((pkg) => (
          <div key={pkg._id} className="border p-4 mt-4 rounded shadow">
            <h3 className="text-lg font-semibold">{pkg.title}</h3>
            <button
              onClick={() => axios.delete(`https://travel-agency-backend-3yhw.onrender.com/api/packages/${pkg._id}`).then(fetchPackages)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
