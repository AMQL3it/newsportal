import StorySection from "../StorySection";
import GridNewsCards from "./GridNewsCards";
import SuggestedNewsCards from "./SuggestedNewsCards";

const CoverSection = () => {
  return (
    <div
      className="m-2 grid gap-2"
      style={{
        gridTemplateColumns: "2fr 1.5fr",
        gridTemplateRows: "auto auto",
      }}
    >
      {/* <FeaturedNews /> */}
      <StorySection />
      <GridNewsCards />
      <SuggestedNewsCards />
    </div>
  );
};

export default CoverSection;
