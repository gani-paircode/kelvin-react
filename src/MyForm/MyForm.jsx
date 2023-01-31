import React, { useState, useCallback } from "react";
import { getRandomId } from "./helper";

const InitialState = Object.freeze({
  name: '',
  age: 0,
  city: '',
  list: []
});

export const MyForm = (props) => {
  const [formValues, setFormValues] = useState(InitialState);

  const handleReset = useCallback(() => {
    const newValues = { ...formValues, name: '', age: 0, city: '' };
    setFormValues(newValues)
  }, [formValues, setFormValues]);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    setFormValues((obj) => {
      const newRecord = { name: obj.name, age: obj.age, city: obj.city, id: getRandomId() };
      return {
        ...obj,
        name: '', age: 0, city: '',
        list: [...obj.list, newRecord],
      };
    });   
  }, [setFormValues])

  const handleNameChange = useCallback((e) => {
    setFormValues((oldValues => {
      return {
        ...oldValues,
        name: e.target.value,
      }
    }));
  }, [setFormValues]);

  const handleCityChange = useCallback((e) => {
    setFormValues((oldValues => {
      return {
        ...oldValues,
        city: e.target.value,
      }
    }));
  }, [setFormValues]);

  const handleAgeChange = useCallback((e) => {
    setFormValues((oldValues => {
      return {
        ...oldValues,
        age: e.target.value,
      }
    }));
  }, [setFormValues]);

  const { list } = formValues;
  return (
    <div>
      <form>
        <div>
          <label htmlFor="txtName">
            Enter your name
            <input
              onChange={handleNameChange}
              value={formValues.name}
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
              value={formValues.age}
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
              value={formValues.city}
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

