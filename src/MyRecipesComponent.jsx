
function MyRecipesComponent({label, calories,mealType, images, dietLabels, ingredients, fat, weight, protein, carbohydrates }) {
    return( 
        <div>
             <h2>{label}</h2>
         <div className="mainContainer">
            <div className="pictureContainer">
            
             <h3>{mealType} </h3>
             <img className="image" src={images} width="350px" alt="Dish"/>
             </div>

             <div className="tableContainer">
             <table>
             <thead>
                <tr>
             <th  colSpan="5"> Nutritional value per 100 g</th>
             </tr>
             </thead>
             <thead>
                <tr>
                    <th>DietLabel</th>
                    <th>Calories, kcal</th>
                    <th> Fat, g </th>
                    <th>Protein, g</th>
                    <th>Carbohydrates, g</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                       <td>{dietLabels} </td>
             <td>{(calories/weight*100).toFixed()}  </td>
             <td>{(fat/weight*100).toFixed(1)}  </td>
             <td>{(protein/weight*100).toFixed(1)} </td>
             <td>{(carbohydrates/weight*100).toFixed(1)}  </td>
                </tr>
                </tbody>
             </table>
                 <h3>Ingredients:</h3>
             <ul className="list">
                {ingredients.map((ingredient, index) => (
                    <li key={index}> ✔ {ingredient} </li>
                ))}
             </ul>
             </div>

        </div>
        </div>)
}
export default MyRecipesComponent;