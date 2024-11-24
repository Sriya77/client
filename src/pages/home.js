import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";  // Import Firestore db from firebase.js
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods

export const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Reference to the 'recipes' collection
        const recipesCollection = collection(db, "recipes");
        
        // Fetch the documents from the collection
        const snapshot = await getDocs(recipesCollection);
        
        // Map the documents to get the data
        const recipesList = snapshot.docs.map(doc => ({
          id: doc.id,      // Firestore document ID
          ...doc.data(),   // Document data
        }));

        // Set the fetched recipes in the state
        setRecipes(recipesList);
        console.log(recipesList);
      } catch (err) {
        console.log("Error fetching recipes: ", err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Recipes</h1>
        <div style={styles.recipes}>
          <div style={styles.recipesRow}>
            {recipes.map((recipe) => (
              <div key={recipe.id} style={styles.recipeCard}>
                <h2 style={styles.recipeTitle}>{recipe.name}</h2>
                <p style={styles.recipeInstructions}>{recipe.instructions}</p>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  style={styles.recipeImage}
                />
                <p style={styles.recipeTime}>
                  Cooking Time: {recipe.cookingTime} minutes
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    backgroundColor: "#f8f9fa",
    padding: "40px 0",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "30px",
  },
  recipes: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "30px",
    padding: "20px",
  },
  recipesRow: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "30px",
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "300px",
    padding: "20px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    overflow: "hidden",
  },
  recipeTitle: {
    fontSize: "1.8rem",
    fontWeight: "500",
    color: "#333",
    marginBottom: "15px",
    textAlign: "center",
  },
  recipeInstructions: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "15px",
    textAlign: "center",
    height: "60px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  recipeImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  recipeTime: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#1f4037",
    textAlign: "center",
  },
};
