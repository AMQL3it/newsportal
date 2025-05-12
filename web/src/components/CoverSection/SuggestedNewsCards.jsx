import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import commentService from "../../services/commentService";
import postService from "../../services/postService";
import Meta from "../General/Meta";

const SuggestedNewsCards = ({ styleStatus = "row" }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const result = await postService.getAll();
      const formatted = result.data.map((p) => ({
        id: p.id,
        title: p.title,
        content: p.content,
        image: p.image,
        createdAt: p.createdAt,
        author: p.author,
        tags: p.tags || [],
        category: p.category?.name || "Uncategorized",
        views: p.views || 0,
      }));

      const latestPosts = formatted.slice(0, 4);
      setPosts(latestPosts);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = useCallback(
    async (id, views) => {
      await commentService.addState(id, { views: views + 1 });
      navigate(`newsfeed/news/${id}`);
    },
    [navigate]
  );

  if (loading) {
    return (
      <div className="w-full h-[200px] flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full text-center text-gray-600 py-10">
        No suggested news available.
      </div>
    );
  }

  return (
    <div
      className={`w-full flex gap-4 bg-gray-200 p-4 rounded-md overflow-x-auto ${
        styleStatus === "column" ? "flex-col" : "flex-row"
      }`}
    >
      {posts.map((item) => (
        <div
          key={item.id}
          className="flex bg-white rounded-md shadow-md overflow-hidden max-h-40 w-[350px] min-w-[300px]"
        >
          <img
            src={`http://localhost:5000/${item.image}`}
            alt={item.title}
            onError={(e) => (e.target.src = "/fallback.jpg")}
            className="w-1/2 object-cover rounded-l-md"
          />
          <div className="flex flex-col justify-between p-3 w-1/2">
            <p
              className="text-sm font-semibold cursor-pointer hover:text-blue-600 transition"
              onClick={() => handleContinue(item.id, item.views)}
            >
              {item.title}
            </p>
            <Meta
              date={new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              author={item.author}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedNewsCards;
