import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import "../css/create-recipe.css";

export const CreateRecipes = () => {

  const userID = useGetUserID();

  const [recipe, setRecipe] =useState({
    name:"",
    ingredients:"",
    instructions:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userID,
  });

  const navigate= useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setRecipe({ ...recipe, [name]:value });
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  //console.log(recipe);
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />
        <label htmlFor="ingredients">Ingredients</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
