import styles from './NewsTag.module.css';

const NewsTag = ({ tags }) => {
  const getColorClass = (tag) => {
    const map = {
      Gadget: styles.green,
      Tech: styles.red,
      Entertainment: styles.orange,
      Politics: styles.pink,
      Sports: styles.yellow,
      Business: styles.blue,
    };
    return map[tag] || styles.blue;
  };

  return (
    <div className={styles.tags}>
      {tags.map((tag, idx) => (
        <span key={idx} className={`${styles.tag} ${getColorClass(tag)}`}>
          {tag}
        </span>
      ))}
    </div>
  );
};

export default NewsTag;
