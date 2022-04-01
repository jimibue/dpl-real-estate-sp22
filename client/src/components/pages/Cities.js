import React from "react";
import useAxios from "axios-hooks";
import { Form } from "react-bootstrap";

const Cities = (props) => {
  const [{ data, loading, error }] = useAxios("/api/properties");
  if (error) return <p>Error occured</p>;
  if (loading) return <p>loading</p>;

  const getUniqueCities = () => {
    // reduce returns the 'acummulator'
    // second arg is the start value for the acumm
    return data.reduce((acumm, d) => {
      if (!acumm.includes(d.city)) {
        acumm.push(d.city);
      }
      // this return value becomes the next acumm in function call
      return acumm;
    }, []);
  };

  const handleSelect = (x)=>{
      console.log(x.target.value)
  }

  const renderSelect = (cities) => {
    return (
      <Form.Select onChange={handleSelect}aria-label="Select City">
         {cities.map(city=> <option value={city}>{city}</option>)}
      </Form.Select>
    );
  };

  const getSelect = () => {
    //1. getting all unique cities
    let uniqueCities = getUniqueCities();
    //2. how do we hook this up to bootstrap component
    return renderSelect(uniqueCities)
    //3. how do we handle the click event on select..
  };
  
  return (
    <div>
      <h1>Cities</h1>
      <p>select should be here</p>
      {getSelect()}
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default Cities;
