import React from 'react';
import { Link } from 'react-router-dom'; 

export default function PackageList({ packages }) {
  if (!packages || packages.length === 0) {
    return <div>No packages available at the moment.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {packages.map((pkg) => (
        <div key={pkg._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{pkg.title}</h2>
          <p className="mt-2">{pkg.description}</p>
          <p className="mt-2 font-bold">Price: ${pkg.price}</p>
          <Link to={`/packages/${pkg._id}`}>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}
