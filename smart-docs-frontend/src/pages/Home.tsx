import { Navbar } from '../components/Navbar';
import { Dashboard } from '../features/dashboard/Dashboard';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Dashboard />
    </div>
  );
}
