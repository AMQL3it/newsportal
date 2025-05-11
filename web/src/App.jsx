import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Category from "./components/Dashboard/Category";
import PostManagement from "./components/Dashboard/PostManagement";
import Tags from "./components/Dashboard/Tag";
import User from "./components/Dashboard/User";
import NewsCard from "./components/NewsCard";
import NewsFeed from "./components/NewsFeed";
import Dashboard from "./pages/Dashboard";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Varification from "./pages/Varification";
// import CategoryPage from './pages/CategoryPage';
// import NewsDetails from './pages/NewsDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exect path="" element={<HomePage />} />
          <Route path="newsfeed" element={<ExplorePage />}>
            <Route index element={<NewsFeed />} />
            <Route path="news/:newsId" element={<NewsCard />} />
          </Route>

          {/* <Route exect path="news/:newsId" element={<NewsCard />} /> */}
          <Route path="*" element={<div>404</div>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/varification" element={<Varification />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="categories" element={<Category />} />
          <Route path="tags" element={<Tags />} />
          <Route path="posts" element={<PostManagement />} />
          <Route path="users" element={<User />} />

          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
