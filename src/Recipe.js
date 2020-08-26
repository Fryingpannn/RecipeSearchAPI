import React from 'react';
import style from './recipe.module.css'; //to add css module only for this component, will not matter if use same class name

//essentially, passing data from App component's state to Recipe component through props
const Recipe = ({title, calories, image, ingredients}) => { //destructure props with {}
    return(
        <div className={style.recipe}>
            <h1 className="display-4 p-3">{title}</h1>
            <ul> {/*Ingredients is an array of objects, so need to iterate through it with map to display*/}
                {ingredients.map(ingredient => (
                    <li className="lead">{ingredient.text}</li>
                ))}
            </ul>
            <p>Calories: {Math.floor(calories)}g</p>
            <img className={style.image} src={image} alt="Cannot display :("/>
        </div>
    );
}

export default Recipe;