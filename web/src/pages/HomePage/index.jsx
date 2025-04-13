import ColumnContainer from "../../components/ColumnContainer";
import CoverContainer from "../../components/CoverContainer";
import GallaryContainer from "../../components/GallaryContainer";
import StoryContainer from "../../components/StoryContainer";
import YoutubeNewsContainer from "../../components/YoutubeNewsContainer";

const HomePage = () => {
    return (
        <>
            <CoverContainer />
            <StoryContainer />
            <YoutubeNewsContainer />
            <ColumnContainer />
            <GallaryContainer />
        </>
    );
}

export default HomePage;