import NewsFeed from "../../components/NewsFeed";
import FeedSidebar from "../../components/FeedSidebar/FeedSidebar";
import SuggestedNewsCard from "../../components/SuggestedNewsCard";
import style from "./ExplorePage.module.css"

const ExplorePage = () => {
    return (
        <div className={style.explorePage}>
            <div className={style.newsSection}>
                <NewsFeed status="singleNews" />
                <SuggestedNewsCard />
            </div>
            <div className={style.sidebarSection}>
                <FeedSidebar />
            </div>
        </div>
    )
}

export default ExplorePage;