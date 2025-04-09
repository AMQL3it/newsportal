import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import CategoryPage from './pages/CategoryPage';
// import NewsDetails from './pages/NewsDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/news/:id" element={<NewsDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
