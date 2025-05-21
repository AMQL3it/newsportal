import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MetaCol from "../General/MetaCol";

import commentService from "../../services/commentService";
import postService from "../../services/postService";

const SuggestedNewsCards = ({ suggestedNews }) => {
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
    <div className="w-full bg-gray-200 p-4 rounded-md">
      <div className="flex gap-4 min-w-[600px] flex-row sm:min-w-0">
        {suggestedNews.map((item) => (
          <div
            key={item.id}
            className="flex bg-white rounded-md shadow-md overflow-hidden h-[150px] min-w-[280px] sm:min-w-0 sm:w-full sm:h-auto"
          >
            <img
              src={`http://localhost:5000/${item.image}`}
              alt={item.title}
              onError={(e) => (e.target.src = "/fallback.jpg")}
              className="w-1/2 h-full object-cover sm:w-1/3 sm:h-[100px]"
            />
            <div className="flex flex-col justify-between p-3 w-1/2 sm:w-2/3">
              <p
                className="text-sm font-semibold cursor-pointer hover:text-blue-600 transition line-clamp-3"
                onClick={() => handleContinue(item.id, item.views)}
              >
                {item.title}
              </p>
              <MetaCol
                date={new Date(item.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
                author={item.author}
              />
              {/* <div className="flex flex-wrap justify-between items-center text-sm text-gray-600">
                <span className="flex algems-center gap-2">
                  <FaCalendarCheck />
                  {new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex algems-center gap-2">
                  <FaUserTie />
                  {item.author}
                </span>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedNewsCards;
