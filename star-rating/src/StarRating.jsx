import { useState } from "react";
import "./StarRating.css";

/**
 * Star Rating — Hook focus: useState (committed rating + hover preview).
 * A star is filled when its position is <= the hovered star (preview)
 * or, when nothing is hovered, <= the committed rating.
 */
export default function StarRating({ noOfStars = 5 }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (i) => setRating(i);
  const handleMouseEnter = (i) => setHover(i);
  const handleMouseLeave = () => setHover(0);

  return (
    <div className="stars">
      <div className="row">
        {[...Array(noOfStars)].map((_, index) => {
          const i = index + 1;
          const active = i <= (hover || rating);
          return (
            <span
              key={i}
              className={`star ${active ? "active" : ""}`}
              onClick={() => handleClick(i)}
              onMouseMove={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              role="button"
              tabIndex={0}
              aria-label={`Rate ${i} of ${noOfStars}`}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleClick(i)}
            >
              ★
            </span>
          );
        })}
      </div>
      <p className="readout">
        {rating ? `You rated ${rating} / ${noOfStars}` : "Click a star to rate"}
      </p>
    </div>
  );
}
