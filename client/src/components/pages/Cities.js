import React, { useState } from "react";
import useAxios from "axios-hooks";
import { Form, Table } from "react-bootstrap";

const Cities = (props) => {
  // get the from DB (once) useEffect setState etc.. in one line
  const [{ data: properties, loading, error }] = useAxios("/api/properties");

  const [filteredCities, setFilterCities] = useState(null);
  if (error) return <p>Error occured</p>;
  if (loading) return <p>loading</p>;

  const getUniqueCities = () => {
    // reduce returns the 'acummulator'
    // second arg is the start value for the acumm
    return properties.reduce((acumm, d) => {
      if (!acumm.includes(d.city)) {
        acumm.push(d.city);
      }
      // this return value becomes the next acumm in function call
      return acumm;
    }, []);
  };

  const handleSelect = (event) => {
    let selectedCity = event.target.value;
    // filter
    setFilterCities(properties.filter((p) => p.city === selectedCity));
  };

  const renderSelect = (cities) => {
    return (
      <Form.Select label='Select'  onChange={handleSelect} aria-label="Select City">
        <option value="" disabled selected hidden>Please Choose...</option>
        {cities.map((city) => (
          <option value={city}>{city}</option>
        ))}
      </Form.Select>
    );
  };

  const getSelect = () => {
    //1. getting all unique cities
    let uniqueCities = getUniqueCities();
    //2. how do we hook this up to bootstrap component
    return renderSelect(uniqueCities);
    //3. how do we handle the click event on select..
  };

  const renderFilteredCityProperties = () => {
    if (!filteredCities) {
      return <p>No properties, or select a city</p>;
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Price</th>
            <th>Beds</th>
            <th>Bath</th>
            <th>Square Foot</th>
            <th>city</th>
          </tr>
        </thead>
        <tbody>
          {filteredCities.map((c) => (
            <tr>
              <td>{c.price}</td>
              <td>{c.beds}</td>
              <td>{c.baths}</td>
              <td>{c.sq_ft}</td>
              <td>{c.city}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <div>
      <h1>Cities</h1>
      <p>select should be here</p>
      {getSelect()}
      {renderFilteredCityProperties()}
    </div>
  );
};

export default Cities;
