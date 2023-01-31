import React, { useState } from "react";
import { getRandomId } from "./helper";

export const MyForm = (props) => {
  const [formValues, setFormValues] = useState({
    name: '',
    age: 0,
    city: '',
    list: []
  });

  const handleReset = () => {
    const newValues = { ...formValues, name: '', age: 0, city: '' };
    setFormValues(newValues)
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newValues = { ...formValues, list: [...formValues.list], name: '', age: 0, city: '' };
    /* whenever u are updating the state and value is of non primitve,
      you have to give new reference in set state function...
    */
    newValues.list.push({ name, age, city, id: getRandomId() });
    setFormValues(newValues)
  };

  const handleNameChange = (e) => {
    /* second form of setState hook */
    setFormValues((oldValues => {
        return {
            ...oldValues,
            name: e.target.value,
        }
    }));
  };

  const handleCityChange = (e) => {
        /* second form of setState hook */
        setFormValues((oldValues => {
            return {
                ...oldValues,
                city: e.target.value,
            }
        }));
  };
  const handleAgeChange = (e) => {
        /* second form of setState hook */
        setFormValues((oldValues => {
            return {
                ...oldValues,
                age: e.target.value,
            }
        }));
  };

  const { name, age, city, list } = formValues;

  return (
    <div>
      <form>
        <div>
          <label htmlFor="txtName">
            Enter your name
            <input
              onChange={handleNameChange}
              value={name}
              type="text"
              id="txtName"
            />
          </label>
        </div>
        <div>
          <label htmlFor="age">
            Enter your age
            <input
              onChange={handleAgeChange}
              value={age}
              type="number"
              id="number"
              max="100"
            />
          </label>
        </div>
        <div>
          <label htmlFor="city">
            Enter your city
            <input
              onChange={handleCityChange}
              value={city}
              type="text"
              id="city"
            />
          </label>
        </div>
        <div>
          <button type="submit" onClick={handleFormSubmit}>
            Submit
          </button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.city}</td>
              </tr>
            );
          })}
          {list.length === 0 ? (
            <tr>
              <td colSpan="3">No data to display</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

MyForm.propTypes = {};

