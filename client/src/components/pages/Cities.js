import React, { useState } from "react";
import useAxios from "axios-hooks";
import { Form, Table } from "react-bootstrap";
import axios from "axios";

const Cities = (props) => {
  // get the from DB (once) useEffect setState etc.. in one line
  const [{ data: properties, loading, error }] = useAxios("/api/properties");

  //TODO: not the best name, rename?
  const [filteredCities, setFilterCities] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectCity] = useState(1);
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

    // axios call (need to setup uniqueCities state)
  };

  const handleSelect = async (event) => {
    setSelectCity(event.target.value)
    setCurrentPage(1)
    // filter
    // setFilterCities(properties.filter((p) => p.city === selectedCity));

    // axios call to setFilterCities
    let res = await axios.get(`/api/properties/${event.target.value}`);
    setFilterCities(res.data.properties);
    setTotalPages(res.data.total_pages);
  };

  const renderSelect = (cities) => {
    return (
      <Form.Select
        label="Select"
        onChange={handleSelect}
        aria-label="Select City"
      >
        <option value="" disabled selected hidden>
          Please Choose...
        </option>
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
  }
  const pageClicked = async(page)=>{
    //axios call
    let res = await axios.get(`/api/properties/${selectedCity}?page=${page}`);
    setFilterCities(res.data.properties);
    //update UI
    setCurrentPage(page)
  }
  const getStyle = (page)=>{
    let sharedStyles = {marginRight:'5px'}
    if(currentPage == page){
      return {...sharedStyles, color:'red'}
    }
    return sharedStyles
  }
  const renderPagination = () => {
    if (!totalPages) {
      return null;
    }
    let spans = [];
    spans.push(<span style={{marginRight:'5px'}}>{'prev'}</span>);
    for (let i = 1; i <= totalPages; i++) {
      spans.push(<span onClick={() => pageClicked(i)} style={getStyle(i)}>{i}</span>);
    }
    spans.push(<span style={{marginRight:'5px'}}>{'next'}</span>);

    return spans
    // i want to render a list of numbers from 1 to ... totalPages
  };

  return (
    <div>
      <h1>Cities</h1>
      <p>select should be here</p>
      {getSelect()}
      <div>{renderPagination()}</div>
      {renderFilteredCityProperties()}
    </div>
  );
};

export default Cities;
