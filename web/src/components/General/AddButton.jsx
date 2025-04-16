import { FaPlus } from "react-icons/fa";
import { useState } from "react";

const ContinueButton = ({onClick}) => {
    const [hover, setHover] = useState(false);

    const buttonStyle = {
        width: "fit-content",
        backgroundColor: hover ? "var(--header-body-color)" : "var(--header-body-hover-color)",
        color: "floralwhite",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        transition: "all 1s ease",
    };

    return (
        <button
            style={buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClick}
        >
            <FaPlus /> Add New
        </button>
    );
};

export default ContinueButton;
