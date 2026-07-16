import { useState, useEffect } from "react";
import "./LoadMore.css";

/**
 * Load More Data — Hook focus:
 *   useState  -> products, total, loading, error, and how many batches loaded
 *   useEffect -> fetch the next batch from the API whenever `page` changes
 * API: dummyjson products, paged with limit + skip.
 */
export default function LoadMore({ batchSize = 20 }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0); // number of batches loaded (0-indexed)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(0); // bump to retry a failed fetch

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `https://dummyjson.com/products?limit=${batchSize}&skip=${page * batchSize}`
        );
        if (!res.ok) throw new Error("request failed");
        const data = await res.json();
        if (cancelled) return;
        setProducts((prev) => [...prev, ...data.products]);
        setTotal(data.total);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [page, batchSize, reload]);

  const allLoaded = total > 0 && products.length >= total;

  return (
    <div className="lm">
      <header className="lm-head">
        <h1>Products</h1>
        {total > 0 && (
          <p>Showing {products.length} of {total}</p>
        )}
      </header>

      {error && (
        <p className="lm-msg err">⚠️ Failed to load. <button onClick={() => setReload((r) => r + 1)}>Retry</button></p>
      )}

      <div className="grid">
        {products.map((p) => (
          <article className="card" key={p.id}>
            <div className="thumb">
              <img src={p.thumbnail} alt={p.title} loading="lazy" />
            </div>
            <h3>{p.title}</h3>
          </article>
        ))}
      </div>

      <div className="lm-foot">
        {allLoaded ? (
          <p className="lm-done">You've reached the end — all {total} products loaded.</p>
        ) : (
          <button
            className="load-btn"
            onClick={() => setPage((p) => p + 1)}
            disabled={loading}
          >
            {loading ? "Loading…" : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}
