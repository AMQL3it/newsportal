import BreakingNews from "../../components/BreakingNews";
import CoverSection from "../../components/CoverSection/CoverSection";

import GallarySection from "../../components/GallarySection";
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