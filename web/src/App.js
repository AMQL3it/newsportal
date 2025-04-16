import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import Login from './pages/Login';
import Varification from './pages/Varification';
import Dashboard from './pages/Dashboard';
import Category from './components/Dashboard/Category';
// import CategoryPage from './pages/CategoryPage';
// import NewsDetails from './pages/NewsDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="" element={<HomePage />} />  */}
          <Route exect path="" element={<HomePage />}/>
          <Route exect path="newsfeed" element={<ExplorePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/varification" element={<Varification />} />
        <Route path="/dashboard" element={<Dashboard />} > 
          <Route path="categories" element={<Category />} />
        </Route>
          
        
      </Routes>
      
    </Router>
  );
}

export default App;
