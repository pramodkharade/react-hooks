import React, { useState, useEffect } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  useEffect(() => {
    fetch('https://react-hooks-287f0.firebaseio.com/ingredients.json')
      .then(res => {
        return res.json();
      })
      .then((resData) => {
        const ingredients = [];
        for (let key in resData) {
          ingredients.push({
            id: key,
            title: resData[key].title,
            amount: resData[key].amount,
          });
        }
        console.log('GET Data', ingredients);
        setUserIngredients(ingredients);
      })
      .catch(error => {
      })
  }, []);
  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-287f0.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(resdata => {
        setUserIngredients(prevState => [
          ...prevState,
          {
            id: resdata.name,...ingredient
          }
        ])
      })

  };
  const removeIngredientHandler = intgredientId => {
    setUserIngredients(prevIngredients => {
      return prevIngredients.filter(ingredient => ingredient.id !== intgredientId);
    })
  }
  const filterIngredients = filterIngredient => {
    setUserIngredients(filterIngredient);
  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filterIngredients} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
        { /* Need to add list here! */ }
      </section>
    </div>
    );
}

export default Ingredients;
