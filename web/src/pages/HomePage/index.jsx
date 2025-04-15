import BreakingNews from "../../components/BreakingNews";
import ColumnContainer from "../../components/ColumnContainer";
import CoverSection from "../../components/CoverSection/CoverSection";

import GallarySection from "../../components/GallarySection";
import StorySection from "../../components/StorySection";
import TrendingNewsSection from "../../components/TrendingNewsSection";

const HomePage = () => {
    return (
        <>
            <BreakingNews />
            <CoverSection />
            <TrendingNewsSection />
            <GallarySection />
        </>
    );
}

export default HomePage;