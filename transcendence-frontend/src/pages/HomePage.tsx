import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Transcendence</h1>
        <p className="text-xl mb-8">The Ultimate Pong Experience</p>
        
        <div className="space-x-4">
          {user ? (
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 inline-block"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 inline-block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 inline-block"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
