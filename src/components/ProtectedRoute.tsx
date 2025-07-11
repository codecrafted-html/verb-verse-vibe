
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 mb-4">IrregularVerbs</div>
          <div className="text-gray-600">Laden...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
