import { useEffect, useState } from "react";
import postService from "../../services/postService";
import getPreviewText from "../../utils/getPreviewText";
import ContinueButton from "../General/ContinueButton";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";
import Overlay from "../General/Overlay";
import TitleLine from "../General/TitleLine";

const FoodDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const result = await postService.getAll();
      const latestPosts = result.data.slice(0, 6);
      setPosts(latestPosts);
      setActivePost(latestPosts[0]);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <TitleLine title="Food" />

      {posts.length === 0 ? (
        <div className="text-center p-6">No posts found</div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Main Featured Post */}
          {activePost && (
            <div className="relative rounded overflow-hidden shadow hover:shadow-md transition-all">
              <img
                src={`http://localhost:5000/${activePost.image}`}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
              <Overlay>
                <div className="bg-white-500 p-2">
                  <NewsTag tags={activePost.tags.map((t) => t.name)} />
                  <span className="text-white font-semibold text-sm">
                    {activePost.title}
                  </span>
                  <Meta
                    date={new Date(activePost.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                    author={activePost.author || "Unknown"}
                  />
                  <p className="text-sm text-white-500 leading-relaxed">
                    {getPreviewText(activePost.content, 30)}
                  </p>
                  {activePost.content?.split(" ").length > 30 && (
                    <div className="mt-2">
                      <ContinueButton
                        onClick={() =>
                          (window.location.href = `/news/${activePost.id}`)
                        }
                      />
                    </div>
                  )}
                </div>
              </Overlay>
            </div>
          )}

          {/* Suggested Posts */}
          <div className="flex flex-col sm:flex-row gap-4">
            {posts
              .filter((post) => post.id !== activePost?.id)
              .slice(0, 4)
              .map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setActivePost(post);
                  }}
                  className="flex flex-col cursor-pointer bg-white rounded shadow overflow-hidden hover:shadow-md transition w-full sm:w-1/3"
                >
                  <img
                    src={`http://localhost:5000/${post.image}`}
                    alt={post.title}
                    className="h-36 w-full object-cover"
                  />
                  <div className="p-2">
                    <h4 className="text-sm font-medium line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-white-500 leading-relaxed">
                      {getPreviewText(post.content, 15)}
                    </p>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                      <Meta
                        date={new Date(post.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                        author={post.author}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
