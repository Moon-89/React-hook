import { useContext } from "react";
import { GlobalContext } from "../context.jsx";
import RecipeItem from "../RecipeItem.jsx";

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext);

  return (
    <div className="grid">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <p className="state">No favorites yet — open a recipe and add it to favorites.</p>
      )}
    </div>
  );
}
