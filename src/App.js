import React, { useContext, useState } from 'react';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Header from './components/Header';
import DonorDashboard from './components/Dashboard/DonorDashboard';
import RequesterDashboard from './components/Dashboard/RequesterDashboard';
import VolunteerDashboard from './components/Dashboard/VolunteerDashboard';
import MapView from './components/MapView';

const AppContent = () => {
  const { user } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister ? (
      <RegisterForm switchToLogin={() => setShowRegister(false)} />
    ) : (
      <LoginForm switchToRegister={() => setShowRegister(true)} />
    );
  }

  let dashboard;
  if (user.role === 'donor') dashboard = <DonorDashboard />;
  else if (user.role === 'requester') dashboard = <RequesterDashboard />;
  else if (user.role === 'volunteer') dashboard = <VolunteerDashboard />;
  else dashboard = <p>Unknown role</p>;

  return (
    <div className="app-container">
      <Header />
      <div className="dashboard-map">
        <section className="dashboard">{dashboard}</section>
        <section className="map">
          <MapView />
        </section>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;