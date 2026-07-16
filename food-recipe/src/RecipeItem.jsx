import { Link } from "react-router-dom";

export default function RecipeItem({ item }) {
  return (
    <div className="recipe-card">
      <div className="thumb">
        <img src={item.image_url} alt={item.title} loading="lazy" />
      </div>
      <div className="body">
        <span className="publisher">{item.publisher}</span>
        <h3>{item.title}</h3>
        <Link className="details-btn" to={`/details/${item.id}`}>
          Recipe Details
        </Link>
      </div>
    </div>
  );
}
