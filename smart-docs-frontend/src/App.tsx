import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './features/dashboard/Dashboard';
import { Home } from './pages/Home';
import { About } from './pages/About';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
