import { useContext } from "react";
import { GlobalContext } from "../context.jsx";
import RecipeItem from "../RecipeItem.jsx";

export default function Home() {
  const { recipeList, loading, error } = useContext(GlobalContext);

  if (loading) return <div className="state">Loading… please wait</div>;
  if (error) return <div className="state err">{error}</div>;

  return (
    <div className="grid">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem key={item.id} item={item} />)
      ) : (
        <p className="state">Search for a recipe to get started — try "apple" or "pizza".</p>
      )}
    </div>
  );
}
