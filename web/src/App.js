import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
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

        {/* <Route path="/category/:name" element={<CategoryPage />} /> */}
        {/* <Route path="/news/:id" element={<NewsDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
