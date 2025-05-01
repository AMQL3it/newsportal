import React, { useState } from "react";
import style from "./WriteComment.module.css";

const WriteComment = ({ onSubmit }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onSubmit({ text });
        setText("");
    };

    return (
        <form className={style.writeComment} onSubmit={handleSubmit}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default WriteComment;
