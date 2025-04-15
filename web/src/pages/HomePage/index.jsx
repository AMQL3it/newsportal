import BreakingNews from "../../components/BreakingNews";
import ColumnContainer from "../../components/ColumnContainer";
import CoverSection from "../../components/CoverSection/CoverSection";

import GallaryContainer from "../../components/GallaryContainer";
import StoryContainer from "../../components/StoryContainer";
import YoutubeNewsContainer from "../../components/YoutubeNewsContainer";

const HomePage = () => {
    return (
        <>
            <BreakingNews />
            <CoverSection />
            <StoryContainer />
            <YoutubeNewsContainer />
            <ColumnContainer />
            <GallaryContainer />
        </>
    );
}

export default HomePage;