import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";  // Import Firestore db from firebase.js
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import '../css/home.css'; // Import the CSS file

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesCollection = collection(db, "recipes");
        const snapshot = await getDocs(recipesCollection);
        const recipesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          showDetails: false
        }));
        setRecipes(recipesList);
      } catch (err) {
        console.log("Error fetching recipes: ", err);
      }
    };
    fetchRecipes();
  }, []);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const toggleDetails = (recipeId) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe =>
        recipe.id === recipeId ? { ...recipe, showDetails: !recipe.showDetails } : recipe
      )
    );
  };

  return (
    <div>

    <section className="section">
    <div class="button-container">
        <a 
    href="https://github.com/Sriya77/client" 
    target="_blank" 
    rel="noopener noreferrer"
    class="button-icon"
  >
    <div class="icon">
      <svg viewBox="0 0 24 24">
        <path
          d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"
          fill="#222229"
        ></path>
      </svg>
    </div>
    <div class="cube">
      <span class="side front">hover me</span>
      <span class="side top">check it on github</span>
    </div>
  </a>
        </div>

      <div className="container">
        <h1 className="heading">Recipes</h1> 
               
        <div className="recipes">
          <div className="recipesRow">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipeCard">
                <h2 className="recipeTitle">{recipe.name}</h2>

                {recipe.imageUrl && (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="recipeImage"
                  />
                )}

                {recipe.showDetails && (
                  <>
                    {recipe.ingredients && (
                      <div className="recipeDetails">
                        <h3 className="detailsTitle">Ingredients:</h3>
                        <ul className="detailsList">
                          {recipe.ingredients.split(",").map((ingredient, index) => (
                            <li key={index} className="detailsItem">{ingredient.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {recipe.instructions && (
                      <div className="recipeDetails">
                        <h3 className="detailsTitle">Instructions:</h3>
                        <p className="recipeInstructions">{recipe.instructions}</p>
                      </div>
                    )}

                    <p className="recipeTime">
                      Cooking Time: {recipe.cookingTime} minutes
                    </p>
                  </>
                )}

                <button 
                  onClick={() => openModal(recipe)} 
                  className="knowMoreButton"
                >
                  Know More
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedRecipe && (
        <div className="modalOverlay">
          <div className="modal">
            <button onClick={closeModal} className="closeButton">Close</button>
            <h2 className="modalTitle">{selectedRecipe.name}</h2>
            <div className="modalContent">
              <h3>Ingredients:</h3>
              <ul>
                {selectedRecipe.ingredients.split(",").map((ingredient, index) => (
                  <li key={index}>{ingredient.trim()}</li>
                ))}
              </ul>
            </div>
            <div className="modalContent">
              <h3>Instructions:</h3>
              <p>{selectedRecipe.instructions}</p>
            </div>
            {selectedRecipe.imageUrl && (
              <img
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.name}
                className="modalImage"
              />
            )}
            <p className="modalTime">Cooking Time: {selectedRecipe.cookingTime} minutes</p>
          </div>
        </div>
      )}
    </section>
    </div>
  );
};
export default Home;