
import './App.css';
import { useEffect, useState } from "react";
import video from "./coverr.mp4"
import MyRecipesComponent from './MyRecipesComponent';

function App() {


 const MY_ID = "5fcab87b";
 const MY_KEY = "bc13e5a178d10e55d57b39c7f4971070";

 const [mySearch, setMySearch] = useState("");
 const [myRecipes, setMyRecipes] = useState([]);
 const [wordSubmitted, setWordSubmitted] = useState("mozzarella");

 useEffect(()=> {
  const getRecipes = async () => { 
  const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
  const data = await response.json();
  setMyRecipes(data.hits)
   }
   getRecipes();
 },[wordSubmitted])

 const myRecipeSearch = (e) => {
  setMySearch(e.target.value)
 }

const finalSearch = (e) => {
  e.preventDefault();
  setWordSubmitted(mySearch);
}

  return (
    <div className="App">
       <div className='container'>
       <video autoPlay muted loop >
        <source src={video} type="video/mp4" />
       </video>
       </div>
       <h1>Find a Recipe</h1>

       <div className='input'>
        <form onSubmit={finalSearch}>
           <input className='search' placeholder='Search...' onChange={myRecipeSearch} value={mySearch}></input>
       </form>

       <div>
          <button onClick={finalSearch}><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBlATWVFDlJgeeB_DFgfyOxg8CF9A1aCL4uqWxvK8g1imgxVNMXCbKE7UvBsRVkbFtyuo&usqp=CAU' className='icon' alt='icon' /></button>
       </div>
       </div>
       
       <div>
       {myRecipes.map((element, index) => (
        <MyRecipesComponent  key={index}
        label={element.recipe.label} 
        calories={element.recipe.calories} 
        mealType={element.recipe.mealType}
        images={element.recipe.image} 
        dietLabels={element.recipe.dietLabels} 
        ingredients={element.recipe.ingredientLines}
        fat={element.recipe.totalNutrients.FAT.quantity}
        weight={element.recipe.totalWeight}
        protein={element.recipe.totalNutrients.PROCNT.quantity}
        carbohydrates={element.recipe.totalNutrients.CHOCDF.quantity} />
       ))}
       </div>

    </div>
  );
}

export default App;
