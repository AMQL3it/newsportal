import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import Login from './pages/Login';
import Varification from './pages/Varification';
import Dashboard from './pages/Dashboard';
import Category from './components/Dashboard/Category';
import Tags from './components/Dashboard/Tag';
import Post from './components/Dashboard/Post';
import User from './components/Dashboard/User';
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
          <Route path="tags" element={<Tags />} />
          <Route path="posts" element={<Post />} />
          <Route path="users" element={<User />} />

          <Route path="*" element={<div>404</div>} />
        </Route>
          
        
      </Routes>
      
    </Router>
  );
}

export default App;
