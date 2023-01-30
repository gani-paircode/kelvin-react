import React, { useState } from "react";

export const MyForm = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [city, setCity] = useState("");

  const [list, setList] = useState([]);

  const handleReset = () => {
    setAge(0);
    setName("");
    setCity("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newList = [...list];
    /* whenever u are updating the state and value is of non primitve,
      you have to give new reference in set state function
    */
    newList.push({ name, age, city });
    setList(newList);
    handleReset();
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

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
              <tr>
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
