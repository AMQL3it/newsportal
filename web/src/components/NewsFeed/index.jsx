
import NewsItem from '../NewsItem';
import styles from './NewsFeed.module.css';
import Divider from '../General/Divider';
import postService from '../../services/postService';
import { useEffect, useState } from 'react';


const NewsFeed = ({status}) => {
  const [posts, setPosts] = useState([]);
    const newsList = [
        {
            id: 1,
            title: "Trending Gadget That Simply Change Your Lifestyle",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolores.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            date: "July 17, 2023",
            author: "DemoAdmin"
        },
        {
            id: 2,
            title: "Trending Gadget That Simply Change Your Lifestyle",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores neque, doloribus mollitia ipsum consequatur ut illum inventore sed modi tempore animi natus voluptate magni ducimus vel non iure repellat id? Quis aliquid nostrum dignissimos voluptatum. Sequi id nobis eum provident, at, consectetur debitis minus sed rerum eos beatae sunt dolor earum alias corporis, architecto ipsa nisi aliquid ratione vel nulla dicta illum. In officia molestias obcaecati velit. Fugiat temporibus commodi vel iure corporis, quaerat dolores assumenda culpa illo eligendi eum praesentium nulla blanditiis, autem error reprehenderit fuga voluptates ratione! Voluptates mollitia nulla voluptatibus, repudiandae iste debitis ipsa veritatis quasi iusto.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            date: "July 17, 2023",
            author: "DemoAdmin"
        },
        {
            id: 3,
            title: "Trending Gadget That Simply Change Your Lifestyle",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, dolores.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            date: "July 17, 2023",
            author: "DemoAdmin"
        }
    ]

    useEffect(() => {
      getAllPosts();
    }, []);
  
    const getAllPosts = async () => {
      try {
        const result = await postService.getAll("posts");
        console.log(result.data);
        
        const formattedPosts = result.data.map(post => ({
          id: post.id,
          title: post.title,
          auther: post.auther,
          content: post.content,
          image: post.image,
          is_active: post.is_active,
          seo_score: post.seo_score,
          readable_score: post.readable_score,
          layout: post.layout,
          category_id: post.category_id,
          tag_ids: post.tag_ids,
        }));
        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  return (
    <div className={styles.newsFeed}>
      {posts.map((news) => (
        <NewsItem key={news.id} news={news} />
      ))}
      <Divider />
      
    </div>
  );
};

export default NewsFeed;
