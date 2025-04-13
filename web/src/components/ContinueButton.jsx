import { FaArrowAltCircleRight } from "react-icons/fa";
import { useState } from "react";

const ContinueButton = () => {
    const [hover, setHover] = useState(false);

    const buttonStyle = {
        width: "fit-content",
        backgroundColor: hover ? "var(--header-body-color)" : "var(--header-body-hover-color)",
        color: "floralwhite",
        border: "none",
        padding: "10px 20px",
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
        >
            <FaArrowAltCircleRight /> Continue Reading
        </button>
    );
};

export default ContinueButton;
