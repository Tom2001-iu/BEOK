import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const AccountPage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return null; // This is handled by ProtectedRoute, but good practice
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif">My Account</h1>
          <p className="text-lg text-brand-gray mt-4">Welcome back, {currentUser.name}.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <aside>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="font-semibold border-l-2 border-brand-dark px-4 py-2">Profile Details</a>
              <a href="#" className="text-brand-gray hover:text-brand-dark border-l-2 border-transparent hover:border-brand-gray px-4 py-2">Order History</a>
              <a href="#" className="text-brand-gray hover:text-brand-dark border-l-2 border-transparent hover:border-brand-gray px-4 py-2">Saved Addresses</a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-2">
            <div className="bg-brand-light p-8 border">
              <h2 className="text-2xl font-serif mb-6">Profile Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-brand-gray">Full Name</label>
                  <p className="font-semibold">{currentUser.name}</p>
                </div>
                <div>
                  <label className="text-sm text-brand-gray">Email Address</label>
                  <p className="font-semibold">{currentUser.email}</p>
                </div>
                <div className="pt-4">
                    <Button onClick={handleLogout} variant="outline">
                        Logout
                    </Button>
                </div>
              </div>
            </div>
            
             <div className="bg-brand-light p-8 border mt-8">
                <h2 className="text-2xl font-serif mb-6">Order History</h2>
                <div className="text-center text-brand-gray py-8">
                    <p>You have no previous orders.</p>
                </div>
             </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
