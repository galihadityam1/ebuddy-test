"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Project</h1>
        <p className="text-lg text-gray-600 mb-6">Click the button below to log in.</p>
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
