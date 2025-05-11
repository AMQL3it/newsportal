import { useEffect, useState } from "react";
import postService from "../../services/postService";
import Divider from "../General/Divider";
import NewsItem from "../NewsItem";

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const result = await postService.getAll();

      const formatted = result.data.map((p) => ({
        ...p,
        tag_ids: p.tags.map((t) => t.id) || [],
      }));

      setPosts(formatted);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 pl-2">
      {" "}
      {/* gap-2.5 = 10px */}
      {posts.map((news) => (
        <NewsItem key={news.id} news={news} />
      ))}
      <Divider />
    </div>
  );
};

export default NewsFeed;
