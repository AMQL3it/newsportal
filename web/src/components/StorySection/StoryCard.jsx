import React from "react";
import styles from "./StorySection.module.css";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Meta from "../General/Meta";

const StoryCard = ({ story }) => {
  return (
    <div className={styles.storyCard}>
      <img src={story.image} alt={story.title} />
      <div className={styles.overlay}>
        <div className={styles.tags}>
          {story.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`${styles.tag} ${tag.toLowerCase() === "gadget" ? styles.green : styles.red}`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className={styles.storyTitle}>{story.title}</h2>
        <Meta date={story.date} author={story.author} />
      </div>
    </div>
  );
};

export default StoryCard;
