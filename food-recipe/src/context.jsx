import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

const API = "https://forkify-api.herokuapp.com/api/v2/recipes";
// Forkify serves image URLs over http; upgrade to https to avoid mixed-content
// blocking when the app is served over https (e.g. GitHub Pages).
const toHttps = (url) => (url ? url.replace(/^http:\/\//, "https://") : url);

/**
 * Global state for the whole app (search term, results, current details,
 * favorites) — shared via Context so any page/component can read/update it.
 */
export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!searchParam.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}?search=${encodeURIComponent(searchParam)}`);
      const data = await res.json();
      const list = (data?.data?.recipes || []).map((r) => ({
        ...r,
        image_url: toHttps(r.image_url),
      }));
      setRecipeList(list);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setSearchParam("");
    }
  }

  // add if not present, otherwise remove (toggle)
  function handleAddToFavorite(currentRecipe) {
    const copy = [...favoritesList];
    const index = copy.findIndex((item) => item.id === currentRecipe.id);
    if (index === -1) copy.push(currentRecipe);
    else copy.splice(index, 1);
    setFavoritesList(copy);
  }

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        error,
        recipeList,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        toHttps,
        favoritesList,
        handleAddToFavorite,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
