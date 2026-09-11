import "./App.css";
import { useEffect, useState } from "react";
import MyRecipesComponent from "./MyRecipesComponent";

function App() {
  const MY_ID = import.meta.env.VITE_EDAMAM_ID;
  const MY_KEY = import.meta.env.VITE_EDAMAM_KEY;

  const [mySearch, setMySearch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState("mozzarella");
  const [error, setError] = useState("");

  useEffect(() => {
    const getRecipes = async () => {
      if (!MY_ID || !MY_KEY) {
        setError(
          "Edamam API credentials are missing. Check your .env file."
        );
        return;
      }

      try {
        setError("");

        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(
            wordSubmitted
          )}&app_id=${MY_ID}&app_key=${MY_KEY}`
        );

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();

        setMyRecipes(data.hits || []);
      } catch (err) {
        console.error(err);

        setMyRecipes([]);
        setError("Could not load recipes. Please try again.");
      }
    };

    getRecipes();
  }, [wordSubmitted, MY_ID, MY_KEY]);

  const myRecipeSearch = (e) => {
    setMySearch(e.target.value);
  };

  const finalSearch = (e) => {
    e.preventDefault();

    const query = mySearch.trim();

    if (query) {
      setWordSubmitted(query);
    }
  };

  return (
    <div className="App">

      {/* HEADER */}

      <header className="header">

        <div className="logo">
          Recipe<span>Book</span>
        </div>

      

      </header>


      {/* HERO */}

      <section className="hero">

        <div className="heroText">

          <p className="eyebrow">
            FIND YOUR NEXT FAVORITE
          </p>

          <h1>
            What are you cooking today?
          </h1>

          <p className="heroDescription">
            Discover delicious recipes based on the ingredients
            you already have.
          </p>


          {/* SEARCH */}

          <form
            className="searchForm"
            onSubmit={finalSearch}
          >

            <input
              className="search"
              type="text"
              placeholder="Search recipes..."
              onChange={myRecipeSearch}
              value={mySearch}
              aria-label="Search recipes"
            />

            <button
              type="submit"
              className="searchButton"
            >
              Search
            </button>

          </form>

        </div>

      </section>


      {/* RECIPES */}

      <main
        id="recipes"
        className="recipes"
      >

        {error && (
          <p className="errorMessage">
            {error}
          </p>
        )}


        {!error && myRecipes.length === 0 && (
          <p className="emptyMessage">
            No recipes found.
          </p>
        )}


        {myRecipes.map((element, index) => {

          const recipe = element.recipe;

          return (
            <MyRecipesComponent
              key={recipe.uri || index}

              label={recipe.label}

              calories={recipe.calories}

              mealType={recipe.mealType}

              images={recipe.image}

              dietLabels={recipe.dietLabels}

              ingredients={recipe.ingredientLines}

              fat={
                recipe.totalNutrients?.FAT?.quantity || 0
              }

              weight={recipe.totalWeight}

              protein={
                recipe.totalNutrients?.PROCNT?.quantity || 0
              }

              carbohydrates={
                recipe.totalNutrients?.CHOCDF?.quantity || 0
              }
            />
          );
        })}

      </main>

    </div>
  );
}

export default App;