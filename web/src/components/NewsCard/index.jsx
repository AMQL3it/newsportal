/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FaComment, FaEye, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import commentService from "../../services/commentService";
import postService from "../../services/postService";
import WriteComment from "../Comment/WriteComment";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";

const NewsCard = () => {
  const { newsId } = useParams();
  const user = useAuthUser();

  const [news, setNews] = useState(null);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchNews();
  }, [newsId]);

  const fetchNews = async () => {
    try {
      const result = await postService.getById(newsId);
      // console.log("result", result.data);
      const newsData = {
        id: result.data.id,
        title: result.data.title,
        content: result.data.content,
        image: result.data.image,
        createdAt: result.data.createdAt,
        author: result.data.author,
        tags: result.data.tags,
        category: result.data.category.name,
      };

      setNews(newsData);
      setViews(result.data.state?.views || 0);
      setLikes(result.data.state?.likes || 0);
      setComments(result.data.comments || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleLike = async () => {
    setLikes((prev) => prev + 1);
    try {
      await commentService.addState(newsId, { likes: likes + 1 });
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  // const handleView = async () => {
  //   setViews((prev) => prev + 1);
  //   try {
  //     await commentService.addState(newsId, { views: views + 1 });
  //   } catch (err) {
  //     console.error("Failed to view:", err);
  //   }
  // };

  const handleNewComment = async ({ text }) => {
    try {
      const comment = {
        comment: text,
        post_id: newsId,
        user_id: user?.user_id,
      };
      await commentService.addComment(comment);
      // setComments((prev) => [...prev, comment]);
      fetchNews();
    } catch (err) {
      console.error("Comment failed:", err);
    }
  };

  if (!news) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="max-w-full pl-2 mx-auto bg-white shadow rounded-lg">
      <img
        src={`http://localhost:5000/${news.image}`}
        alt={news.title}
        className="w-full object-cover rounded-md cursor-pointer"
        // onClick={handleView}
      />
      <h3 className="text-2xl font-semibold mt-4">{news.title}</h3>

      {news.tags && <NewsTag tags={news.tags.map((t) => t.name)} />}

      <p className="mt-4 text-gray-700">{news.content}</p>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <Meta
          date={new Date(news.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          author={news.author}
        />

        <div className="flex gap-4 items-center">
          <span
            className="cursor-pointer flex items-center gap-1"
            // onClick={handleView}
          >
            <FaEye /> {views}
          </span>
          <span
            className="cursor-pointer flex items-center gap-1"
            onClick={handleLike}
          >
            <FaHeart /> {likes}
          </span>
          <span className="flex items-center gap-1">
            <FaComment /> {comments.length}
          </span>
        </div>
      </div>

      <WriteComment onSubmit={handleNewComment} />

      <ul className="mt-6 space-y-4">
        {comments.map((c, i) => (
          <li
            key={i}
            className="p-4 border border-gray-200 rounded-md shadow-sm bg-white"
          >
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-gray-600">{c.user?.name ?? "Unknown"}</span>
              <span className="text-gray-600">
                {new Date(c.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <p className="text-gray-800">{c.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsCard;
