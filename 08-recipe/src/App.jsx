import { useState, useEffect } from "react";
import "./App.css";

const API = "https://www.themealdb.com/api/json/v1/1";

/**
 * Food Recipe Finder — Hook focus:
 *   useState  -> search term, committed query, category filter, meals, categories, modal
 *   useEffect -> load categories once; SEARCH the API whenever the query changes
 * FILTER is derived client-side from the fetched meals + selected category.
 * API (no key): TheMealDB.
 */
export default function App() {
  const [term, setTerm] = useState("chicken");
  const [query, setQuery] = useState("chicken");
  const [category, setCategory] = useState("All");
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | done | error
  const [selected, setSelected] = useState(null);

  // Load category list once (for the filter dropdown).
  useEffect(() => {
    fetch(`${API}/list.php?c=list`)
      .then((r) => r.json())
      .then((d) => setCategories((d.meals || []).map((m) => m.strCategory)))
      .catch(() => {});
  }, []);

  // SEARCH: fetch meals whenever the committed query changes.
  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetch(`${API}/search.php?s=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setMeals(d.meals || []);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  // FILTER: derive the visible list from meals + selected category.
  const visible = meals.filter(
    (m) => category === "All" || m.strCategory === category
  );

  function submit(e) {
    e.preventDefault();
    setQuery(term.trim());
    setCategory("All");
  }

  function ingredientsOf(meal) {
    const list = [];
    for (let i = 1; i <= 20; i++) {
      const ing = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ing && ing.trim()) list.push(`${measure || ""} ${ing}`.trim());
    }
    return list;
  }

  return (
    <div className="screen recipe-screen">
      <div className="recipe">
        <h1>🍳 Recipe Finder</h1>
        <p className="sub">Search + filter · TheMealDB · useState + useEffect</p>

        <div className="controls">
          <form className="search" onSubmit={submit}>
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search recipes (e.g. pasta, beef)…"
            />
            <button type="submit">Search</button>
          </form>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {status === "done" && (
          <p className="count">
            {visible.length} recipe{visible.length !== 1 ? "s" : ""}
            {category !== "All" ? ` in “${category}”` : ""} for “{query}”
          </p>
        )}

        {status === "loading" && <p className="msg">Loading recipes…</p>}
        {status === "error" && <p className="msg">⚠️ Failed to load. Check your connection.</p>}
        {status === "done" && visible.length === 0 && (
          <p className="msg">No recipes found. Try another search or category.</p>
        )}

        <div className="rgrid">
          {visible.map((m) => (
            <div key={m.idMeal} className="rcard" onClick={() => setSelected(m)}>
              <img src={m.strMealThumb} alt={m.strMeal} loading="lazy" />
              <div className="body">
                <h3>{m.strMeal}</h3>
                <div className="tags">
                  <span className="tag">{m.strCategory}</span>
                  <span className="tag area">{m.strArea}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="overlay" onClick={() => setSelected(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="close" onClick={() => setSelected(null)}>×</button>
              <img src={selected.strMealThumb} alt={selected.strMeal} />
              <div className="inner">
                <h2>{selected.strMeal}</h2>
                <div className="tags">
                  <span className="tag">{selected.strCategory}</span>
                  <span className="tag area">{selected.strArea}</span>
                </div>
                <h4>Ingredients</h4>
                <ul>
                  {ingredientsOf(selected).map((x, i) => (
                    <li key={i}>{x}</li>
                  ))}
                </ul>
                <h4>Instructions</h4>
                <p>{selected.strInstructions}</p>
                {selected.strYoutube && (
                  <p className="yt">
                    <a href={selected.strYoutube} target="_blank" rel="noreferrer">
                      ▶ Watch on YouTube
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
