const getPreviewText = (text, limit = 10) => {
    const words = text.split(" ");
    if (words.length <= limit) return text;

    return words.slice(0, limit).join(" ") + " ... ";  
};

export default getPreviewText;