import { useState } from "react";

const WriteComment = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!text.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ text });
      setText("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit comment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-2 mt-4 bg-gray-50 p-4 rounded-lg shadow"
    >
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        disabled={loading}
      ></textarea>

      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="self-end px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default WriteComment;
