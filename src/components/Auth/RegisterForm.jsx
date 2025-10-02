import React, { useState } from 'react';
import api from '../../api/api';

const RegisterForm = ({ switchToLogin }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const location = form.location
        ? { type: 'Point', coordinates: form.location.split(',').map(Number) }
        : { type: 'Point', coordinates: [0, 0] };

      await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        location,
      });
      alert('Registration successful! Please login.');
      switchToLogin();
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Register</h2>
      <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <select name="role" value={form.role} onChange={handleChange} required>
        <option value="">Select Role</option>
        <option value="donor">Donor</option>
        <option value="requester">Requester</option>
        <option value="volunteer">Volunteer</option>
      </select>
      <input name="location" placeholder="Location (lng,lat)" value={form.location} onChange={handleChange} />
      <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      <p>
        Already have an account?{' '}
        <button type="button" onClick={switchToLogin}>Login</button>
      </p>
    </form>
  );
};

export default RegisterForm;