import { useEffect, useState } from "react";
import axios from "axios";
import "../css/home.css";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section>
    <div className="container">
      <h1>Recipes</h1>
      <div className="recipes">
        <div  className="recipes-row">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe">
              <h2>{recipe.name}</h2>
              <p>{recipe.instructions}</p>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p>Cooking Time:{recipe.cookingTime}( minutes)</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
}