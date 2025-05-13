import StorySection from "../StorySection";
import GridNewsCards from "./GridNewsCards";
import SuggestedNewsCards from "./SuggestedNewsCards";

const CoverSection = () => {
  return (
    <div className="m-2 grid gap-3">
      {/* Top Grid: Story (left) and Grid News (right) */}
      <div className="grid md:grid-cols-2 gap-3 sm:grid-cols-1">
        <div className="h-auto md:h-auto">
          <StorySection />
        </div>
        <GridNewsCards />
      </div>

      {/* Suggested News Bottom Section */}
      <SuggestedNewsCards />
    </div>
  );
};

export default CoverSection;
