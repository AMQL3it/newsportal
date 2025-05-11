import { FaComment, FaEye, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import commentService from "../../services/commentService";
import getPreviewText from "../../utils/getPreviewText";
import ContinueButton from "../General/ContinueButton";
import Meta from "../General/Meta";
import NewsTag from "../General/NewsTag";

const NewsItem = ({ news }) => {
  const navigate = useNavigate();

  const handleContinue = async (views) => {
    await commentService.addState(news.id, { views: views + 1 });
    navigate("news/" + news.id);
  };

  return (
    <div className="flex flex-col gap-2 mb-2.5">
      <img
        src={`http://localhost:5000/${news.image}`}
        alt={news.title}
        onClick={() => handleContinue(news.state?.views || 0)}
        className="w-full h-[12.5rem] md:h-[15rem] object-cover rounded-md cursor-pointer"
      />

      <h3 className="text-xl font-semibold my-2 text-gray-900">{news.title}</h3>

      <NewsTag tags={news.tags.map((t) => t.name)} />

      <div className="flex justify-between items-center mt-4 text-sm text-gray-600 flex-wrap">
        <Meta
          date={new Date(news.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          author={news.author}
        />

        <div className="flex gap-4 items-center mr-2.5 mt-2 md:mt-0">
          <span className="flex items-center gap-1 font-medium cursor-pointer">
            <FaEye className="text-gray-500 text-base" />{" "}
            {news.state?.views || 0}
          </span>
          <span className="flex items-center gap-1 font-medium cursor-pointer">
            <FaHeart className="text-gray-500 text-base" />{" "}
            {news.state?.likes || 0}
          </span>
          <span className="flex items-center gap-1 font-medium cursor-pointer">
            <FaComment className="text-gray-500 text-base" />{" "}
            {news.comments.length}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mt-1">
        {getPreviewText(news.content, 30)}
      </p>

      {news.content.split(" ").length > 30 && (
        <ContinueButton
          onClick={() => handleContinue(news.state?.views || 0)}
        />
      )}
    </div>
  );
};

export default NewsItem;
