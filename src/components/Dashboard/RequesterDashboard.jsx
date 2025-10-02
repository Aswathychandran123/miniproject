import React, { useState, useEffect, useContext } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';

const RequesterDashboard = () => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ resourceType: '', quantity: '', urgency: 'medium', location: '' });
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests');
      setRequests(res.data.filter(r => r.requester._id === user.id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const location = form.location
        ? { type: 'Point', coordinates: form.location.split(',').map(Number) }
        : { type: 'Point', coordinates: [0, 0] };

      await api.post('/requests', {
        resourceType: form.resourceType,
        quantity: Number(form.quantity),
        urgency: form.urgency,
        location,
      });
      alert('Request submitted!');
      setForm({ resourceType: '', quantity: '', urgency: 'medium', location: '' });
      fetchRequests();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit request');
    }
  };

  return (
    <div>
      <h2>Submit Request</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="resourceType" placeholder="Resource Type" value={form.resourceType} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <select name="urgency" value={form.urgency} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input name="location" placeholder="Location (lng,lat)" value={form.location} onChange={handleChange} required />
        <button type="submit">Submit Request</button>
      </form>

      <h3>Your Requests</h3>
      <ul>
        {requests.map(r => (
          <li key={r._id}>
            {r.resourceType} - Qty: {r.quantity} - Status: {r.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequesterDashboard;