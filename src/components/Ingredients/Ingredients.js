import React, { useState, useEffect, useCallback } from 'react';
import IngredientList from './IngredientList';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState();
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
        setError('Something went wrong');
        setLoading(false);
      })
  }, []);
  const addIngredientHandler = ingredient => {
    setLoading(true);
    fetch('https://react-hooks-287f0.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(resdata => {
        setLoading(false);
        setUserIngredients(prevState => [
          ...prevState,
          {
            id: resdata.name,...ingredient
          }
        ])
      })
      .catch(error => {
        setError('Something went wrong');
        setLoading(false);
      });

  };
  const removeIngredientHandler = intgredientId => {
    setLoading(true);
    fetch(`https://react-hooks-287f0.firebaseio.com/ingredients/${intgredientId}.json`, {
      method: 'DELETE'
    })
      .then((res) => {
        setLoading(false);
        setUserIngredients(prevIngredients => {
          return prevIngredients.filter(ingredient => ingredient.id !== intgredientId);
        })
      })
      .catch(error => {
        setError('Something went wrong');
        setLoading(false);
      });
  }
  const filterIngredients = useCallback(filterIngredient => {
    setUserIngredients(filterIngredient);
  }, []);
  const clearError = () => {
    setError(null);

  }
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler}
    loading={isloading} />

      <section>
        <Search onLoadIngredients={filterIngredients} />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler} />
        { /* Need to add list here! */ }
      </section>
    </div>
    );
}

export default Ingredients;
