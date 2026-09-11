function MyRecipesComponent({
  label,
  calories,
  mealType,
  images,
  dietLabels,
  ingredients,
  fat,
  weight,
  protein,
  carbohydrates,
}) {

  const safeWeight = Number(weight) || 1;

  const calories100 = (
    (Number(calories || 0) / safeWeight) *
    100
  ).toFixed(0);

  const fat100 = (
    (Number(fat || 0) / safeWeight) *
    100
  ).toFixed(1);

  const protein100 = (
    (Number(protein || 0) / safeWeight) *
    100
  ).toFixed(1);

  const carbs100 = (
    (Number(carbohydrates || 0) / safeWeight) *
    100
  ).toFixed(1);


  return (

    <article className="recipeCard">


      {/* IMAGE */}

      <div className="recipeImageWrapper">

        <img
          className="recipeImage"
          src={images}
          alt={label}
        />

      </div>


      {/* CONTENT */}

      <div className="recipeContent">


        {/* HEADER */}

        <div className="recipeHeader">

          <div>

            <span className="mealType">
              {mealType?.[0] || "Recipe"}
            </span>

            <h2>
              {label}
            </h2>

          </div>


          {dietLabels?.length > 0 && (

            <span className="dietBadge">
              {dietLabels[0]}
            </span>

          )}

        </div>


        {/* NUTRITION */}

        <section
          id="nutrition"
          className="nutrition"
        >

          <h3>
            Nutrition per 100 g
          </h3>


          <div className="nutritionGrid">


            <div className="nutritionItem">

              <strong>
                {calories100}
              </strong>

              <span>
                kcal
              </span>

            </div>


            <div className="nutritionItem">

              <strong>
                {fat100} g
              </strong>

              <span>
                fat
              </span>

            </div>


            <div className="nutritionItem">

              <strong>
                {protein100} g
              </strong>

              <span>
                protein
              </span>

            </div>


            <div className="nutritionItem">

              <strong>
                {carbs100} g
              </strong>

              <span>
                carbs
              </span>

            </div>


          </div>

        </section>


        {/* INGREDIENTS */}

        <section
          id="ingredients"
          className="ingredients"
        >

          <div className="sectionTitle">

            <h3>
              Ingredients
            </h3>

            <span>
              {ingredients.length} items
            </span>

          </div>


          <ul>

            {ingredients.map(
              (ingredient, index) => (

                <li key={index}>

                  <span className="check">
                    ✓
                  </span>

                  <span>
                    {ingredient}
                  </span>

                </li>

              )
            )}

          </ul>

        </section>


      </div>

    </article>

  );
}

export default MyRecipesComponent;