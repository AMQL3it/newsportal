import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";
import Overlay from "../General/Overlay";
import style from "./CoverSection.module.css";

import { useEffect, useState } from "react";
import postService from "../../services/postService";

import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";

const GridNewsCards = () => {
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
      }));

      const latestPosts = formatted.slice(0, 4);
      setPosts(latestPosts);
      console.log(latestPosts);

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      setLoading(false);
    }
  };

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
    <div className={style.coverSectionRight}>
      {posts.map((item) => (
        <div
          key={item.id}
          className={style.gridCard}
          onClick={() => handleContinue(item.id, item.views)}
        >
          <img src={`http://localhost:5000/${item.image}`} alt="news" />
          <Overlay>
            {item.tags && (
              <div className="flex gap-2 mb-2 flex-wrap">
                <NewsTag tags={item.tags.map((t) => t.name)} />
              </div>
            )}
            <span>{item.title}</span>
            <Meta
              date={new Date(item.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              author={item.author}
            />
          </Overlay>
        </div>
      ))}
    </div>
  );
};

export default GridNewsCards;
