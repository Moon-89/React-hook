import { useState, useEffect } from "react";
import "./ImageSlider.css";

/**
 * Image Slider — Hook focus:
 *   useState  -> fetched images, current index, request status
 *   useEffect -> fetch the image list from the API on mount / when props change
 */
export default function ImageSlider({ url, page = 1, limit = 10 }) {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState("loading"); // loading | done | error

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(`${url}?page=${page}&limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setImages(data);
        setCurrent(0);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [url, page, limit]);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  if (status === "loading") return <div className="slider msg">Loading images…</div>;
  if (status === "error") return <div className="slider msg err">⚠️ Failed to load images.</div>;
  if (!images.length) return <div className="slider msg">No images found.</div>;

  return (
    <div className="slider">
      <button className="arrow left" onClick={prev} aria-label="Previous">‹</button>

      <div className="track">
        {images.map((img, index) => (
          <img
            key={img.id}
            src={`https://picsum.photos/id/${img.id}/900/520`}
            alt={img.author}
            loading="lazy"
            className={`slide ${index === current ? "active" : ""}`}
          />
        ))}
      </div>

      <button className="arrow right" onClick={next} aria-label="Next">›</button>

      <div className="dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
