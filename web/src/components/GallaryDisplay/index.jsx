import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import postService from "../../services/postService";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";
import Overlay from "../General/Overlay";
import TitleLine from "../General/TitleLine";

const GallaryDisplay = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const result = await postService.getAll();
        setPosts(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load gallary posts:", error);
      }
    };

    loadPosts();
  }, []);

  const handleContinue = async (id, views) => {
    await commentService.addState(id, { views: views + 1 });
    navigate(`newsfeed/news/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-2">
      <TitleLine title="Gallary" />
      {posts.length === 0 ? (
        <div className="text-center p-6">No posts found</div>
      ) : (
        <div className="grid grid-cols-3 gap-2 md:grid-cols-3 sm:grid-cols-2">
          {posts.map((item) => (
            <div
              key={item.id}
              className="relative rounded overflow-hidden shadow hover:shadow-md transition-all cursor-pointer"
              onClick={() => handleContinue(item.id, item.state?.views || 0)}
            >
              <img
                src={`http://localhost:5000/${item.image}`}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <Overlay>
                <div className="bg-white-500 p-2">
                  <NewsTag tags={item.tags.map((t) => t.name)} />
                  <span className="text-white font-semibold text-sm">
                    {item.title}
                  </span>
                  <Meta
                    date={new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    author={item.author || "Unknown"}
                  />
                </div>
              </Overlay>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GallaryDisplay;
