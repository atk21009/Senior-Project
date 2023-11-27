import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles';
import pages from './pages/index';
// import Navbar from './components/Navbar';

function renderPages() {
  return pages.map(({ route, Component }) => {
    return (
      <Route key={route} path={route} element={<Component key={route} />} />
    );
  });
}

export default function App() {
  return (
    <Router>
      <Routes>{renderPages()}</Routes>
    </Router>
  );
}
