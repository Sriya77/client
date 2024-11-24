import { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { db } from ".././firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

export const CreateRecipes = () => {
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting recipe:", recipe);  // Check state here
    try {
      const docRef = await addDoc(collection(db, "recipes"), recipe);
      alert("Recipe created!");
      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Recipe</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="name" style={styles.label}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter recipe name"
        />
        <label htmlFor="ingredients" style={styles.label}>Ingredients</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="List the ingredients"
        ></textarea>
        <label htmlFor="instructions" style={styles.label}>Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Write the cooking instructions"
        ></textarea>
        <label htmlFor="imageUrl" style={styles.label}>Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={recipe.imageUrl}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter image URL"
        />
        <label htmlFor="cookingTime" style={styles.label}>Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter cooking time"
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(isHovered ? styles.buttonHover : {}),
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "1rem",
    marginBottom: "5px",
    color: "#34495e",
    fontWeight: "500",
  },
  input: {
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #dcdcdc",
    borderRadius: "8px",
    marginBottom: "15px",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#f9f9f9",
  },
  textarea: {
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #dcdcdc",
    borderRadius: "8px",
    marginBottom: "15px",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#f9f9f9",
    resize: "vertical",
  },
  button: {
    padding: "12px",
    fontSize: "1rem",
    color: "#ffffff",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    textTransform: "uppercase",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#2980b9",
    boxShadow: "0 4px 8px rgba(52, 152, 219, 0.4)",
  },
};
