import image from "../../assets/background.png";

export const stories = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Trending Gadget #${i + 1}`,
  tags: ["Gadget", "Tech"],
  date: "July 17, 2023",
  author: "DemoAdmin",
  image: image,
}));
