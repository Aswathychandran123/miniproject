import React, { useState, useEffect, useContext } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ type: '', quantity: '', description: '', location: '' });
  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    try {
      const res = await api.get('/resources');
      setResources(res.data.filter(r => r.donor._id === user.id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const location = form.location
        ? { type: 'Point', coordinates: form.location.split(',').map(Number) }
        : { type: 'Point', coordinates: [0, 0] };

      await api.post('/resources', {
        type: form.type,
        quantity: Number(form.quantity),
        description: form.description,
        location,
      });
      alert('Resource added!');
      setForm({ type: '', quantity: '', description: '', location: '' });
      fetchResources();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add resource');
    }
  };

  return (
    <div>
      <h2>Add Resource</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="location" placeholder="Location (lng,lat)" value={form.location} onChange={handleChange} required />
        <button type="submit">Add Resource</button>
      </form>

      <h3>Your Resources</h3>
      <ul>
        {resources.map(r => (
          <li key={r._id}>
            {r.type} - Qty: {r.quantity} - Status: {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonorDashboard;