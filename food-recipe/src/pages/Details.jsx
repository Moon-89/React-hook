import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context.jsx";

const API = "https://forkify-api.herokuapp.com/api/v2/recipes";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    toHttps,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  // useEffect: fetch this recipe's full details whenever the id changes
  useEffect(() => {
    let cancelled = false;
    async function getDetails() {
      try {
        const res = await fetch(`${API}/${id}`);
        const data = await res.json();
        if (cancelled) return;
        if (data?.data?.recipe) {
          const r = data.data.recipe;
          setRecipeDetailsData({ ...r, image_url: toHttps(r.image_url) });
        }
      } catch {
        /* ignore */
      }
    }
    getDetails();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!recipeDetailsData) return <div className="state">Loading recipe…</div>;

  const isFav = favoritesList.findIndex((item) => item.id === recipeDetailsData.id) !== -1;

  return (
    <div className="details">
      <div className="details-img">
        <img src={recipeDetailsData.image_url} alt={recipeDetailsData.title} />
      </div>

      <div className="details-info">
        <span className="publisher">{recipeDetailsData.publisher}</span>
        <h2>{recipeDetailsData.title}</h2>

        <button className="fav-btn" onClick={() => handleAddToFavorite(recipeDetailsData)}>
          {isFav ? "Remove from favorites" : "Add to favorites"}
        </button>

        <div className="ingredients">
          <span className="ing-title">Ingredients:</span>
          <ul>
            {recipeDetailsData.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.quantity || ""} {ing.unit} {ing.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
