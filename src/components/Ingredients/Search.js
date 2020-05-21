import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter, setFilter] = useState('');
  const {onLoadIngredients} = props;
  useEffect(() => {
    const query = enteredFilter.length === 0
      ? ''
      : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https://react-hooks-287f0.firebaseio.com/ingredients.json' + query)
      .then(res => res.json())
      .then(resData => {
        const loadingredients = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            loadingredients.push({
              id: key,
              title: resData[key].title,
              amount: resData[key].amount,
            });

          }
        }
        props.onLoadIngredients(loadingredients);
      })
      .catch(error => {
      })
  }, [enteredFilter, onLoadIngredients]);
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter}
    onChange={(event) => {
      setFilter(event.target.value);
    }} />
        </div>
      </Card>
    </section>
    );
});

export default Search;
