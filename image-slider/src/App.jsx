import ImageSlider from "./ImageSlider.jsx";

export default function App() {
  return (
    <div className="page">
      <ImageSlider url="https://picsum.photos/v2/list" page={1} limit={10} />
    </div>
  );
}
