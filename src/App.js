import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import Title from './Title';
import Footer from './Footer';
import './App.css';


const App = () => {

  //should use env variables...
  const APP_ID = 'd40c2f29';
  const APP_KEY = '4330d7b01907e83778c80814e2bd894c';

//If have a counter button, this will log every time you click the button (render), even if page doesn't refresh
//useEffect(something, dependency) --> will run 'something' everytime dependency changes, so put an empty array for no change: only activates on first page load.
//can put counter inside, so every time you click counter button the value changes, and this will log
  // useEffect(() => {
  //   console.log('Effect has been run');
  // }, [])
  
//STATES
                                            //setRecipes(data.hits) will store the API data to 'recipes' state here 
const [recipes, setRecipes] = useState([]); //array because data.hits is an array (check with inspect element)
const [search, setSearch] = useState(""); //state to store user input for search bar, emtpy to begin with
const [query, setQuery] = useState("croissant"); //state to store the final query when press search

//EFFECTS
//activates on page load, and everytime [] is updated (never lel)
useEffect( () => {
  getRecipes();
  }, [query]);

//making an asynchronous call, 'await' keyword to await call to complete, although lets caller of function continue processing (asynchronous)
//also setting the state: taking the API data and storing in state
const getRecipes = async () => {
                                //after the 'search?' the 'q' signifies query: whatever is after it = what we're seraching for.
                                //JavaScript Template Literals: use back ticks (the button besides number 1) instead of strings: allow interpolation with what's inside ${}
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); //change the elements in the query to match ur ID and KEY + query
  const data = await response.json();
  console.log(data.hits); //pulling the 'hits' object (array) from the whole json object (it's where it contains the recipes)
  setRecipes(data.hits); //setting the hits array in our state above (recipe variable)
}

//updating 'search' state with the onChange event target value
const updateSearch = (e) => {
  setSearch(e.target.value);
  console.log(search);
}

//updating query when click on search
const getSearch = (e) => {
  e.preventDefault(); //prevent page refresh when pressing submit
  setQuery(search);
  setSearch("");
}

//changing search button on mouse over and out
const buttonOver = (e) => {
  e.target.innerHTML = "Go!";
}
const buttonOut = (e) => {
  e.target.innerHTML = "Search";
}

  return(
    <div className="App">
      <Title />
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder="Enter your favourite dish, I'm sure we have it! :)" value={search} onChange={updateSearch}/> {/*passes the onChange event to updateSearch, it needs to be here so can retrieve input value (as opposed to button)*/}
        <button className="search-button" type="submit" onMouseOver={buttonOver} onMouseOut={buttonOut}>Search</button>
      </form>
      <div className="recipe">
      {recipes.map(recipe => ( //iterate over the array, use parenthesis to return the JSX.
        <Recipe 
        //passing the state data as prop to render actual item values for this component
        key = {recipe.recipe.label} //key attribute to prevent compile error on browser (need unique one)
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients} //ingredient is an array
        />
      ))};
      </div>
      <Footer />
    </div>
  );
}

export default App;
